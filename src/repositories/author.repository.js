import Author from '../db/models/author.model.js';

const getAuthorById = async (id) => {
  try {
    const response = await Author.findOne({
      where: { id },
    });
    return response;
  } catch (error) {
    console.error("Error en el repositorio al obtener autor por ID:", error);
    throw new Error("Error al obtener autor por ID");
  }
};

const getAllAuthors = async () => {
  try {
    const authors = await Author.findAll({ include: "books" });
    return authors;
  } catch (error) {
    console.error(
      "Error en el repositorio al obtener todos los autores:",
      error
    );
    throw new Error("Error al obtener la lista de autores");
  }
};

const createAuthor = async (authorData) => {
  try {
    const newAuthor = await Author.create(authorData);
    return newAuthor;
  } catch (error) {
    console.error('Error en el repositorio al crear un nuevo autor:', error);
    throw new Error('Error al crear un nuevo autor');
  }
};

const findAuthorByProperties = async (searchObject) => {
  try {
    const response = await Author.findOne({
      where: searchObject,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const authorRepository = {
  getAuthorById,
  getAllAuthors,
  createAuthor,
  findAuthorByProperties
};
