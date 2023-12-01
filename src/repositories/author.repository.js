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

export const authorRepository = {
  getAuthorById,
};
