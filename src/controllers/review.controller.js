import { reviewService } from '../services/review.service.js';

const deleteReview = (req, res, next) => {
	reviewService.deleteReview(req.params.id)
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
	reviewService.getAll()
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			next(err)
		});
};

const getById = (req, res, next) => {
	reviewService.getById(req.params.id)
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
			next(err)
		});
};

const getByBook = (req, res, next) => {
	reviewService.getByBook(req.params.bookId)
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
			next(err)
		});
};

const getByUser = (req, res, next) => {
	reviewService.getByUser(req.params.userId)
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ error: err.message });
			next(err)
		});
};

const getDeletedReviews = (req, res, next) => {
	reviewService.getDeletedReviews()
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			console.log(err);
			next(err)
		});
};

const newReview = (req, res, next) => {
	reviewService.newReview(req.body)
		.then((response) => {
			res.status(201).json(response)
		})
		.catch((err) => {
			next(err);
		});
};

const update = (req, res, next) => {
	reviewService.update(req.params.id, req.body)
		.then((response) => {
			res.status(201).json(response);
		})
		.catch((err) => {
			next(err);
		});
};

export const reviewController = {
	deleteReview,
	getAll,
	getById,
	getByBook,
	getByUser,
	getDeletedReviews,
	newReview,
	update
};