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
