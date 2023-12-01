import { DataTypes } from 'sequelize';
import { sequelize } from './../index.db.js';

const Publisher = sequelize.define("publishers", {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }
},
  {
    timestamps: true,
    paranoid: true
  }
);

export default Publisher;