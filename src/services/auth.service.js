import jwt from 'jsonwebtoken';
import { userService } from './user.service.js';
import { comparePassword } from '../utils/hash.util.js';

export const authenticate = async (email, password) => {
    try {
        const user = await userService.findByEmail(email)
        if (!user) throw new Error("User doesn't exist");
        const validPassword = await comparePassword(password, user.password);
        if(!validPassword) throw new Error("Bad credentials");
        if (!user.isActive) throw new Error("Confirm your account");
        const token = jwt.sign({username:user.email,role:user.role.name}, process.env.SECRET_KEY, { expiresIn: "24h" });
        return token;
    } catch (error) {
        throw error
    }
}




export const authService = {authenticate};