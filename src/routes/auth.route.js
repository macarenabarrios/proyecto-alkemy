import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { logAction, logError } from "../logger/logger.js";
import Actions from "../utils/constants/actions.js";

const router = Router();

router.post("/login",login);
router.post("/register", register);

export default router;
