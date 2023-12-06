import { authorRepository } from '../repositories/author.repository.js';

//Funcion para obtener un autor por Id
const getById = async (id) => {
  try {
    const response = await authorRepository.getAuthorById(id);
    if (!response) {
      throw { status: 404, message: "Autor no encontrado" };
    }
    return response;
  } catch (error) {
    throw error;
  }
};

//Funcion para obtener una lista de autores
const getAllAuthors = async (page = 1, pageSize = 10, filterByName = null) => {
  try {
    const authors = await authorRepository.getAllAuthors();
    // Aplica filtrado por nombre si es proporcionado
    const filteredAuthors = filterByName
      ? authors.filter((author) =>
        author.firstName.toLowerCase().includes(filterByName.toLowerCase())
      )
      : authors;

    // Calcula el índice de inicio y fin para la paginación
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    // Obtiene la porción de autores para la página actual
    const paginatedAuthors = filteredAuthors.slice(startIndex, endIndex);

    return paginatedAuthors;
  } catch (error) {
    throw error;
  }
};

const createAuthor = async (authorData) => {
  try {
    const newAuthor = await authorRepository.createAuthor(authorData);
    return newAuthor;
  } catch (error) {
    throw error;
  }
};

export const authorService = {
  getById,
  createAuthor,
  getAllAuthors,
};
