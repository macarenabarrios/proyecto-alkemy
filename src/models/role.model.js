import { DataTypes } from "sequelize";

const Role = (sequelize, Sequelize) => {
  const Role = sequelize.define("roles", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps:false
  }
  )

  Role.associate = (model)=>{
    Role.hasMany(model.User,{foreignKey: 'role_id'});
  }
  return Role;
};



export default Role;