import pyodbc
from fastapi import FastAPI, HTTPException
from helpers.parse_datetime import parse_datetime
from models.models import Device, DeviceCreate

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


@app.post("/api/v1/devices", response_model=Device, status_code=201)
async def create_device(device: DeviceCreate):
    conn = get_db_connection()

    if conn is None:
        raise RuntimeError("Database connection couldn't be established.")

    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO Devices (Manufacturer, Model, ImageUrl, Stock, Price, Description)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            device.Manufacturer,
            device.Model,
            device.ImageUrl,
            device.Stock,
            device.Price,
            device.Description,
        )
        conn.commit()

        # Get the ID of the newly inserted record
        cursor.execute(
            """
            SELECT
                Id,
                CAST(CreatedAt AS VARCHAR(33)) AS CreatedAt,
                CAST(UpdatedAt AS VARCHAR(33)) AS UpdatedAt
            FROM Devices
            WHERE Model = ?
            """,
            device.Model,
        )

        id_row = cursor.fetchone()
        if id_row is None or id_row[0] is None:
            raise RuntimeError("Failed to retrieve the new device ID after insertion.")

        # new_id: int = id_row[0]
        # created_at = parse_datetime(id_row[1])
        # updated_at = parse_datetime(id_row[2])

        return Device(
            Id=id_row[0],
            CreatedAt=parse_datetime(id_row[1]),
            UpdatedAt=parse_datetime(id_row[2]),
            **device.model_dump(),
        )
    except pyodbc.IntegrityError:
        raise HTTPException(status_code=400, detail="Device already exists.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create device: {e}")
    finally:
        conn.close()
