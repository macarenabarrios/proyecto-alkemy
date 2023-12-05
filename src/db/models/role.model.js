import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

const Role = sequelize.define("roles", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
},
  {
    timestamps: false
  }
);

export default Role;