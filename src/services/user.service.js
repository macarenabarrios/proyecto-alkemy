import { roleRepository } from '../repositories/role.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.util.js';

const getAll = async (page,size) => {
  const response = await userRepository.findAll(page,size);
  return response;
};

const getById = async (id) => {
  const user = await userRepository.findById(id)
  if (!user) {
    throw new Error(`User doesn't exist with id ${id}`)
  }
  return user;
};

const create = async (user) => {
  try {
    const defaultRole = await roleRepository.findByName("USER");
    user.roleId = defaultRole.id;
    user.isActive = true;
    user.password = await hashPassword(user.password);
    const newUser = await userRepository.save(user);
    return newUser;
  } catch (error) {
    console.error(error);
  }
};

const update = async (id, user) => {
  await userRepository.update(id, user);
};

const deleteUser = async (id) => {
  await userRepository.deleteById(id);
};

const findByEmail = async (email) => {
  const response = await userRepository.findByEmail(email);
  return response;
};

export const userService = {
  getAll,
  getById,
  create,
  update,
  deleteUser,
  findByEmail
}