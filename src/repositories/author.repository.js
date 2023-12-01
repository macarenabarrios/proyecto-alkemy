import Author from "../db/models/author.model.js";

const getAuthorById = async (id) => {
  try {
    const response = await Author.findOne({
      where: { id },
    });
    return response;
  } catch (error) {
    console.error('Error en el repositorio al obtener autor por ID:', error);
    throw new Error('Error al obtener autor por ID');
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

export const authorRepository = {
  getAuthorById,
  createAuthor
};
