import { Hono } from "hono";
import { AuthController } from "./auth.controller";

const authRouter = new Hono();
const authController = new AuthController();

// Send OTP to phone number
authRouter.post("/send-otp", (c) => authController.sendOTP(c));

// Verify OTP
authRouter.post("/verify-otp", (c) => authController.verifyOTP(c));

export default authRouter;
