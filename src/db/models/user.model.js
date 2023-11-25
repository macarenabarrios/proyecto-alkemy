import { DataTypes } from 'sequelize';
import { sequelize } from "./../index.db.js"
import { Book } from "./book.model.js"
import { Role } from './role.model.js';
import { Loan } from './loan.model.js';

export const User = sequelize.define("users", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    membershipNumber: {
        type: DataTypes.BIGINT,
        unique: true,
        autoIncrement: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    softDelete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    }
},
{
    timestamps: true
}
);

Role.hasMany(User)

User.belongsTo(Role)

User.belongsToMany(Book, {through: Loan})

Book.belongsToMany(User, {through: Loan})



// To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
// To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
// To create a Many-To-Many relationship, two belongsToMany calls are used together

//Sample One-to-Many:

// User.hasMany(Finance, {
//     foreignKey: "idFk_user",
//     sourceKey: "id"
// })

// Finance.belongsTo(User, {
//     foreignKey: "idFk_user",
//     targetKey: "id"
// })
