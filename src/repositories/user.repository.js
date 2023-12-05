import User from "../db/models/user.model.js";
import Role from "../db/models/role.model.js";

const findAll = async (page = 0, size = 10) => {
	page = parseInt(page);
	size = parseInt(size);
	const offset = page === 0 ? page : page * size;
	const limit = parseInt(size);
	try {
		const { count, rows } = await User.findAndCountAll({
			
			offset: offset,
			limit: limit,
			order: [['id', 'ASC']],

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
		return {
			content:rows,
			totalPages: Math.ceil(count / limit),
			totalElements:count
		};
	} catch (error) {
		throw error
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
