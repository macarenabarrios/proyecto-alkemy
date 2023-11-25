import { DataTypes } from "sequelize";

const User = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
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
    numMembership:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'num_membership'
    },
    deleted:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        default:false
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
        field:'is_active'
    },
  }
  )
  User.associate = (model)=>{
    User.belongsTo(model.Role,{foreignKey:'role_id'});
  }
  return User;
};

export default User;