def _format_price_history_time_label(prompt: str) -> str | None:
    match = re.search(
        r"\bbetween\s+(\d{1,2})(?::(\d{2}))?\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b",
        prompt,
        re.IGNORECASE,
    )

    if not match:
        match = re.search(
            r"\b(\d{1,2})(?::(\d{2}))?\s*-\s*(\d{1,2})(?::(\d{2}))?\s*(am|pm)?\b",
            prompt,
            re.IGNORECASE,
        )

    if not match:
        return None

    start_hour = int(match.group(1))
    start_minute = match.group(2) or "00"
    end_hour = int(match.group(3))
    end_minute = match.group(4) or "00"

    return f"{start_hour:02d}:{start_minute}-{end_hour:02d}:{end_minute}"

