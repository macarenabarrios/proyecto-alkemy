import Library from '../db/models/library.model.js';
import Book from '../db/models/book.model.js';


const createLibrary = async (userId) => {
  return Library.create({ userId });
};

const getLibraryById = async (libraryId) => {
  const response = await Library.findByPk(libraryId, {
    include: [
      {
        model: Book,
        as: 'libraryBooks',
        attributes: ['title', 'description', 'isbn', 'edition']
      }
    ],
  });
  return response;
};

const addBookToLibrary = async (libraryId, bookId) => {
  const library = await Library.findByPk(libraryId);
  return library.addBook(bookId);
};


export const libraryRepository = {
  createLibrary,
  getLibraryById,
  addBookToLibrary,
};