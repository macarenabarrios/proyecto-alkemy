import { sequelize } from "./index.db.js";
import  Role  from "./models/role.model.js";

const roles =
  [
    { "id": 1, name: 'ADMIN' },
    { "id": 2, name: 'BOOK_MANAGER' },
    { "id": 3, name: 'USER' },
  ]


const seed = async () => {

  const existingRoles = await Role.findAll();

  const missingRoles = roles.filter(
    (role) => !existingRoles.some((existingRole) => existingRole.name === role.name)
  );
  if (existingRoles.length !== roles.length) {
    await sequelize.getQueryInterface().bulkInsert('roles', missingRoles);

  }

}


export default seed;
