import { roleRepository } from '../repositories/role.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.util.js';

const getAll = async (page,size,firstname,lastname,email) => {
  const response = await userRepository.findAll(page,size,firstname,lastname,email);
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
    throw error
  }
};

const update = async (id, user) => {
  try {
    await userRepository.update(id, user);
    // recordUserAction(Actions.UPDATE_USER,user.id)
    
  } catch (error) {
    throw error
  }
};

const deleteUser = async (id) => {
  try {
    
    await userRepository.deleteById(id);
    // recordUserAction(Actions.DELETE_USER,user.id)
  } catch (error) {
    throw error
  }
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
};