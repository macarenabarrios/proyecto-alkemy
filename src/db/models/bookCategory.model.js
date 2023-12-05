import { DataTypes } from 'sequelize';
import { sequelize } from '../index.db.js';

const BookCategory = sequelize.define("Book_Category", {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  }
},
  {
    timestamps: false
  }
);

export default BookCategory;