
import Book from '../db/models/book.model.js'

const deleteBook = async (id) => {
	await Book.destroy({
		where: { id: id }
	});
};

const getAll = async () => {
	const books = await Book.findAll({
		where: { isActive: true }
	});
	return books;
};

const getById = async (id) => {
	const book = await Book.findByPk(id,
		{
			where: { isActive: true }
		});
	return book;
};

const newBook = async (book) => {
	try {
		const createdBook = await Book.create(book);
		return createdBook;
	} catch (error) {
		if (error.name === 'SequelizeValidationError') {
			throw new Error(`Validation error: ${error.message}`);
		} else if (error.name === 'SequelizeUniqueConstraintError') {
			throw new Error(`ISBN must be unique: ${error.message}`);
		} else {
			throw new Error(`Error creating book: ${error.message}`);
		}
	}
};

const update = async (id, book) => {
	const [updatedRowCount] = await Book.update(book, {
		where: { id: id }
	});
	if (updatedRowCount === 0) {
		return null; // Devuelve null si no se actualizó ninguna fila
	}
	const updatedBook = await Book.findByPk(id);
	return updatedBook;
};

export const bookRepository = {
	deleteBook,
	getAll,
	getById,
	newBook,
	update
};