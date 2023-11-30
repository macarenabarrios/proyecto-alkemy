import { authorRepository } from "../repositories/author.repository.js";

//Funcion para obtener un autor por Id
const getById = async (id) => {
	try {
    const response = await authorRepository.getAuthorById(id);
    if (!response) {
      throw { status: 404, message: 'Autor no encontrado' };
    }
    return response;
  } catch (error) {
    throw { status: 500, message: 'Error interno del servidor' };
  }
};

export const authorService = {
  getById,
};
