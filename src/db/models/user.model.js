import { DataTypes } from 'sequelize';
import { sequelize } from "./../index.db.js"
import { Book } from "./book.model.js"
import { Role } from './role.model.js';
import { Loan } from './loan.model.js';

export const User = sequelize.define("users", {
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
          isEmail: true,
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [6, 64]
        }
      },
      numberMembership:{
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
          field: 'number_membership'
      },
    //   deleted:{
    //       type:DataTypes.BOOLEAN,
    //       allowNull:false,
    //       default:false
    //   },
      isActive:{
          type:DataTypes.BOOLEAN,
          allowNull: false,
          default: false,
          field:'is_active'
      },
    },
    {
      paranoid:true
    }
);

Role.hasMany(User,{foreignKey: {name: 'roleId',field: 'role_id'} })

User.belongsTo(Role,{foreign_key: {name: 'roleId',field: 'role_id'} })

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
