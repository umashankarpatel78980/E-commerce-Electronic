import express from "express";
import {
    addProduct,
    updateProduct,
    deleteProduct,
    getProducts,
    getProductById
} from "../controllers/Product.js";

import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/Role.js";

const router = express.Router();

/* USER & ADMIN (Login required) */
router.get("/", protect, getProducts);
router.get("/:id", protect, getProductById);

/* ADMIN ONLY */
router.post("/", protect, authorize("Admin"), addProduct);
router.put("/:id", protect, authorize("Admin"), updateProduct);
router.delete("/:id", protect, authorize("Admin"), deleteProduct);

export default router;
