IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'gps_devices_db')
BEGIN
	CREATE DATABASE gps_devices_db;
END
GO

USE gps_devices_db;
GO

-- Create the Devices table
CREATE TABLE Devices (
	Id INT PRIMARY KEY IDENTITY(1,1),
	Manufacturer NVARCHAR(255) NOT NULL,
	Model NVARCHAR(255) NOT NULL UNIQUE,
	ImageUrl VARCHAR(255) NOT NULL,
	Stock INT NOT NULL DEFAULT 0,
	Price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
	Description NVARCHAR(MAX) NOT NULL,
	CreatedAt DATETIMEOFFSET(3) DEFAULT SYSDATETIMEOFFSET(),
	UpdatedAt DATETIMEOFFSET(3) DEFAULT SYSDATETIMEOFFSET()
);
GO

-- Trigger to update UpdatedAt on row update
CREATE TRIGGER trg_UpdateDevicesUpdatedAt
ON Devices
AFTER UPDATE
AS
BEGIN
	SET NOCOUNT ON;
	UPDATE Devices
	SET UpdatedAt = SYSDATETIMEOFFSET()
	FROM Inserted
	WHERE Devices.Id = Inserted.Id;
END;
GO

-- Stored procedure to decrease stock when a device is sold
CREATE PROCEDURE sp_DecreaseStockWhenSold
	@Id INT
AS
BEGIN
	SET NOCOUNT ON;

	-- Decrease stock by 1
	UPDATE Devices
	SET Stock = Stock - 1
	WHERE Id = @Id AND Stock > 0;
END;
GO

-- Insert sample data into Devices table
INSERT INTO Devices (Manufacturer, Model, ImageUrl, Stock, Price, Description)
VALUES
	('Queclink', 'GV300', 'https://www.queclink.com/wp-content/uploads/2020/07/gv300-l.png', 10, 120.50, 'Advanced, best-selling vehicle tracker with multiple interfaces and accessory support, ideal for fleet management, cold chain logistics, and transportation monitoring.'),
	('Queclink', 'GV300W', 'https://www.queclink.com/wp-content/uploads/2020/07/gv300w-l-1.png', 5, 130.00, 'Versatile 3G vehicle tracker for diverse fleet management, offering advanced capabilities like CAN parameter capture, sensor data, and I/O expansion.'),
	('Queclink', 'GV300CAN', 'https://www.queclink.com/wp-content/uploads/2020/07/GV300CAN-l.png', 7, 140.75, 'Advanced vehicle tracker with integrated CAN reader for comprehensive data acquisition, supporting tachograph data and extensive vehicle metrics without interference.'),
	('Queclink', 'GV350MG', 'https://www.queclink.com/wp-content/uploads/2020/07/GV350MG-l.png', 12, 150.00, 'Advanced LTE vehicle tracker with a customizable CAN interface, ideal for heavy-duty truck integration (FMS J1939) and support for a wide range of accessories.'),
	('Queclink', 'GV500MA', 'https://magnitracking.com/wp-content/uploads/2019/10/dispositivo-gps-gv500ma.jpg', 0, 110.00, 'Easy-to-install LTE Cat M1/NB1 OBDII GPS tracker with driving behavior monitoring, accident data collection, and multiple alarm features.'),
	('Coban', 'GPS-303F', 'https://www.coban.net.ec/GPS%20Vehicle%20Tracker_files/2017111616254907.jpg', 15, 90.00, 'Real-time monitoring, arming and disarming door alarm, ACC alarm, shock sensor alarm, shutdown alarm, engine stop and restart'),
	('Coban', 'GPS-303G', 'https://www.coban.net.ec/GPS%20Vehicle%20Tracker_files/2017111616253471.jpg', 6, 95.50, 'Real-time monitoring, remote arm and disarm, door alarm, ACC alarm, shock sensor alarm, power-off alarm, engine stop and restart with a controller'),
	('Coban', 'GPS-103A', 'https://www.coban.net.ec/GPS%20Vehicle%20Tracker_files/2017111616252292.jpg', 9, 100.00, 'Real-time tracking, arm and disarm by SMS, door alarm, ACC alarm, shock sensor alarm, power-off alarm, engine stop and restart'),
	('Coban', 'GPS-308', 'https://www.coban.net.ec/GPS%20Vehicle%20Tracker_files/2017103020182039.jpg', 4, 105.00, 'Voice dialing/voice reporting, tamper alert via light sensor, and SOS button in a compact smart watch design'),
	('Coban', 'GPS-310', 'https://www.coban.net.ec/GPS%20Vehicle%20Tracker_files/2017103020204600.jpg', 3, 110.00, 'Suitable for tracking valuable items such as luggage, etc., and records that are dumped from the suitcase for compensation in case of damage'),
	('Teltonika', 'FMB920', 'https://teltonika-gps.com/cdn/extras/22491/fmb920-side-840xAuto.webp', 11, 160.00, 'The most popular compact 2G model for basic tracking'),
	('Teltonika', 'FMC130', 'https://teltonika-gps.com/cdn/extras/22514/fmc130-side-840xAuto.webp', 2, 170.00, 'Advanced 4G LTE Cat 1 tracker with flexible inputs'),
	('Teltonika', 'FMC920', 'https://teltonika-gps.com/cdn/extras/25439/fmc920-side-840xAuto.webp', 13, 180.00, 'The most popular compact 4G LTE Cat 1 model for basic tracking'),
	('Teltonika', 'FMC250', 'https://teltonika-gps.com/cdn/extras/24874/fmc250-side-840xAuto.webp', 14, 190.00, 'Water-resistant 4G LTE Cat 1 tracker with integrated CAN data processor'),
	('Teltonika', 'FTC881', 'https://teltonika-gps.com/cdn/extras/19353/ftc881-side-2-840xAuto.webp', 1, 200.00, 'Next-generation high voltage 4G LTE Cat 1 battery-mounted vehicle GPS tracker with enhanced GNSS accuracy and IP69K resistance');
GO
