import User from "../db/models/user.model.js";
import Loan from "../db/models/loan.model.js";
import Book from "../db/models/book.model.js";
import BookCategory from "../db/models/bookCategory.model.js";
import Category from "../db/models/category.model.js";


const save = async (category) => {
  const newLoan = await Category.create(await category);
  return newLoan;
};

const saveBookCategory = async (bookCategory) => {
  const newLoan = await BookCategory.create(await bookCategory);
  return newLoan;
};

const findAll = async () => {
  try {
    const response = await BookCategory.findAll({
      include: [
        {
          model: Book,
          attributes: ['id', 'title', 'description', 'isbn', 'edition', 'stock', 'image']
        },
        {
          model: Category,
          attributes: ['id', 'name']
        }
      ],
      attributes: ['id']
    });


    return response;
  } catch (error) {
    console.error("Error de Sequelize:", error.message);
    console.error("Error detallado:", error);
  }
};

const findAllCategories = async () => {
  try {
    const response = await Category.findAll();
    return response;
  } catch (error) {
    console.error("Error de Sequelize:", error.message);
    console.error("Error detallado:", error);
  }
};

const findById = async (id) => {
  const response = await Category.findOne({
    where: {
      id: id
    }
  });
  return response;
};

const findByIdBookCategory = async (id) => {
  const response = await BookCategory.findOne({
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'description', 'isbn', 'edition', 'stock', 'image']
      },
      {
        model: Category,
        attributes: ['id', 'name']
      }
    ],
    attributes: ['id'],
    where: {
      id: id
    }
  });
  return response;
};

const update = async (id, category) => {
  await Category.update(category, {
    where: {
      id: id,
    },
  });
};

const updateBookCategory = async (id, bookCategory) => {
  await BookCategory.update(bookCategory, {
    where: {
      id: id,
    },
  });
};


const deleteById = async (id) => {
  await Category.destroy({
    where: {
      id: id,
    },
  });
};

const deleteByIdBookCategory = async (id) => {
  await BookCategory.destroy({
    where: {
      id: id,
    },
  });
};


export const categoryRepository = {
  save,
  saveBookCategory,
  findByIdBookCategory,
  findAllCategories,
  findAll,
  findById,
  update,
  updateBookCategory,
  deleteById,
  deleteByIdBookCategory
};
