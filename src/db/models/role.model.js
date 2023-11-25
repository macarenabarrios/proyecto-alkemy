import { sequelize } from "../index.db.js";
import { DataTypes } from "sequelize";

export const Role = sequelize.define("roles", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false
    }
) 