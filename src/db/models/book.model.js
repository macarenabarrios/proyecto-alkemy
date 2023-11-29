import { DataTypes } from 'sequelize';
import { sequelize } from "../index.db.js"

const Book = sequelize.define("books", {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  isbn: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true
  },
  edition: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
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

export default Book;