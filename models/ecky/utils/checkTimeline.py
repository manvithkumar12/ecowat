from zoneinfo import ZoneInfo
import datetime


def IsValidRange(fromDate: str, toDate: str):
    try:
        from_date = datetime.date.fromisoformat(fromDate)
        to_date = datetime.date.fromisoformat(toDate)

        today = datetime.datetime.now(
            ZoneInfo("Europe/Berlin")
        ).date()

        last_day = today + datetime.timedelta(days=6)

        if from_date < today or to_date > last_day:
            return {
                "error": True,
                "message": (
                    f"Only the next 7 days of data are available, "
                    f"from {today} to {last_day}"
                )
            }

        if from_date > to_date:
            return {
                "error": True,
                "message": "fromDate cannot be after toDate"
            }

        return {
            "error": False,
            "message": "Valid date range"
        }

    except ValueError:
        return {
            "error": True,
            "message": "Invalid date format. Use YYYY-MM-DD"
        }