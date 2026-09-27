import os
import re
from difflib import SequenceMatcher
from langchain_core.tools import tool
import requests
import json
from dotenv import load_dotenv

dir_path = os.path.dirname(os.path.realpath(__file__))
dotenv_path = os.path.abspath(os.path.join(dir_path, "..", "..", "..", ".env"))

@tool
def useAllowedAppliances() -> str:
    """Fetches the list of allowed/supported appliances in EcoWat."""
    try:
        dir_path = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(dir_path, "..", "sets", "Appliancelist.json")

        data = None
        last_error = None

        try:
            with open(file_path, "r", encoding="utf-8") as f:
                data = json.load(f)
            # break
        except Exception as error:
            last_error = error

        if data is None:
            raise last_error or FileNotFoundError("Appliancelist.json not found")

        appliances = []
        for app in data:
            name = app.get("name")
            applianceType = app.get("applianceType")
            if name:
                appliances.append(name)

        return "AvailableAppliances:{" + ", ".join(appliances) + "}"
    except Exception as e:
        return f"AvailableAppliances:{{}} Error loading Appliancelist.json: {str(e)}"

@tool
def isApplianceAllowed(FindName: list[str]):
    """Checks if the given appliances are allowed/supported in EcoWatt."""

    try:
        dir_path = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(
            dir_path,
            "..",
            "sets",
            "Appliancelist.json"
        )

        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        FindName = [
            app.lower().replace(" ", "")
            for app in FindName
        ]

        results = []

        for requested_name in FindName:
            allowed = False
            for appliance in data:
                if appliance.get("name") == requested_name:
                    allowed = True
                    break

            results.append({
                "name": requested_name,
                "allowed": allowed
            })

        return results

    except Exception as e:
        return f"Error loading Appliancelist.json: {str(e)}"

@tool
def isApplianceReplacable(FindName: list[str]):
    """Checks if the given appliances can be replaced or rescheduled in EcoWat."""
    try:
        dir_path = os.path.dirname(os.path.realpath(__file__))
        file_path = os.path.join(
            dir_path,
            "..",
            "sets",
            "Appliancelist.json"
        )

        with open(file_path, "r", encoding="utf-8") as f:
            data = json.load(f)

        FindName = [name.lower().replace(" ","") for name in FindName]
        results=[]
        for name in FindName:
            replacable = False
            for appliance in data:
                if appliance.get("name") == name:
                    replacable = appliance.get("isReplacable")
                    break
                else:
                    replacable = "not allowed in ecowat"
            results.append({
                "name": name,
                "isReplacable": replacable
            })

        return results
    except Exception as e:
        return f"Error loading Appliancelist.json: {str(e)}"