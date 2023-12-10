import Book from '../db/models/book.model.js';
import EntityNotFoundError from '../exceptions/EntityNotFoundError.js';
import { loanRepository } from '../repositories/loan.repository.js';
import { userRepository } from '../repositories/user.repository.js';
import { sendLoanNotification } from '../communications/email.service.js';

const getAll = async () => {
	const response = await loanRepository.findAll();
	return response;
};

const getById = async (id) => {
	const loan = await loanRepository.findById(id);
	if (!loan) {
		throw new EntityNotFoundError(`Loan doesn't exist with id ${id}`);
	}
	return loan;
};

const create = async (loan) => {
	let response = {
		data: null,
		error: null,
		availableLoans: null,
	};

	try {
		let data = null;

		if (loan?.email && loan?.isbn && loan?.dueDate) {
			data = {
				email: loan.email,
				isbn: loan.isbn,
				dueDate: loan.dueDate,
			};

			const user = await userRepository.findByEmail(data.email);
			const book = await Book.findOne({ where: { isbn: data.isbn } });

			if (!book) {
				response.error = "Libro no encontrado.";
				return response;
			}

			if (!user) {
				response.error = "Usuario no encontrado.";
				return response;
			}

			const countLoans = await loanRepository.countLoansByUserId(user?.id);

			if (countLoans >= 3) {
				response.error = "Limite de prestamos alcanzado.";
				return response;
			}

			if (book?.stock > 0) {
				await Book.update(
					{ stock: book.stock - 1 },
					{ where: { isbn: data.isbn } }
				);

				if (user?.id && book?.id) {
					data.userId = user.id;
					data.bookId = book.id;

					const newLoan = await loanRepository.save(data);

					response.availableLoans = 3 - countLoans;
					response.data = newLoan;

					await sendLoanNotification(user.email, user.firstname, {
						books: book.title,
						loanDate: newLoan.startDate,
						dueDate: newLoan.dueDate,
					});

					return response;
				} else {
					response.error = "Usuario o libro no encontrado.";
					return response;
				}
			} else {
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
};

const deleteLoan = async (id) => {
	await loanRepository.deleteById(id);
};

const deleteAllLoans = async (id) => {
	await loanRepository.deleteAllByUserId(id);
};

const returnBook = async (userId, bookId) => {
	try {
		const loanDb = await loanRepository.findByUserIdAndBookId(userId, bookId);
		if (!loanDb) {
			throw new EntityNotFoundError(
				`Loan not found for user ${userId} and book ${bookId}`
			);
		}
		const book = loanDb.book;

		book.set({
			stock: book.stock + 1,
		})
		loanDb.set({
			returned: true
		})
		book.save();
		loanDb.save();
	} catch (error) {
		throw error;
	}
};

export const loanService = {
	create,
	getAll,
	getById,
	update,
	deleteLoan,
	deleteAllLoans,
	returnBook,
};
