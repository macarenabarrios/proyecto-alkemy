import User from "../db/models/user.model.js";
import Loan from "../db/models/loan.model.js";
import Book from "../db/models/book.model.js";

const save = async (loan) => {
  const newLoan = await Loan.create(await loan);
  return newLoan;
};

const findAll = async () => {
  try {
    const response = await Loan.findAll({
      include: [
        {
          model: Book,
          attributes: ['id', 'title', 'description', 'isbn', 'edition', 'stock', 'image']
        },
        {
          model: User,
          attributes: ['id', 'email', 'membership_number']
        }
      ],
      attributes: ['id', 'startDate', 'dueDate']
    });


    return response;
  } catch (error) {
    console.error("Error de Sequelize:", error.message);
    console.error("Error detallado:", error);
  }
};

const findById = async (id) => {
  const response = await Loan.findOne({
    include: [
      {
        model: Book,
        attributes: ['id', 'title', 'description', 'isbn', 'edition', 'stock', 'image']
      },
      {
        model: User,
        attributes: ['id', 'email', 'membership_number']
      }
    ],
    attributes: ['id', 'startDate', 'dueDate'],
    where: {
      id: id
    }
  });
  return response;
};

const update = async (id, loan) => {
  await Loan.update(loan, {
    where: {
      id: id,
    },
  });
};

const deleteById = async (id) => {
  await Loan.destroy({
    where: {
      id: id,
    },
  });
};

export const loanRepository = { save, findAll, findById, update, deleteById };