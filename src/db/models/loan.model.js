import { sequelize } from "../index.db.js";
import { DataTypes } from "sequelize";

export const Loan = sequelize.define("loans", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    }
},
{
    timestamps: false
}) 