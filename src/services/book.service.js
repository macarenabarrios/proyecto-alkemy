import { bookRepository } from '../repositories/book.repository.js';
import { authorService } from './author.service.js';
import { userService } from './user.service.js';
import { sendNewNotification } from '../communications/email.service.js';

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
		console.log("Book:", book);
		const authorsId = book.authorsId || [];
		const authors = book.authors || [];

		// Verificar existencia de autores por ID
		await Promise.all(
			authorsId.map(async (id) => {
				try {
					const existingAuthor = await authorService.getById(id);
					if (!existingAuthor) {
						throw new Error(`El autor con ID ${id} no existe`);
					}
				} catch (error) {
					throw new Error(`Error verificando autor con ID ${id}: ${error.message}`);
				}
			})
		);

		// Crear autores si no existen
		const createdAuthors = await Promise.all(
			authors.map(async (newAuthor) => {
				try {
					// Intenta encontrar el autor por su nombre y fecha de nacimiento
					const existingAuthor = await authorService.findAuthorByProperties({
						firstName: newAuthor.firstName,
						lastName: newAuthor.lastName,
						birthdate: newAuthor.birthdate,
					});

					if (!existingAuthor) {
						return await authorService.createAuthor(newAuthor);
					} else if (!existingAuthor.firstName || !existingAuthor.lastName) {
						throw new Error(`Error creando autor: El autor encontrado no tiene las propiedades necesarias`);
					}
				} catch (error) {
					throw new Error(`Error creando autor: ${error.message}`);
				}
			})
		);

		const createdBook = await bookRepository.newBook(book);

		/**** Lógica para notificar por email a todos los usuarios  ****/

		const existingAuthorIds = new Set(authorsId);
		const allAuthorIds = new Set([...existingAuthorIds, ...createdAuthors.map(author => author.id)]);
		const allAuthors = await Promise.all(Array.from(allAuthorIds).map(async authorId => {
			if (existingAuthorIds.has(authorId)) {
				// Si el autor existe, obtiene sus detalles
				const existingAuthor = await authorService.getById(authorId);
				return existingAuthor;
			} else {
				// Si el autor es recién creado, lo busca en la lista
				return createdAuthors.find(createdAuthor => createdAuthor.id === authorId);
			}
		}));

		const hasNewAuthors = createdAuthors.length > 0;

		const subject = hasNewAuthors
			? 'Nuevo Autor y Libro en Alkemy Library'
			: 'Nuevo Libro en Alkemy Library';

		const notificationData = {
			book: book.title,
			author: allAuthors,
			subject: subject,
			createdAt: new Date(),
		};

		const usersResult = await userService.getAll();
		const users = usersResult.content;

		users.forEach(user => {
			sendNewNotification(user.email, user.firstname, notificationData);
		});

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

const getByAuthorOrTitle = async (authorId, title) => {
	return await bookRepository.getByAuthorOrTitle(authorId, title);
};

export const bookService = {
	availableBooks,
	deleteBook,
	getAll,
	getById,
	newBook,
	update,
	getByAuthorOrTitle
};
