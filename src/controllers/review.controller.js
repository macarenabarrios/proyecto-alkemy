import { reviewService } from '../services/review.service.js';

const deleteReview = (req, res, next) => {
	reviewService.deleteReview(req.params.id)
		.then((response) => {
			res.status(204).json(response)
		})
		.catch((err) => {
			console.log(err);
			res.status(404).json({ error: err.message });
			next(err);
		});
};

const getAllReviews = (req, res, next) => {
	reviewService.getAllReviews(req.query["page"], req.query["size"])
		.then((response) => {
			res.status(200).json(response);
		})
		.catch((err) => {
			console.log(err);
			next(err);
		});
};

const getById = (req, res, next) => {
	reviewService.getById(req.params.id)
		.then((response) => {
			res.status(200).json(response)
		})
		.catch((err) => {
			res.status(500).json({ error: err.message });
			next(err)
		});
};

const getByBook = async (req, res, next) => {
	try {
		const response = await reviewService.getByBook(req.params.id);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
};

const getByUser = async (req, res, next) => {
	try {
		const response = await reviewService.getByUser(req.params.id);
		res.status(200).json(response);
	} catch (error) {
		next(error);
	}
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
			res.status(201).json({ message: 'Review created successfully', review: response })
		})
		.catch((err) => {
			next(err);
		});
};

const update = (req, res, next) => {
	reviewService.update(req.params.id, req.body)
		.then((response) => {
			res.status(201).json({ message: 'Review created successfully', review: response });
		})
		.catch((err) => {
			next(err);
		});
};

export const reviewController = {
	deleteReview,
	getAllReviews,
	getById,
	getByBook,
	getByUser,
	getDeletedReviews,
	newReview,
	update
};