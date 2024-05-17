import Book from '../db/models/book.model.js';
import Category from '../db/models/category.model.js';
import { categoryRepository } from '../repositories/category.repository.js';

const getAll = async () => {
    const response = await categoryRepository.findAll();
    return response;
};

const getAllCategories = async () => {
    const response = await categoryRepository.findAllCategories();
    return response;
};

const getById = async (id) => {
    const bookCategory = await categoryRepository.findById(id)
    if (!bookCategory) {
        throw new Error(`Loan doesn't exist with id ${id}`)
    }
    return bookCategory;
};

const getByIdBookCategory = async (id) => {
    const bookCategory = await categoryRepository.findByIdBookCategory(id)
    if (!bookCategory) {
        throw new Error(`Category doesn't exist with id ${id}`)
    }
    return bookCategory;
};

const createBookCategory = async (bookCategory) => {
    let response = {
        data: null,
        error: null,
    }

    try {
        let data = null;

        if (bookCategory?.name && bookCategory?.isbn) {
            data = {
                name: bookCategory.name,
                isbn: bookCategory.isbn
            };

            const category = await Category.findOne({ where: { name: data.name } });
            const book = await Book.findOne({ where: { isbn: data.isbn } });

            if (!book) {
                response.error = 'Libro no encontrado.';
                return response;
            }

            if (!category) {
                response.error = 'Categoria no encontrada.';
                return response;
            }


            if (category?.id && book?.id) {
                data.categoryId = category.id;
                data.bookId = book.id;

                const newBookCategory = await categoryRepository.saveBookCategory(data);

                response.data = newBookCategory;

                return response;

            } else {
                response.error = 'Categoria o libro no encontrado.';
                return response;
            }

        } else {
            response.error = `Faltan datos necesarios para crear la asociación entre un libro y una categoria.`;
            return response;
        }

    } catch (error) {
        response.error = error;
        return response;
    }
};

const create = async (category) => {
    let response = {
        data: null,
        error: null,
    }

    try {
        let data = null;

        if (category?.name) {

            data = {
                name: category.name
            };

            const newCategory = await categoryRepository.save(data);

            response.data = newCategory;

            return response;

        }
        else {
            response.error = `Falta ingresar un nombre para crear una categoria.`;
            return response;
        }

    } catch (error) {
        response.error = error;
        return response;
    }
};

const update = async (id, bookCategory) => {
    await categoryRepository.update(id, bookCategory);
};

const updateBookCategory = async (id, bookCategory) => {
    await categoryRepository.updateBookCategory(id, bookCategory);
};

const deleteCategory = async (id) => {
    await categoryRepository.deleteById(id);
};

const deleteBookCategory = async (id) => {
    await categoryRepository.deleteByIdBookCategory(id);
};

export const categoryService = {
    create,
    createBookCategory,
    getAll,
    getAllCategories,
    getById,
    getByIdBookCategory,
    update,
    updateBookCategory,
    deleteBookCategory,
    deleteCategory
};