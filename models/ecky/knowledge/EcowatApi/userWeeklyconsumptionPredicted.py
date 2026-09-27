import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from langchain_core.tools import tool
import requests
from dotenv import load_dotenv
from typing import Optional, TypedDict
from ecky.utils.checkTimeline import IsValidRange

dir_path = os.path.dirname(os.path.realpath(__file__))
dotenv_path = os.path.abspath(os.path.join(dir_path, "..", "..", "..", ".env"))
load_dotenv(dotenv_path)

UserId = "08334a7b-52ee-415c-a365-1b5dceea83e0"
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")

class DateRanges(TypedDict):
    fromDate:str
    toDate:str

@tool
def userWeeklyconsumptionPredicted(date:Optional[DateRanges]=None):
    """Fetches the user's predicted weekly electricity consumption."""
    try:
        url = f"{BACKEND_URL}/api/model/weeklyConsumption"

        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{UserId}"

        headers = {
            "Authorization": f"Bearer {token}"
        }

        params = {}
        
        if isinstance(date, dict):
            isValid = IsValidRange(date["fromDate"], date["toDate"])
            if isValid["error"] == True:
                return isValid["message"]
            params = {
                "fromDate": date["fromDate"],
                "toDate": date["toDate"]
            }

    
        response = requests.get(url, headers=headers, timeout=15,params=params)
        response.raise_for_status()

        data = response.json()
        print("dataissss=",data)
        decoded_data = data.get("predictedUsage", [])
        if not decoded_data:
            return "No predicted weekly consumption data available."
        values = [item["predictedUsage"] for item in decoded_data]
        total_weekly_consumption = sum(values)
        average_weekly_consumption = total_weekly_consumption / len(values)
        
        return {
            "predictedUsage": decoded_data,
            "totalWeeklyConsumption": round(total_weekly_consumption, 2),
            "averageDailyConsumption": round(average_weekly_consumption, 2),
        }
        
    except Exception as e:
        return f"Error fetching weekly consumption prediction: {e}"
