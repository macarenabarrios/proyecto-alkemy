import { DataTypes } from 'sequelize';
import { sequelize } from "../index.db.js"

export const Book = sequelize.define("Books", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    isbn: {
        type: DataTypes.INTEGER,
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
    }
},
{
    timestamps: true
}
);