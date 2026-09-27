from datetime import datetime, timedelta
from zoneinfo import ZoneInfo
from typing import Optional, Union, TypedDict

import requests
from langchain_core.tools import tool

BERLIN = ZoneInfo("Europe/Berlin")


class DateType(TypedDict):
    fromDate: Optional[str]
    toDate: Optional[str]


def to_timestamp(date_str: str, end: bool = False):
    dt = datetime.strptime(date_str, "%Y-%m-%d").replace(tzinfo=BERLIN)

    if end:
        dt += timedelta(days=1)

    return int(dt.timestamp() * 1000)


@tool
def usePriceHistory(date: Optional[Union[str, DateType]] = None):
    """Get historical Germany electricity prices from aWATTar."""

    if isinstance(date, str):
        from_date = date
        to_date = date

    else:
        from_date = date["fromDate"]
        to_date = date["toDate"]

    start = to_timestamp(from_date)
    end = to_timestamp(to_date, end=True)

    url = f"https://api.awattar.de/v1/marketdata?start={start}&end={end}"

    response = requests.get(url)
    response.raise_for_status()

    result = response.json()

    prices = []

    for item in result["data"]:
        start_dt = datetime.fromtimestamp(
            item["start_timestamp"] / 1000,
            tz=BERLIN
      )
        end_dt = datetime.fromtimestamp(
            item["end_timestamp"] / 1000,
            tz=BERLIN
        )
        prices.append(
            f"{start_dt.strftime('%H:%M')}-{end_dt.strftime('%H:%M')}: "
            f"{round(item['marketprice'] / 1000, 4)} EUR/kWh"
        )
    print("price",prices)
    return {
        "prices": prices
    }