import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

const Category = sequelize.define("categories", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    timestamps: false
  }
);

export default Category;