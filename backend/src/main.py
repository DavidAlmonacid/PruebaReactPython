from typing import Union

from fastapi import FastAPI
from helpers.parse_datetime import parse_datetime
from models.models import Device

from database.database import get_db_connection

app = FastAPI()


@app.get("/")
def read_root():
    return "OK"


@app.get("/api/v1/devices", response_model=list[Device])
async def get_devices() -> list[Device]:
    devices: list[Device] = []
    conn = get_db_connection()

    if conn is None:
        raise RuntimeError("Database connection couldn't be established.")

    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT
                Id,
                Manufacturer,
                Model,
                ImageUrl,
                Stock,
                Price,
                Description,
                CAST(CreatedAt AS VARCHAR(33)) AS CreatedAt,
                CAST(UpdatedAt AS VARCHAR(33)) AS UpdatedAt
            FROM Devices
            """
        )

        for row in cursor.fetchall():
            # Convert row to Device object and append it to the Devices list
            devices.append(
                Device(
                    Id=row[0],
                    Manufacturer=row[1],
                    Model=row[2],
                    ImageUrl=row[3],
                    Stock=row[4],
                    Price=row[5],
                    Description=row[6],
                    CreatedAt=parse_datetime(row[7]),
                    UpdatedAt=parse_datetime(row[8]),
                )
            )
    finally:
        conn.close()

    return devices


@app.get("/items/{item_id}")
def read_item(
    item_id: int, q: Union[str, None] = None
) -> dict[str, Union[int, str, None]]:
    return {"item_id": item_id, "q": q}
