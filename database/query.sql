SELECT
	Id,
	Manufacturer,
	Model,
	Stock,
	Price,
	CreatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time' AS CreatedAt,
	UpdatedAt AT TIME ZONE 'UTC' AT TIME ZONE 'Central Standard Time' AS UpdatedAt
FROM Devices
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
FROM Devices
ORDER BY Stock DESC;
GO
