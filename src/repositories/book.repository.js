import { Book } from '../db/models/book.model.js';

const deleteBook = async (id) => {

};

const getAll = async () => {

};

const getById = async (id) => {

};

const newBook = async (book) =>{
	await Book.create(book);
};

const update = async (id, book) => {

};

export const bookRepository = {
	deleteBook,
	getAll,
	getById,
	newBook,
	update
};
