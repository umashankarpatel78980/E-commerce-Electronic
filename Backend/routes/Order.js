import express from "express";
import {
    placeOrder,
    getMyOrders,
    getOrderById,
    updateOrderStatus,
    cancelOrder,
} from "../controllers/Order.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", protect, placeOrder);
router.get("/my-orders", protect, getMyOrders);
router.get("/:id", protect, getOrderById);
router.put("/:id/status", protect, updateOrderStatus);
router.put("/:id/cancel", protect, cancelOrder);

export default router;
