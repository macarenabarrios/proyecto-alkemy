import { userSchema } from "../schemas/user.schema.js";

const onCreate = (req, res, next) => {
  const { error } = userSchema.create.validate(req.body, { abortEarly: false });
	if (error) {
		const errorMessages = error.details.map(detail => detail.message);
		res.status(400).json({ messages: errorMessages });
} else {
		next();
}
};

const onLogin = (req, res, next) => {
  const { error } = userSchema.login.validate(req.body, { abortEarly: false });
	if (error) {
		const errorMessages = error.details.map(detail => detail.message);
		res.status(400).json({ messages: errorMessages });
} else {
		next();
}
};

const onUpdate = (req, res, next) => {
  const { error } = schemaUser.update.validate(req.body, { abortEarly: false });
	if (error) {
		const errorMessages = error.details.map(detail => detail.message);
		res.status(400).json({ messages: errorMessages });
} else {
		next();
}
};

export const userValidation = {
  onCreate,
  onLogin,
  onUpdate,
};