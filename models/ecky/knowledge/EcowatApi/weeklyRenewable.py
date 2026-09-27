import os
import sys
import requests
import datetime
from dotenv import load_dotenv
from typing import Optional, TypedDict
from langchain_core.tools import tool

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "..")))

from ecky.utils.checkTimeline import IsValidRange


dir_path = os.path.dirname(os.path.realpath(__file__))

dotenv_path = os.path.abspath(
    os.path.join(dir_path, "..", "..", "..", ".env")
)

load_dotenv(dotenv_path)

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")


class DateRange(TypedDict):
    fromDate: str
    toDate: str

@tool
def useRenewableData(date: Optional[DateRange] = None):
    """Fetch renewable energy data for the next 7 days."""

    try:

        params = {}

        if isinstance(date, dict):
            isValid = IsValidRange(date["fromDate"], date["toDate"])
            if isValid["error"] == True:
                return isValid["message"]
            params = {
                "fromDate": date["fromDate"],
                "toDate": date["toDate"]
            }

        response = requests.get(
            f"{BACKEND_URL}/api/dashboard/weeklyData/get",
            params=params,
            timeout=15,
        )

        response.raise_for_status()

        result = response.json()

        if not result.get("data"):
            return {
                "error": True,
                "message": "No renewable data found for given dates"
            }

        records = []

        for item in result["data"]:
            records.append({
                "date": item["date"],
                "renewable_percentage": f"{item['renewabilityScore']}%",
                "solar_generation": f"{item['solar']}%",
                "wind_generation": f"{item['wind']}%",
            })

        if len(records) == 1:
            return records[0]

        return {
            "count": len(records),
            "data": records
        }

    except ValueError as e:
        return {
            "error": True,
            "message": f"Invalid date format. Use YYYY-MM-DD: {str(e)}"
        }

    except requests.RequestException as e:
        return {
            "error": True,
            "message": f"Failed to fetch renewable data: {str(e)}"
        }

    except Exception as e:
        return {
            "error": True,
            "message": str(e)
        }
