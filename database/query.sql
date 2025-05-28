SELECT
	Id,
	Manufacturer,
	Model,
	Stock,
	Price,
	CreatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time' AS CreatedAt,
	UpdatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time' AS UpdatedAt
FROM gps_devices_db.dbo.Devices
ORDER BY Price ASC;
GO

SELECT
	Id,
	Manufacturer,
	Model,
	Stock,
	Price,
	CreatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time' AS CreatedAt,
	UpdatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time' AS UpdatedAt
FROM gps_devices_db.dbo.Devices
ORDER BY Stock DESC;
GO
