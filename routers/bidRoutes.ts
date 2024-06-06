import express from "express";
import { getAllItemBids, createItemBid } from "../controllers/bidControllers";
import { AllowOnlyAuthenticated } from "../middlewares/auth";

const router = express.Router()


router.get('/:itemId', getAllItemBids)
router.post('/:itemId', AllowOnlyAuthenticated, createItemBid)


export default router