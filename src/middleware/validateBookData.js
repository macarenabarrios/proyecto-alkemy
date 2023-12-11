export const validateBookData = (req, res, next) => {
	const { authors, authorsId } = req.body;
	if (!authors && !authorsId) {
		return res.status(400).json({ error: 'Debe proporcionar al menos un autor (authors o authorsId)' });
	}
	next();
};

