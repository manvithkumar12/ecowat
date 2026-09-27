import os
import re
from difflib import SequenceMatcher
from langchain_core.tools import tool
import requests
import json
from dotenv import load_dotenv
from typing import Optional

dir_path = os.path.dirname(os.path.realpath(__file__))
dotenv_path = os.path.abspath(os.path.join(dir_path, "..", "..", "..", ".env"))
load_dotenv(dotenv_path)

UserId = "08334a7b-52ee-415c-a365-1b5dceea83e0"
BACKEND_URL = os.getenv("BACKEND_URL")

@tool
def userSavedAppliances(applianceNames:Optional[list[str]] = None) -> str:
    """Fetches the current list of appliances registered by the user."""
    try:
        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{UserId}"
        url = f"{BACKEND_URL}/api/appliances/get"
        headers = {"Authorization": f"Bearer {token}"}
        params = {}
        if applianceNames:
            cleaned_names = [app.lower().replace(" ","") for app in applianceNames if app and app.strip() and app.strip().lower() != "all"]
            if cleaned_names:
                params = {"applianceNames": cleaned_names}
                applianceNames = cleaned_names
            else:
                applianceNames = None
        response = requests.get(url, headers=headers, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()

        if applianceNames:
            return data.get("appliances")
        else:
            appliances_list = []
            for app in data.get("appliances", []):
                name = app.get("name")
                app_id = app.get("id")
                power = app.get("power")
                hours = app.get("usageHours")
                status = "On" if app.get("status") else "Off"
                if name:
                    appliances_list.append(
                        f"name:{name} (id:{app_id}, Power: {power}W, Usage: {hours}h/day, Status: {status})"
                    )

        if appliances_list:
            return "SavedAppliances:{" + ", ".join(appliances_list) + "}"
        return "SavedAppliances:{}"
    except Exception as e:
        return f"SavedAppliances:{{}} Error fetching appliances: {str(e)}"

@tool
def isSavedAppliance(applianceName: list[str]):
    """Checks if the given appliances are registered or saved by the user."""
    try:
        requested_appliances = [
            app.lower().replace(" ", "")
            for app in applianceName
        ]

        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{UserId}"

        url = f"{BACKEND_URL}/api/appliances/get"

        headers = {
            "Authorization": f"Bearer {token}"
        }

        params = {
            "applianceNames": requested_appliances
        }

        response = requests.get(
            url,
            headers=headers,
            params=params,
            timeout=15
        )

        response.raise_for_status()

        data = response.json()

        saved_appliances = data.get("appliances", [])

        saved_names = {
            app.get("name", "").lower().replace(" ", "")
            for app in saved_appliances
        }

        results = []

        for name in requested_appliances:
            results.append({
                "name": name,
                "isSaved": name in saved_names
            })

        return results

    except Exception as e:
        return {
            "error": True,
            "message": f"Error fetching appliances: {str(e)}"
        }


from typing import Optional, Union


def extract_appliance_names(appliance_input: Union[str, list[str]]) -> list[str]:
    raw_list = []
    if isinstance(appliance_input, list):
        for item in appliance_input:
            if isinstance(item, str):
                parts = re.split(r",|\sand\s|\s&\s", item, flags=re.IGNORECASE)
                raw_list.extend([p.strip() for p in parts if p.strip()])
            elif item:
                raw_list.append(str(item).strip())
    elif isinstance(appliance_input, str):
        parts = re.split(r",|\sand\s|\s&\s", appliance_input, flags=re.IGNORECASE)
        raw_list.extend([p.strip() for p in parts if p.strip()])
    return [name for name in raw_list if name]


@tool
def addSavedAppliance(
    applianceName: Union[str, list[str]],
    power: Optional[int] = None,
    usageHours: Optional[float] = None
):
    """Checks if appliances are allowed in EcoWat and not already saved before adding them to the user's saved list."""
    try:
        if not applianceName:
            return {
                "error": True,
                "message": "applianceName is required"
            }

        names = extract_appliance_names(applianceName)
        if not names:
            return {
                "error": True,
                "message": "applianceName cannot be empty"
            }

        from ecky.knowledge.EcowatApi.useAllowedAppliances import isApplianceAllowed

        # Batch check allowed status
        cleaned_names = [n.lower().replace(" ", "") for n in names]
        if hasattr(isApplianceAllowed, "func"):
            allowed_res = isApplianceAllowed.func(FindName=cleaned_names)
        else:
            allowed_res = isApplianceAllowed.invoke({"FindName": cleaned_names})

        allowed_map = {}
        if isinstance(allowed_res, list):
            for item in allowed_res:
                allowed_map[item.get("name", "")] = item.get("allowed", False)

        # Batch check user saved status
        if hasattr(userSavedAppliances, "func"):
            saved_res = userSavedAppliances.func(applianceNames=cleaned_names)
        else:
            saved_res = userSavedAppliances.invoke({"applianceNames": cleaned_names})

        saved_names_set = set()
        if isinstance(saved_res, list):
            for item in saved_res:
                item_name = (
                    item.get("name", "").lower().replace(" ", "")
                    if isinstance(item, dict)
                    else str(item).lower().replace(" ", "")
                )
                if item_name:
                    saved_names_set.add(item_name)

        results = []
        for raw_name in names:
            cleaned_name = raw_name.lower().replace(" ", "")
            is_allowed = allowed_map.get(cleaned_name, False)
            is_saved = cleaned_name in saved_names_set

            if not is_allowed:
                status = "not_allowed"
                msg = f"Appliance '{raw_name}' is not allowed or supported in EcoWat."
                params = None
            elif is_saved:
                status = "already_saved"
                msg = f"Appliance '{raw_name}' is already saved in your appliance list."
                params = None
            else:
                status = "ready_to_add"
                msg = f"Appliance '{raw_name}' is allowed and not yet saved."
                params = {
                    "name": cleaned_name,
                    "power": power if power is not None else 1500,
                    "powerUnit": "W",
                    "usageHours": usageHours if usageHours is not None else 2.0
                }

            results.append({
                "name": raw_name,
                "cleanedName": cleaned_name,
                "allowed": is_allowed,
                "isSaved": is_saved,
                "status": status,
                "parameters": params,
                "message": msg
            })

        # Single appliance response format
        if len(results) == 1:
            r = results[0]
            resp = {
                "allowed": r["allowed"],
                "isSaved": r["isSaved"],
                "status": r["status"],
                "applianceName": r["cleanedName"],
                "message": r["message"]
            }
            if r["parameters"]:
                resp["parameters"] = r["parameters"]
            return resp

        # Multiple appliances response format
        all_messages = [r["message"] for r in results]
        ready_params = [r["parameters"] for r in results if r["parameters"] is not None]
        return {
            "appliances": results,
            "parameters": ready_params[0] if len(ready_params) == 1 else ready_params,
            "allParameters": ready_params,
            "message": " ".join(all_messages),
            "summary": {
                "readyToAdd": [r["name"] for r in results if r["status"] == "ready_to_add"],
                "alreadySaved": [r["name"] for r in results if r["status"] == "already_saved"],
                "notAllowed": [r["name"] for r in results if r["status"] == "not_allowed"]
            }
        }

    except Exception as e:
        return {
            "error": True,
            "message": f"Error validating appliance addition: {str(e)}"
        }


@tool
def deleteSavedAppliance(
    applianceName: Union[str, list[str]],
    **kwargs
):
    """Validates if appliances exist in the user's saved list before deleting them."""
    try:
        if not applianceName:
            return {
                "error": True,
                "message": "applianceName is required"
            }

        names = extract_appliance_names(applianceName)
        if not names:
            return {
                "error": True,
                "message": "applianceName cannot be empty"
            }

        cleaned_names = [n.lower().replace(" ", "") for n in names]

        # Batch check user saved status
        if hasattr(userSavedAppliances, "func"):
            saved_res = userSavedAppliances.func(applianceNames=cleaned_names)
        else:
            saved_res = userSavedAppliances.invoke({"applianceNames": cleaned_names})

        saved_names_set = set()
        if isinstance(saved_res, list):
            for item in saved_res:
                item_name = (
                    item.get("name", "").lower().replace(" ", "")
                    if isinstance(item, dict)
                    else str(item).lower().replace(" ", "")
                )
                if item_name:
                    saved_names_set.add(item_name)

        results = []
        for raw_name in names:
            cleaned_name = raw_name.lower().replace(" ", "")
            is_saved = cleaned_name in saved_names_set

            if is_saved:
                status = "ready_to_delete"
                msg = f"Appliance '{raw_name}' is in your saved list and ready to be deleted."
            else:
                status = "not_saved"
                msg = f"Appliance '{raw_name}' is not saved in your appliances list."

            results.append({
                "name": raw_name,
                "cleanedName": cleaned_name,
                "isSaved": is_saved,
                "status": status,
                "message": msg
            })

        saved_items = [r for r in results if r["isSaved"]]
        not_saved_items = [r for r in results if not r["isSaved"]]

        if len(results) == 1:
            r = results[0]
            if not r["isSaved"]:
                return {
                    "isSaved": False,
                    "status": "not_saved",
                    "applianceName": r["cleanedName"],
                    "message": r["message"]
                }
            return {
                "isSaved": True,
                "status": "ready_to_delete",
                "applianceName": r["cleanedName"],
                "parameters": {
                    "name": [r["cleanedName"]]
                },
                "message": r["message"]
            }

        all_messages = [r["message"] for r in results]
        ready_names = [r["cleanedName"] for r in saved_items]

        return {
            "appliances": results,
            "parameters": {
                "name": ready_names
            } if ready_names else {},
            "message": " ".join(all_messages),
            "summary": {
                "readyToDelete": [r["name"] for r in saved_items],
                "notSaved": [r["name"] for r in not_saved_items]
            }
        }

    except Exception as e:
        return {
            "error": True,
            "message": f"Error validating appliance deletion: {str(e)}"
        }


@tool
def editSavedAppliance(
    applianceName: Union[str, list[str]],
    power: Optional[int] = None,
    usageHours: Optional[float] = None,
    status: Optional[Union[bool, str]] = None,
    **kwargs
):
    """Validates if appliances exist in the user's saved list before editing their power rating, usage hours, or active status."""
    try:
        if not applianceName:
            return {
                "error": True,
                "message": "applianceName is required"
            }

        names = extract_appliance_names(applianceName)
        if not names:
            return {
                "error": True,
                "message": "applianceName cannot be empty"
            }

        parsed_status = None
        if status is not None:
            if isinstance(status, bool):
                parsed_status = status
            elif isinstance(status, str):
                parsed_status = status.lower().strip() in ["true", "on", "active", "enable", "enabled", "1"]

        cleaned_names = [n.lower().replace(" ", "") for n in names]

        # Batch check user saved status and fetch existing details
        if hasattr(userSavedAppliances, "func"):
            saved_res = userSavedAppliances.func(applianceNames=cleaned_names)
        else:
            saved_res = userSavedAppliances.invoke({"applianceNames": cleaned_names})

        saved_appliances_map = {}
        if isinstance(saved_res, list):
            for item in saved_res:
                if isinstance(item, dict):
                    item_name = item.get("name", "").lower().replace(" ", "")
                    if item_name:
                        saved_appliances_map[item_name] = item

        results = []
        for raw_name in names:
            cleaned_name = raw_name.lower().replace(" ", "")
            existing_app = saved_appliances_map.get(cleaned_name)
            is_saved = existing_app is not None

            if is_saved:
                status_str = "ready_to_edit"
                msg = f"Appliance '{raw_name}' is in your saved list and ready to be edited."
                app_power = power if power is not None else existing_app.get("power", 1500)
                app_hours = usageHours if usageHours is not None else existing_app.get("usageHours", 2.0)
                app_status = parsed_status if parsed_status is not None else existing_app.get("status", True)
                params = {
                    "id": existing_app.get("id"),
                    "name": [cleaned_name],
                    "power": app_power,
                    "powerUnit": "W",
                    "usageHours": app_hours,
                    "status": app_status
                }
            else:
                status_str = "not_saved"
                msg = f"Appliance '{raw_name}' is not saved in your appliances list. Unable to edit."
                params = None

            results.append({
                "name": raw_name,
                "cleanedName": cleaned_name,
                "isSaved": is_saved,
                "status": status_str,
                "parameters": params,
                "message": msg
            })

        saved_items = [r for r in results if r["isSaved"]]
        not_saved_items = [r for r in results if not r["isSaved"]]

        if len(results) == 1:
            r = results[0]
            if not r["isSaved"]:
                return {
                    "isSaved": False,
                    "status": "not_saved",
                    "applianceName": r["cleanedName"],
                    "message": r["message"]
                }
            return {
                "isSaved": True,
                "status": "ready_to_edit",
                "applianceName": r["cleanedName"],
                "parameters": r["parameters"],
                "message": r["message"]
            }

        all_messages = [r["message"] for r in results]
        ready_params = [r["parameters"] for r in saved_items if r["parameters"] is not None]

        return {
            "appliances": results,
            "parameters": ready_params[0] if len(ready_params) == 1 else ready_params,
            "message": " ".join(all_messages),
            "summary": {
                "readyToEdit": [r["name"] for r in saved_items],
                "notSaved": [r["name"] for r in not_saved_items]
            }
        }

    except Exception as e:
        return {
            "error": True,
            "message": f"Error validating appliance edit: {str(e)}"
        }




