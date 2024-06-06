
-- Create the trigger function
CREATE OR REPLACE FUNCTION update_current_price()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."startingPrice" > OLD."currentPrice" THEN
        NEW."currentPrice" := NEW."startingPrice";
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
CREATE TRIGGER before_update_set_current_price
BEFORE UPDATE ON "Item"
FOR EACH ROW
EXECUTE FUNCTION update_current_price();
