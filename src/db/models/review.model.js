import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

export const Review = sequelize.define("reviews", {
	message: {
		type: DataTypes.STRING,
		allowNull: false
	}
},
	{
		timestamps: true,
		paranoid: true
	}
);

export default Review;