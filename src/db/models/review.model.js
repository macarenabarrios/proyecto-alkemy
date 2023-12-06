import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

export const Review = sequelize.define("reviews", {
	message: {
		type: DataTypes.STRING,
		allowNull: false
	},
	score: {
		type: DataTypes.INTEGER,
		allowNull: false,
		validate: {
			min: 1,
			max: 5, 
		}
	}
},
	{
		timestamps: true,
		paranoid: true
	}
);

export default Review;