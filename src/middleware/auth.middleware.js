import jwt from 'jsonwebtoken';
import AuthorizationError from '../exceptions/AuthorizationError.js';

export const hasAnyRole = (roles) => (req, res, next) => {
    let token = req.headers.authorization;
    if (!token) throw new Error("Invalid Token")

    try {
        token = token.replace("Bearer ", "")
        const decode = jwt.verify(token, process.env.SECRET_KEY);
        const user = decode;
        if (roles.includes(user.role)) {
            next();
        } else {
            throw new AuthorizationError("Forbidden");
        }
    } catch (error) {
        throw error
    }
}