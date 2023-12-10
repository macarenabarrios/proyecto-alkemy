import jwt from 'jsonwebtoken';
import { userService } from './user.service.js';
import { roleService } from './role.service.js';
import { comparePassword } from '../utils/hash.util.js';
import { sendEmail } from '../communications/email.service.js';
import welcomeMessage from '../communications/messages/welcome.Message.js';

export const authenticate = async (email, password) => {
	try {
		const user = await userService.findByEmail(email);
		if (!user) throw new Error("User doesn't exist");
		const validPassword = await comparePassword(password, user.password);
		if (!validPassword) throw new Error("Bad credentials");
		if (!user.isActive) throw new Error("Confirm your account");
		return generateToken(user);
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
		return generateToken(newUser);
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
