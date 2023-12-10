import Book from '../db/models/book.model.js';
import Author from '../db/models/author.model.js';
import Category from '../db/models/category.model.js';
import Publisher from '../db/models/publisher.model.js';
import { Op } from 'sequelize';
import { authorService } from '../services/author.service.js';

const availableBooks = async (authorName = '', bookTitle = '') => {
	try {
		let whereClause = {
			stock: {
				[Op.gt]: 0,
			},
		};

		if (authorName !== '') {
			whereClause['$authors.firstName$'] = {
				[Op.like]: `%${authorName}%`,
			};
		}

		if (bookTitle !== '') {
			whereClause.title = {
				[Op.like]: `%${bookTitle}%`,
			};
		}

		const books = await Book.findAll({
			where: whereClause,
			include: [
				{
					model: Author,
					as: 'authors',
					attributes: ['firstName', 'lastName'],
					through: { attributes: [] },
				},
			],
		});

		return books;
	} catch (error) {
		throw new Error(`Error en el repositorio al obtener libros disponibles: ${error.message}`);
	}
};

const deleteBook = async (id) => {
	await Book.destroy({
		where: { id },
	});
};

const getAll = async () => {
	const books = await Book.findAll({
		where: {
			isActive: true,
			stock: {
				[Op.gt]: 0
			}
		},
		include: [
			{ model: Category, through: { attributes: [] } },
			{ model: Author, through: { attributes: [] } },
		],
	});
	return books;
};

const getById = async (id) => {
	const book = await Book.findByPk(id, {
		where: { isActive: true },
		include: [
			{ model: Category, through: { attributes: [] } },
			{ model: Author, through: { attributes: [] } },
		],
	});
	return book;
};

const getByTitle = async (bookTitle) => {
	const book = await Book.findOne({
		where: { title: bookTitle }
	});
	return book;
};

const newBook = async (book) => {
	const categoryId = book.categories;
	const publisherId = book.publisherId;
	const authorsId = book.authorsId;
	const authors = book.authors;

	if (!(authorsId && authorsId.length) && !(authors && authors.length)) {
		throw new Error("Debe agregar uno o más autores (authors y/o authorsId)");
	}
	if (!categoryId) {
		throw new Error("Debe agregar una o más categorías");
	}
	if (!publisherId) {
		throw new Error("Debe especificar exactamente un publisher");
	}

	// Verificar existencia de categorias por ID
	await Promise.all(
		categoryId.map(async (id) => {
			const category = await Category.findByPk(id);
			if (!category) throw new Error(`La categoría con ID ${id} no existe`);
		})
	);

	// Verificar existencia del publisher
	const publisher = await Publisher.findOne({
		where: { id: publisherId },
	});
	if (!publisher) {
		throw new Error(`El publisher con ID ${publisherId} no existe`);
	}

	try {
		const createdBook = await Book.create(book);

		// Obtiene y agrega autores existentes al libro
		if (authorsId && authorsId.length) {
			const existingAuthors = await Author.findAll({
				where: { id: authorsId },
			});
			await createdBook.addAuthors(existingAuthors, { through: "Book_Author" });
		}

		// Obtiene y agrega autores nuevos al libro
		if (authors && authors.length) {
			const authorPromises = authors.map(async (newAuthor) => {
				try {
					const existingAuthor = await authorService.findAuthorByProperties({
						firstName: newAuthor.firstName,
						lastName: newAuthor.lastName
					});

					if (existingAuthor) {
						return { id: existingAuthor.id };
					} else {
						throw new Error(`El autor no se encontró en la base de datos.`);
					}
				} catch (error) {
					throw new Error(`Error buscando autor existente: ${error.message}`);
				}
			});

			try {
				const existingAuthors = await Promise.all(authorPromises);

				// Agregar los autores existentes al libro
				await createdBook.addAuthors(existingAuthors.map(author => author.id), { through: "Book_Author" });
			} catch (error) {
				console.error(`Error al agregar autores al libro: ${error.message}`);
			}
		}

		if (categoryId.length) {
			const categories = await Category.findAll({
				where: { id: categoryId },
			});
			await createdBook.addCategories(categories);
		}

		return createdBook;

	} catch (error) {
		if (error.name === "SequelizeValidationError") {
			throw new Error(`Validation error: ${error.message}`);
		} else if (error.name === "SequelizeUniqueConstraintError") {
			throw new Error(`ISBN must be unique: ${error.message}`);
		} else {
			throw new Error(`Error creating book: ${error.message}`);
		}
	}
};

const update = async (id, book) => {
	console.log({ bookInRepository: book });
	const [updatedRowCount] = await Book.update(book, {
		where: { id: id },
	});
	console.log({ updatedRowCount });
	if (updatedRowCount === 0) {
		return null;
	}
	const updatedBook = await Book.findByPk(id);
	return updatedBook;
};

const getByAuthorOrTitle = async (authorId, title) => {
	const search = {}
	if (title) {
		search.title = title
	}
	if (authorId) {
		search.authorId = authorId
	}
	return await Book.findAll({
		include: [
			{
				model: Author,
				through: { attributes: ["authorId"] },
			},
		],
		where: {
			search
		}
	})
};
export const bookRepository = {
	availableBooks,
	deleteBook,
	getAll,
	getById,
	getByTitle,
	newBook,
	update,
	getByAuthorOrTitle
};
