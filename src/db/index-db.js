import { Sequelize } from "sequelize";
import  User  from "../models/user.model.js";
import Role from '../models/role.model.js'
import dotenv from "dotenv";
dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: 'mysql',
    })


const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = User(sequelize, Sequelize)
db.Role = Role(sequelize, Sequelize)

db.Role.associate(db);
db.User.associate(db);

export {db};