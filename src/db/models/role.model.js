import { sequelize } from "../index.db.js";
import { DataTypes } from "sequelize";

const Role = sequelize.define("roles", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false
    }
) 

// Role.belongsTo(User,{foreignKey:'role_id'})

export default Role;