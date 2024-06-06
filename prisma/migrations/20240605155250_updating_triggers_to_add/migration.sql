-- This is an empty migration.

CREATE OR REPLACE FUNCTION set_current_price()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."currentPrice" IS NULL THEN
        NEW."currentPrice" := NEW."startingPrice";
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
