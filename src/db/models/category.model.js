import { sequelize } from "../index.db.js";
import { DataTypes } from "sequelize";

const Category = sequelize.define("category", {

    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
    {
        timestamps: false
    }
) 

export default Category;