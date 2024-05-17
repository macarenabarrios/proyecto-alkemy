import { libraryService } from '../services/library.service.js';

const createLibrary = async (req, res, next) => {
  const { userId } = req.body;
  try {
    const library = await libraryService.createLibrary(userId);
    res.status(201).json({ success: true, library });
  } catch (error) {
    next(error);
  }
};

const getLibraryById = async (req, res, next) => {
  const { libraryId } = req.params;
  try {
    const library = await libraryService.getLibraryById(libraryId);
    res.status(200).json({ success: true, library });
  } catch (error) {
    next(error);
  }
};

const addBookToLibrary = async (req, res, next) => {
  const { libraryId, bookId } = req.params;
  try {
    await libraryService.addBookToLibrary(libraryId, bookId);
    res.status(200).json({ success: true, message: 'Book added to library successfully' });
  } catch (error) {
    next(error);
  }
};


export const libraryController = {
  createLibrary,
  getLibraryById,
  addBookToLibrary,
};