import { libraryRepository } from '../repositories/library.repository.js';

const createLibrary = async (userId) => {
  return libraryRepository.createLibrary(userId);
};

const getLibraryById = async (libraryId) => {
  return libraryRepository.getLibraryById(libraryId);
};

const addBookToLibrary = async (libraryId, bookId) => {
  try {
    // Verificar si el libro existe
    const existingBook = await getBookById(bookId);

    if (!existingBook) {
      // El libro no existe, puedes manejarlo según tus necesidades
      return { success: false, error: 'El libro no existe.' };
    }

    // El libro existe, ahora agregamos el libro a la biblioteca
    const result = await addBookToLibrary(libraryId, bookId);

    if (result.success) {
      return { success: true };
    } else {
      // Manejar errores específicos de addBookToLibrary si es necesario
      return { success: false, error: 'Error al agregar el libro a la biblioteca.' };
    }
  } catch (error) {
    // Manejar cualquier error de forma apropiada
    console.error('Error al verificar el libro o agregarlo a la biblioteca:', error);
    return { success: false, error: 'Error al verificar el libro o agregarlo a la biblioteca.' };
  }
};

export const libraryService = {
  createLibrary,
  getLibraryById,
  addBookToLibrary,
};