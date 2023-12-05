import jwt from 'jsonwebtoken';

export const extractAuthenticated = (req, res, next) => {
	let token = req.headers.authorization;
	if (!token) throw new Error("Invalid Token");

	try {
		token = token.replace("Bearer ", "");
		const decode = jwt.verify(token, process.env.SECRET_KEY);
		const user = decode;
		console.log(user.id)
		if (user) {
			req.userId = user.id; //se obtinee el userId a traves del token y lo añado a req 
			next();
		} else {
			throw new Error("Forbbiden! You are not the owner of this account");
		}
	} catch (error) {
		throw error;
	}
};
