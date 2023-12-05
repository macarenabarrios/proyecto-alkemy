import { sequelize } from "../index.db.js";
import { DataTypes } from "sequelize";

const Loan = sequelize.define("loans", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
    startDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    dueDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    returned:{
        type:DataTypes.BOOLEAN,
        defaultValue:false,
        
    }
},
{
    timestamps: false
}) 

export default Loan;