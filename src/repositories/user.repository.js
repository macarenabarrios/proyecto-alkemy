import User from '../db/models/user.model.js';
import Role from '../db/models/role.model.js';

const findAll = async () => {
	try {
		const response = await User.findAll({
			attributes: {
				exclude: ["roleId"],
			},
			include: [
				{
					model: Role,
					attributes: ["name"],
				},
			],
			where: {
				isActive: true,
			},
		});
		return response;
	} catch (error) {
		console.error("Error de Sequelize:", error.message);
		console.error("Error detallado:", error);
	}
};

const findById = async (id) => {
	const response = await User.findOne({
		attributes: {
			exclude: ["roleId"],
		},
		include: [
			{
				model: Role,
				attributes: ["name"],
			},
		],
		where: {
			id: id,
			isActive: true,
		},
	});
	return response;
};

const save = async (user) => {
	const newUser = await User.create(user);
	console.log(newUser.dataValues);
	return newUser.dataValues;
};

const update = async (id, user) => {
	await User.update(user, {
		where: {
			id: id,
		},
	});
};

const deleteById = async (id) => {
	try {
		await User.destroy({
			where: {
				id: id,
			},
		});
	} catch (error) {
		throw error;
	}
};

const findByEmail = async (email) => {
	try {
		const response = await User.findOne({
			include: [
				{
					model: Role,
				},
			],
			where: {
				email: email,
			},
		});
		return response;
	} catch (error) {
		console.log(error);
	}
};

export const userRepository = {
	findAll,
	findById,
	save,
	update,
	deleteById,
	findByEmail,
};
