from datetime import datetime

from pydantic import BaseModel


class DeviceBase(BaseModel):
    Manufacturer: str
    Model: str
    ImageUrl: str
    Stock: int
    Price: float
    Description: str


class DeviceCreate(DeviceBase):
    # Para crear no se necesita Id, CreatedAt, ni UpdatedAt
    pass


class Device(DeviceBase):
    Id: int
    CreatedAt: datetime
    UpdatedAt: datetime

    class Config:
        from_attributes = True  # Permite crear desde objetos ORM
