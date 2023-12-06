import { bookRepository } from '../repositories/book.repository.js';

const availableBooks = async (authorName, bookTitle) => {
	try {
		const books = await bookRepository.availableBooks(authorName, bookTitle);
		return books;
	} catch (error) {
		throw new Error(`Error en el servicio al obtener libros disponibles: ${error.message}`);
	}
};

const deleteBook = async (id) => {
	let book = await bookRepository.getById(id);
	if (!book) {
		throw new Error(`Book with id ${id} not found`)
	}
	book = await bookRepository.deleteBook(id);
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
	}
	updatedBook = await bookRepository.update(id, book);
	return updatedBook;
};

const getByAuthorOrTitle= async (authorId, title) =>{
  return await bookRepository.getByAuthorOrTitle(authorId, title);
}
export const bookService = {
	availableBooks,
	deleteBook,
	getAll,
	getById,
	newBook,
	update,
	getByAuthorOrTitle
};