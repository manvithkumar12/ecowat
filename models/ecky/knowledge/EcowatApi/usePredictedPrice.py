import os
from typing import Optional, TypedDict

import requests
from dotenv import load_dotenv
from langchain_core.tools import tool
from ecky.utils.checkTimeline import IsValidRange


class DateRange(TypedDict):
    fromDate: str
    toDate: str


dir_path = os.path.dirname(os.path.realpath(__file__))

dotenv_path = os.path.abspath(
    os.path.join(dir_path, "..", "..", "..", ".env")
)

load_dotenv(dotenv_path)

UserId = "08334a7b-52ee-415c-a365-1b5dceea83e0"

BACKEND_URL = os.getenv(
    "BACKEND_URL",
    "http://localhost:3000"
)

@tool
def usePredictedPrice(date: Optional[DateRange] = None):
    """Fetch predicted electricity prices for all days or a specific date range."""

    try:
        params = {}

        if date is not None:

            if not isinstance(date, dict):
                return {
                    "error": True,
                    "message": (
                        'Invalid date format. Use '
                        '{"fromDate": "YYYY-MM-DD", '
                        '"toDate": "YYYY-MM-DD"}'
                    )
                }

            from_date = date.get("fromDate")
            to_date = date.get("toDate")

            if not from_date or not to_date:
                return {
                    "error": True,
                    "message": (
                        'Both fromDate and toDate are required. '
                        'Format: {"fromDate": "YYYY-MM-DD", '
                        '"toDate": "YYYY-MM-DD"}'
                    )
                }

            isValid = IsValidRange(
                from_date,
                to_date
            )

            if isValid["error"]:
                return isValid["message"]

            params = {
                "fromDate": from_date,
                "toDate": to_date
            }


        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{UserId}"

        headers = {
            "Authorization": f"Bearer {token}"
        }

        response = requests.get(
            f"{BACKEND_URL}/api/model/pricePrediction/get",
            params=params,
            headers=headers,
            timeout=15
        )

        response.raise_for_status()

        data = response.json()

        predicted_prices = data.get("data", [])

        if not predicted_prices:
            return {
                "error": True,
                "message": "No predicted price data available."
            }


        average_price = (
            sum(item["price"] for item in predicted_prices)
            / len(predicted_prices)
        )

        return {
            "predictedPrice": predicted_prices,
            "averagePrice": round(average_price, 4),
            "days": len(predicted_prices)
        }

    except requests.RequestException as e:
        return {
            "error": True,
            "message": f"Request failed: {str(e)}"
        }

    except Exception as e:
        return {
            "error": True,
            "message": f"Unexpected error: {str(e)}"
        }