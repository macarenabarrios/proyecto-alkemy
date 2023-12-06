import Role from '../db/models/role.model.js';

const findByName = async (name) => {
  const response = await Role.findOne({
    where: {
      name: name,
    },
  });
  return response;
};

const findById = async (id) => {
  const response = await Role.findOne({
    where: {
      id: id
    },
  });
  return response;
};

export const roleRepository = {
  findByName,
  findById
};