import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';


const LogAction = sequelize.define('log_actions', {
  action: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
}, {
  
});

export default LogAction;