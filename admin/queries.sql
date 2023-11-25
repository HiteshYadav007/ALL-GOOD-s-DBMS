DELIMITER //

CREATE TRIGGER DecreaseQuantityAfterOrder
AFTER INSERT ON store.orders
BEGIN
    DECLARE newProductId INT;
    
    -- Get the productId of the newly inserted row
    SET newProductId = NEW.productId;

    -- Decrease the quantity in the Products table
    UPDATE product
    SET quantity = quantity - 1
    WHERE productId = newProductId;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER DecreaseQuantityAfterOrder
AFTER INSERT ON orders
BEGIN
    UPDATE product
    SET product.quantity = product.quantity - 1
    WHERE product.productId = NEW.productId;
END;
// 
DELIMITER ;

STR_TO_DATE(CONCAT(YEAR(NOW()), '-', LPAD(currentMonth, 2, '0'), '-01'), '%Y-%m-%d');

DELIMITER //

CREATE TRIGGER DecreaseQuantityAfterOrder
AFTER INSERT ON orders
BEGIN
    UPDATE product
    SET quantity = quantity - 1
    WHERE productId IN (SELECT productId FROM orders);
END;

//

DELIMITER ;
