-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "startingPrice" DECIMAL(65,30) NOT NULL,
    "currentPrice" DECIMAL(65,30) NOT NULL,
    "imageUrl" TEXT,
    "endTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);


CREATE OR REPLACE FUNCTION set_current_price()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.currentPrice IS NULL THEN
        NEW.currentPrice := NEW.startingPrice;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


CREATE TRIGGER before_insert_set_current_price
BEFORE INSERT ON "Item"
FOR EACH ROW
EXECUTE FUNCTION set_current_price();
