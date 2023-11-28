import Book from "../db/models/book.model.js";
import { loanRepository } from "../repositories/loan.repository.js";
import { userRepository } from "../repositories/user.repository.js";

const getAll = async () => {
    const response = await loanRepository.findAll();
    return response;
}

const getById = async (id) => {
    const loan = await loanRepository.findById(id)
    if (!loan) {
        throw new Error(`Loan doesn't exist with id ${id}`)
    }
    return loan;
}

const create = async (loan) => {
    try {
        let data = null;

        if (loan?.email && loan?.isbn && loan?.dueDate) {
            data = {
                email: loan.email,
                isbn: loan.isbn,
                dueDate: loan.dueDate
            };

            const user = await userRepository.findByEmail(data.email);
            const book = await Book.findOne({ where: { isbn: data.isbn } });

            if (book.stock > 0) {

                await Book.update({ stock: book.stock - 1 }, { where: { isbn: data.isbn } })

                if (user?.id && book?.id) {
                    data.userId = user.id;
                    data.bookId = book.id;

                    const newLoan = await loanRepository.save(data);
                    return newLoan;

                } else {
                    return "Usuario o libro no encontrado."
                }
            }
            else {
                return `No hay más stock del libro ${book?.title} con ISBN #${book?.isbn}.`
            }

        } else {
            return "Faltan datos necesarios para crear un préstamo."
        }

    } catch (error) {

        console.error(error);

    }
};


export const loanService = { create, getAll, getById }