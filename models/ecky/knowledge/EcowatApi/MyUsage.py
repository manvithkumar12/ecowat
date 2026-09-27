import os
from typing import Optional, TypedDict
import requests
from dotenv import load_dotenv
from langchain_core.tools import tool

dir_path = os.path.dirname(os.path.realpath(__file__))
dotenv_path = os.path.abspath(os.path.join(dir_path, "..", "..", "..", ".env"))
load_dotenv(dotenv_path)

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")
USER_ID = "08334a7b-52ee-415c-a365-1b5dceea83e0"


class DateRanges(TypedDict):
    fromDate: str
    toDate: str


@tool
def useUserUsage(date: Optional[DateRanges] = None, applianceName: Optional[list[str]] = None):
    """Fetches the user's electricity usage and consumption on specific dates."""
    try:
        params = {}
        if isinstance(date, dict):
            if date.get("fromDate"):
                params["fromDate"] = date["fromDate"]
            if date.get("toDate"):
                params["toDate"] = date["toDate"]

        if isinstance(applianceName, list):
            cleaned_app = [a for a in applianceName if a and a.strip() and a.strip().lower() != "all"]
            if cleaned_app:
                params["applianceName"] = cleaned_app
        elif isinstance(applianceName, str) and applianceName.strip() and applianceName.strip().lower() != "all":
            params["applianceName"] = [applianceName.strip()]

        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{USER_ID}"

        url = f"{BACKEND_URL}/api/used-appliance/get"
        headers = {"Authorization": f"Bearer {token}"}

        print(f"[Calling Backend] GET {url} with params={params}")
        response = requests.get(url, headers=headers, timeout=15, params=params)
        response.raise_for_status()

        response_data = response.json()
        decoded_data = response_data.get("data", [])
        required_data = []
        for data in decoded_data:
            required_data.append({
                "id": data.get("id"),
                "appliance": data.get("appliance", {}).get("name"),
                "usageHours": data.get("usageHours"),
                "kwh": data.get("kwh"),
                "rating": data.get("rating"),
                "totalPrice": data.get("totalPrice"),
                "date": data.get("date"),
            })

        complete_consumption = sum(item.get("kwh", 0) or 0 for item in required_data)
        complete_price = sum(item.get("totalPrice", 0) or 0 for item in required_data)
        total_hours_used = sum(item.get("usageHours", 0) or 0 for item in required_data)

        return {
            "appliancesUsed": required_data,
            "completeConsumption": round(complete_consumption, 2),
            "completePrice": round(complete_price, 2),
            "totalHoursUsed": round(total_hours_used, 2)
        }
    except Exception as e:
        print(f"[Error in useUserUsage]: {str(e)}")
        return f"Error fetching user usage: {str(e)}"