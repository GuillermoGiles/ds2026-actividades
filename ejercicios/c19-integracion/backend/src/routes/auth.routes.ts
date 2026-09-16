import { Router } from "express";
import { validate } from "../middlewares/validate.middleware";
import { authenticate } from "../middlewares/auth.middleware";
import { loginSchema, registroSchema } from "../validations/auth.validation";
import * as authController from "../controllers/auth.controller";

const router = Router();

router.post("/registro", validate(registroSchema), authController.registrar);
router.post("/login", validate(loginSchema), authController.login);
router.get("/yo", authenticate, authController.yo);

export default router;
