import jwt from 'jsonwebtoken';

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
            throw new Error("Unauthorized");
        }
    } catch (error) {
        throw error
    }
}