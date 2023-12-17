import EntityAlreadyExistError from '../exceptions/EntityAlreadyExistsError.js';
import { roleRepository } from '../repositories/role.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { hashPassword } from '../utils/hash.util.js';
import {loanService} from '../services/loan.service.js'
import {bookService} from '../services/book.service.js'
import BadRequest from '../exceptions/BadRequestError.js'

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
    const membershipExist = await userRepository.checkIfExist("membershipNumber",user.membershipNumber);
    if(membershipExist){
      throw new EntityAlreadyExistError("An user with memberhsip number '#" + user.membershipNumber + "' already exists.")
    }
    const emailExist = await userRepository.checkIfExist("email",user.email);
    if(emailExist){
      throw new EntityAlreadyExistError("An user with email '" + user.email + "' already exists.")
    }
    const defaultRole = await roleRepository.findByName("USER");
    user.roleId = defaultRole.id;
    user.isActive = true;
    user.password = await hashPassword(user.password);
    const newUser = await userRepository.save(user);
    return newUser;
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

const getRecommendations = async (userId) => {
  try {

    const userLoans = await loanService.getByUserId(userId);
    const userBookIds = userLoans.map((loan) => loan.book.id);
    
    const userCategories = Array.from(
      new Set(
        userLoans.flatMap((loan) => loan.book.categories)
      )
    );

    const similarBooks = await bookService.getAllByCategories(userCategories);

    const unreadBooks = similarBooks.filter((book) => {
      return !userBookIds.includes(book.id);
    });

    const recommendedBooks = unreadBooks.slice(0, 5).map((book) => book.title);

    return recommendedBooks;
  } catch (error) {
    console.error(error);
    throw new BadRequest('Error al obtener recomendaciones');
  }
};

export const userService = {
  getAll,
  getById,
  create,
  update,
  deleteUser,
  findByEmail,
  getRecommendations
};