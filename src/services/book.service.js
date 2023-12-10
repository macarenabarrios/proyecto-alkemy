import { bookRepository } from '../repositories/book.repository.js';
import { authorService } from './author.service.js';
import { userService } from './user.service.js';
import { sendNewNotification } from './email.service.js';

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
					// Manejar errores específicos si es necesario
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
						// Crea el nuevo autor si no existe
						await authorService.createAuthor(newAuthor);
					}
				} catch (error) {
					// Lanzar error si hay un problema al crear el autor nuevo
					throw new Error(`Error creando autor: ${error.message}`);
				}
			})
		);

		const createdBook = await bookRepository.newBook(book);

		/**** Lógica para notificar por email a todos los usuarios  ****/
		const newAuthorNames = createdAuthors.map(author => `${author.firstName} ${author.lastName}`).join(', ');

		const allAuthors = newAuthorNames.length > 0 ? [...authors, ...createdAuthors] : [...authors];

		const notificationData = {
			book: book.title,
			author: allAuthors,
			subject: newAuthorNames.length > 0
				? 'Nuevo Autor y Libro en Alkemy Library'
				: 'Nuevo Libro en Alkemy Library',
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

/**
 *
 * 		const users = await userService.getAll();
		const subject = authors.length > 0 ? 'Nuevo Libro en Alkemy Library' : 'Nuevo Autor y Libro en Alkemy Library';

		for (const user of users) {
			try {
				// Si authors.length es 0, esto lanzará un error y se manejará en el bloque catch
				const authorFullNames = authors.map(author => `${author.firstname} ${author.lastname}`).join(', ');
				await sendNewNotification(user.email, user.firstname, {
					book: createdBook.title,
					authors: authorFullNames,
					subject
				});
				// Solo envía el correo una vez si hay al menos un autor nuevo
				break;
			} catch (error) {
				// Si se lanza un error, asumimos que no hay autores nuevos y continuamos con el siguiente bloque
			}

			await sendNewNotification(user.email, user.firstname, {
				book: createdBook.title,
				author: `${authors[0].firstname} ${authors[0].lastname}`, // Ajusta esto según tu lógica
			});
		}
 */