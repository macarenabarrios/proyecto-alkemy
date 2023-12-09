import { Router } from "express";
import { login, register } from "../controllers/auth.controller.js";
import { logAction, logError } from "../logger/logger.js";
import Actions from "../utils/constants/actions.js";

const router = Router();

router.post(
	"/login",
	(req, res, next) => {
		logAction(
			req,
			`Usuario ${req.body.email} inició sesión`
		);
		next();
	},
	login
);
router.post("/register",
(req, res, next) => {
	try {
		logAction(
			req,
			`Usuario ${req.body.email} se registro`
		);
		next();
		
	} catch (error) {
		logError(req,
			`Hubo un error al registrar al usuario ${req.body.email}`
		)
		next(error)
	}
}, register);

export default router;
