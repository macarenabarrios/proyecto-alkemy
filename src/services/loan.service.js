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
    let response = {
        data: null,
        error: null
    }

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

            if (!book) {
                response.error = 'Libro no encontrado.';
                return response;
            }

            if (!user) {
                response.error = 'Usuario no encontrado.';
                return response;
            }

            if (book?.stock > 0) {

                await Book.update({ stock: book.stock - 1 }, { where: { isbn: data.isbn } })

                if (user?.id && book?.id) {
                    data.userId = user.id;
                    data.bookId = book.id;

                    const newLoan = await loanRepository.save(data);

                    response.data = newLoan;

                    return response;

                } else {
                    response.error = 'Usuario o libro no encontrado.';
                    return response;
                }
            }
            else {
                response.error = `No hay más stock del libro ${book?.title} con ISBN #${book?.isbn}.`;
                return response;
            }

        } else {
            response.error = `Faltan datos necesarios para crear un préstamo.`;
            return response;
        }

    } catch (error) {
        response.error = error;
        return response;
    }
};

const update = async (id, loan) => {
    await loanRepository.update(id, loan);
}

const deleteLoan = async (id) => {
    await loanRepository.deleteById(id);
}

export const loanService = { create, getAll, getById, update, deleteLoan }