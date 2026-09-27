from datetime import datetime
from zoneinfo import ZoneInfo
import os

import requests
from dotenv import load_dotenv
from langchain_core.tools import tool


dir_path = os.path.dirname(os.path.realpath(__file__))
dotenv_path = os.path.abspath(
    os.path.join(dir_path, "..", "..", "..", ".env")
)
load_dotenv(dotenv_path)

BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:3000")
BERLIN_TZ = ZoneInfo("Europe/Berlin")


def format_timestamp(timestamp_ms, include_date=True):
    if timestamp_ms is None:
        return "unknown"

    format_string = "%Y-%m-%d %H:%M" if include_date else "%H:%M"

    return datetime.fromtimestamp(
        timestamp_ms / 1000,
        tz=BERLIN_TZ,
    ).strftime(format_string)


@tool
def useLivePrice():
    """Fetches the current live electricity price."""
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/dashboard/live-price",
            timeout=15,
        )
        response.raise_for_status()
        data = response.json()

        current_price = data.get("currentPrice")
        today_average_price = data.get("todayAveragePrice")
        unit = data.get("unit", "EUR/kWh")
        highest_price = data.get("highestPrice")
        lowest_price = data.get("lowestPrice")
        past_24_hours_average = data.get("past24HoursAverage")
        current_slot = data.get("currentSlot") or {}

        current_slot_start = format_timestamp(current_slot.get("start"))
        current_slot_end = format_timestamp(
            current_slot.get("end"),
            include_date=False,
        )

        return f"""Timezone: Europe/Berlin
        Current Price: {current_price} {unit}
        Today Average Price: {today_average_price} {unit}
        Current Slot: {current_slot_start} - {current_slot_end}
        Highest Price: {highest_price} {unit}
        Lowest Price: {lowest_price} {unit}
        Past 24 Hours Average: {past_24_hours_average} {unit}"""

    except Exception as error:
        return f"Error fetching live electricity price: {error}"


@tool
def PriceDataToday():
    """Fetches today's hourly electricity prices and the cheapest slot."""
    try:
        response = requests.get(
            f"{BACKEND_URL}/api/dashboard/live-price",
            timeout=15,
        )
        response.raise_for_status()
        data = response.json()

        current_price = data.get("currentPrice")
        today_average_price = data.get("todayAveragePrice")
        price_trend = data.get("priceTrend")
        unit = data.get("unit", "EUR/kWh")
        highest_price = data.get("highestPrice")
        lowest_price = data.get("lowestPrice")
        past_24_hours_average = data.get("past24HoursAverage")

        hourly_data = data.get("hourlyPrices", [])

        cheapest_hour = min(
            hourly_data,
            key=lambda hour: hour.get("price", float("inf")),
            default=None,
        )

        if cheapest_hour:
            cheapest_start = format_timestamp(cheapest_hour.get("start"))
            cheapest_end = format_timestamp(
                cheapest_hour.get("end"),
                include_date=False,
            )
            cheapest_price = cheapest_hour.get("price")
        else:
            cheapest_start = "unknown"
            cheapest_end = "unknown"
            cheapest_price = None

        hourly_prices = []

        for hour in hourly_data:
            start = format_timestamp(hour.get("start"))
            end = format_timestamp(hour.get("end"), include_date=False)
            price = hour.get("price")

            hourly_prices.append(
                f"{start} - {end}: {price} {unit}"
            )

        hourly_prices_string = "\n".join(hourly_prices)
        
        return {
            "cheapest_slot_today": {
                "start": cheapest_start,
                "end": cheapest_end,
                "price": cheapest_price,
                "unit": unit
            }
        }
    except Exception as error:
        return f"Error fetching daily electricity prices: {error}"