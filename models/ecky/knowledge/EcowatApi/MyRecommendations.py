import os
from langchain_core.tools import tool
import requests
import json
from dotenv import load_dotenv
from typing import Optional


dir_path = os.path.dirname(os.path.realpath(__file__))
dotenv_path = os.path.abspath(os.path.join(dir_path, "..", "..", "..", ".env"))
load_dotenv(dotenv_path)

UserId = "08334a7b-52ee-415c-a365-1b5dceea83e0"
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")

@tool
def useRecommendations(ApplianceName:Optional[list[str]] = None):
    """Fetches the recommended appliance schedule from the EcoWatt recommendations engine."""
    try:
        bypass_secret = "ecowat_internal_secret_key_123!"
        token = f"bypass_{bypass_secret}_{UserId}"
        url = f"{BACKEND_URL}/api/recommendation/get"
        params = {}
        if ApplianceName:
            cleaned_names = [i.lower().replace(" ","") for i in ApplianceName if i and i.strip()]
            if cleaned_names:
                params = {"appliance": cleaned_names}
        headers = {
            "Authorization": f"Bearer {token}"
        }
        response = requests.get(
            url,
            headers=headers,
            timeout=15,
            params=params
        )

        response.raise_for_status()

        data = response.json()

        results = []

        for item in data:
            results.append({
                "appliance": item.get("appliance"),
                "bestTimeSlot": item.get("bestTimeSlot"),
                "score": item.get("score"),
                "potentialSaving": item.get("potentialSaving"),
                "priceAtBestTime": item.get("priceAtBestTime"),
                "renewableScore": item.get("renewableScore"),
                "powerConsumed": item.get("powerConsumed"),
                "reasons": item.get("reasons")[0]
            })
        return results

    except requests.RequestException as error:
        return {
            "error": True,
            "message": f"Failed to fetch recommendations: {str(error)}"
        }

    except Exception as error:
        return {
            "error": True,
            "message": f"Error in useRecommendations: {str(error)}"
        }
