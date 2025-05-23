from datetime import datetime


def parse_datetime(dt_str: str) -> datetime:
    try:
        return datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S.%f %z")
    except ValueError:
        return datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S %z")
