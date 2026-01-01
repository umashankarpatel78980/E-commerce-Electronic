import express from "express";
import { register, login, sendForgotPasswordOTP, verifyOTP, resetPassword } from "../controllers/User.js";
import { protect } from "../middlewares/auth.js";
import { authorize } from "../middlewares/Role.js";

const router = express.Router();

router.post("/register", register);
router.get(
    "/admin",
    protect,
    authorize("Admin"),
    (req, res) => {
        res.json({ message: "Admin access granted" });
    }
);
router.post("/login", login);
router.post("/send-forgot-password-otp", sendForgotPasswordOTP);
router.post("/verify-otp", verifyOTP);
router.post("/reset-password", resetPassword);
export default router;
