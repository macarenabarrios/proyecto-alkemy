import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { userValidation } from '../middleware/validations/user.validation.js';


const router = Router();

router.post("/login",userValidation.onLogin, login);
router.post("/register",userValidation.onCreate, register);

export default router;
