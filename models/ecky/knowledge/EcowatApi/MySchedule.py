import os
import requests
from datetime import datetime
import pytz
from langchain_core.tools import tool
from typing import Optional, Union, TypedDict

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")
USER_ID = "08334a7b-52ee-415c-a365-1b5dceea83e0"


class TimeRange(TypedDict):
    startHour: str
    endHour: str

@tool
def userScheduledAppliances(timeRange:Optional[TimeRange]=None , applianceName:Optional[list[str]]=None):
    """Fetches the current list of scheduled appliances for the user today."""
    
    try:
        params = {}
        
        if isinstance(timeRange, dict):
            params.update({
                "startHour": timeRange["startHour"],
                "endHour": timeRange["endHour"]
            })
        if applianceName:
            cleaned_names = [i.lower().replace(" ", "") for i in applianceName if i and i.strip()]
            if cleaned_names:
                params.update({
                    "applianceNames": cleaned_names
                })
        
        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{USER_ID}"

        url = f"{BACKEND_URL}/api/schedule-appliances/get"
        headers = {"Authorization": f"Bearer {token}"}

        response = requests.get(url, headers=headers, timeout=15,params=params)
        response.raise_for_status()
        response_data = response.json()
        
        schedules = response_data.get("data", [])
        total_hours = response_data.get("totalHours", 0)

        german_tz = pytz.timezone("Europe/Berlin")
        current_time = datetime.now(german_tz).time()
        required_data = []

        for schedule in schedules:
            start_time = datetime.strptime(
                schedule["startHour"], "%H:%M"
            ).time()

            end_time = datetime.strptime(
                schedule["endHour"], "%H:%M"
            ).time()

            if current_time < start_time:
                status = "Upcoming"
            elif start_time <= current_time < end_time:
                status = "Running"
            else:
                status = "Completed"

            required_data.append(
                {
                    "id": schedule.get("id"),
                    "name": schedule.get("appliance", {}).get("name"),
                    "startHour": schedule.get("startHour"),
                    "endHour": schedule.get("endHour"),
                    "powerConsumed": schedule.get("powerConsumed"),
                    "rating": schedule.get("rating"),
                    "scheduledDate": schedule.get("date"),
                    "status": status,
                }
            )
        return {
            "totalHours": total_hours,
            "scheduledAppliances": required_data,
        }

    except Exception as e:
        return f"Error fetching schedules: {str(e)}"

@tool
def isScheduled(
    timeRange: Optional[TimeRange] = None,
    applianceName: Optional[list[str]] = None
):
    """Checks if an appliance is scheduled for the given time range."""

    try:
        if not isinstance(timeRange, dict):
            return {
                "isScheduled": False,
                "info": "startHour and endHour are required"
            }

        startHour = timeRange["startHour"]
        endHour = timeRange["endHour"]

        if not applianceName:
            return {
                "isScheduled": False,
                "info": "applianceName is required"
            }

        applianceNames = [
            name.lower().replace(" ", "")
            for name in applianceName
        ]

        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{USER_ID}"

        url = f"{BACKEND_URL}/api/schedule-appliances/get"

        headers = {
            "Authorization": f"Bearer {token}"
        }

        params = {
            "startHour": startHour,
            "endHour": endHour,
            "applianceNames": applianceNames
        }

        response = requests.get(
            url,
            headers=headers,
            params=params,
            timeout=15
        )

        response.raise_for_status()

        response_data = response.json()

        schedules = response_data.get("data", [])

        if schedules:
            return {
                "isScheduled": True,
                "info": (
                    f"yes,{', '.join(applianceName)} is scheduled "
                    f"between {startHour} - {endHour}"
                ),
            }

        return {
            "isScheduled": False,
            "info": (
                f"No {', '.join(applianceName)} is scheduled "
                f"between {startHour} - {endHour}"
            )
        }

    except requests.RequestException as e:
        return {
            "isScheduled": False,
            "error": True,
            "info": f"Failed to fetch schedules: {str(e)}"
        }

    except Exception as e:
        return {
            "isScheduled": False,
            "error": True,
            "info": f"Error checking schedule: {str(e)}"
        }

