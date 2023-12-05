import Book from "../db/models/book.model.js";
import Author from "../db/models/author.model.js";
import Category from "../db/models/category.model.js";
import Publisher from "../db/models/publisher.model.js";
import { Op } from "sequelize";

const deleteBook = async (id) => {
	await Book.destroy({
		where: { id },
	});
};

const getAll = async () => {
	const books = await Book.findAll({
		where: { isActive: true, 
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

const newBook = async (book) => {
	const authorsId = book.authors;
	const categoryId = book.categories;
	const publisherId = book.publisherId;

	if (!authorsId) {
		throw new Error("Debe agregar uno o más autores");
	}
	if (!categoryId) {
		throw new Error("Debe agregar una o más categorías");
	}
	if (!publisherId) {
		throw new Error("Debe especificar exactamente un publisher");
	}

	await Promise.all(
		authorsId.map(async (id) => {
			const authors = await Author.findByPk(id);
			if (!authors) throw new Error(`El autor con ID ${id} no existe`);
		})
	);
	await Promise.all(
		categoryId.map(async (id) => {
			const category = await Category.findByPk(id);
			if (!category) throw new Error(`La categoría con ID ${id} no existe`);
		})
	);
	const publisher = await Publisher.findOne({
		where: { id: publisherId },
	});
	if (!publisher) {
		throw new Error(`El publisher con ID ${publisherId} no existe`);
	}

	try {
		const createdBook = await Book.create(book);
		if (authorsId.length) {
			const authors = await Author.findAll({
				where: { id: authorsId },
			});
			await createdBook.addAuthors(authors, { through: "Book_Author" });
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

export const bookRepository = {
	deleteBook,
	getAll,
	getById,
	newBook,
	update,
};
