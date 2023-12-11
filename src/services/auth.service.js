import jwt from 'jsonwebtoken';
import { userService } from './user.service.js';
import { roleService } from './role.service.js';
import { comparePassword } from '../utils/hash.util.js';
import { sendEmail } from '../communications/email.service.js';
import welcomeMessage from '../communications/messages/welcome.message.js';
import { recordUserAction } from '../services/user-action-log.service.js';
import Actions from '../utils/constants/actions.js';


export const authenticate = async (email, password) => {
	try {
		const user = await userService.findByEmail(email);
		if (!user) throw new Error("User doesn't exist");
		const validPassword = await comparePassword(password, user.password);
		if (!validPassword) throw new Error("Bad credentials");
		if (!user.isActive) throw new Error("Confirm your account");
		const response = await generateToken(user);
		console.log(response);
		try {
			recordUserAction(Actions.SIGN_IN_USER,user.id)
		} catch (error) {
			throw error
		}
		return response;
	} catch (error) {
		throw error;
	}
};

export const register = async (user) => {
	try {
		const newUser = await userService.create(user);
		const { email, firstname } = user;
		const subject = 'Bienvenido a Alkemy Library';
		const text = welcomeMessage.replace('{firstname}', firstname);
		await sendEmail(email, subject, text);
		console.log("Usuario registrado exitosamente");
		console.log(newUser)
		const response = await generateToken(newUser);
		try {
			recordUserAction(Actions.REGISTER_USER,newUser.id)
		} catch (error) {
			throw error
		}
		return response;
	} catch (error) {
		throw error;
	}
};

const generateToken = async (user) => {
	const role = await roleService.findById(user.roleId);
	return jwt.sign(
		{ username: user.email, role: role.name, id: user.id },
		process.env.SECRET_KEY,
		{ expiresIn: "24h" }
	);
};

export const authService = {
	authenticate,
	register
};