@tool
def addScheduleAppliance(
    applianceNames: list[str],
    timeRange: Optional[TimeRange] = None,
    startTime: Optional[str] = None,
    endTime: Optional[str] = None,
    power: Optional[Union[int, float]] = None,
    usageHours: Optional[Union[int, float]] = None,
    **kwargs,
):
    """Schedules appliances for run times. Validates if the appliances are already saved in the user's saved appliances list before allowing scheduling."""
    try:
        if not applianceNames:
            return {
                "error": True,
                "message": "applianceNames cannot be empty"
            }

        # Extract from timeRange if provided
        if isinstance(timeRange, dict):
            if not startTime:
                startTime = timeRange.get("startHour") or timeRange.get("startTime")
            if not endTime:
                endTime = timeRange.get("endHour") or timeRange.get("endTime")

        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{USER_ID}"
        url = f"{BACKEND_URL}/api/appliances/get"
        headers = {"Authorization": f"Bearer {token}"}

        cleaned_names = [n.lower().replace(" ", "") for n in applianceNames if n and n.strip()]
        params = {"applianceNames": cleaned_names} if cleaned_names else {}

        response = requests.get(url, headers=headers, params=params, timeout=15)
        response.raise_for_status()
        data = response.json()
        saved_appliances = data.get("appliances", [])

        saved_appliances_map = {}
        for app in saved_appliances:
            c_name = app.get("name", "").lower().replace(" ", "")
            if c_name:
                saved_appliances_map[c_name] = app

        results = []
        for raw_name in applianceNames:
            c_name = raw_name.lower().replace(" ", "")
            saved_app = saved_appliances_map.get(c_name)

            if saved_app:
                app_power = power if power is not None else saved_app.get("power", 1500)
                app_usage = usageHours if usageHours is not None else saved_app.get("usageHours", 1.0)
                results.append({
                    "name": saved_app.get("name", raw_name),
                    "cleanedName": c_name,
                    "isSaved": True,
                    "status": "ready_to_schedule",
                    "applianceId": saved_app.get("id"),
                    "power": app_power,
                    "usageHours": app_usage,
                    "startTime": startTime or "00:00",
                    "endTime": endTime or "00:00",
                    "message": f"Appliance '{raw_name}' is saved and ready to schedule."
                })
            else:
                results.append({
                    "name": raw_name,
                    "cleanedName": c_name,
                    "isSaved": False,
                    "status": "not_saved",
                    "applianceId": None,
                    "message": f"Appliance '{raw_name}' is not found in your saved appliances. Please add the appliance first."
                })

        saved_items = [r for r in results if r["isSaved"]]
        not_saved_items = [r for r in results if not r["isSaved"]]

        all_messages = [r["message"] for r in results]

        if not_saved_items and not saved_items:
            return {
                "success": False,
                "status": "not_saved",
                "message": " ".join(all_messages),
                "appliances": results,
                "info": "Please add the appliance first before scheduling."
            }

        # Build schedule parameters for ready appliances
        schedule_params = {
            "name": [r["name"] for r in saved_items] if len(saved_items) > 1 else saved_items[0]["name"],
            "power": [r["power"] for r in saved_items] if len(saved_items) > 1 else saved_items[0]["power"],
            "usageHours": [r["usageHours"] for r in saved_items] if len(saved_items) > 1 else saved_items[0]["usageHours"],
            "startTime": [r["startTime"] for r in saved_items] if len(saved_items) > 1 else saved_items[0]["startTime"],
            "endTime": [r["endTime"] for r in saved_items] if len(saved_items) > 1 else saved_items[0]["endTime"],
        }

        return {
            "success": True,
            "status": "ready_to_schedule",
            "appliances": results,
            "parameters": schedule_params,
            "message": " ".join(all_messages),
        }

    except Exception as e:
        return {
            "error": True,
            "message": f"Error validating appliances for schedule: {str(e)}"
        }