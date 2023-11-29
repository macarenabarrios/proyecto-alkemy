import { bookService } from '../services/book.service.js'

const deleteBook = (req, res, next) => {
	bookService.deleteBook(req.params.id)
		.then((response) => {
			res.status(204).json(response)
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ error: err.message }); // Cambiado a 404 Not Found
			next(err);
		});
};

const getAll = (req, res, next) => {
	bookService.getAll()
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			next(err)
		});
};

const getById = (req, res, next) => {
	bookService.getById(req.params.id)
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
			next(err)
		});
};

const newBook = (req, res, next) => {
	bookService.newBook(req.body)
		.then((createdBook) => {
			res.status(201).json({ message: 'Book created successfully', book: createdBook });
		})
		.catch((err) => {
			next(err);
		});
};

const update = (req, res, next) => {
	bookService.update(req.params.id, req.body)
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((err) => {
			next(err);
		});
};

export const bookController = {
	deleteBook,
	getAll,
	getById,
	newBook,
	update
};