import { bookRepository } from '../repositories/book.repository.js';

const deleteBook = async (id) => {
	let book = await bookRepository.getById(id);
	if (!book) {
		throw new Error(`Book with id ${id} not found`)
	} else {
		book = await bookRepository.deleteBook(id);
	}
	return book;
};

const getAll = async () => {
	const books = await bookRepository.getAll();
	return books;
};

const getById = async (id) => {
	const book = await bookRepository.getById(id);
	if (!book) {
		throw new Error(`Book with id ${id} not found`)
	}
	return book;
};

const newBook = async (book) => {
	try {
		const createdBook = await bookRepository.newBook(book);
		return createdBook;
	} catch (error) {
		throw new Error(`Error creating book: ${error.message}`);
	}
};

const update = async (id, book) => {
	let updatedBook = await bookRepository.getById(id);
	if (!updatedBook) {
		throw new Error(`Book with id ${id} not found`);
	} else {
		updatedBook = await bookRepository.update(id, book);
	}
	return updatedBook;
};

export const bookService = {
	deleteBook,
	getAll,
	getById,
	newBook,
	update
};