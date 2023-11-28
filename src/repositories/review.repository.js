import Review from '../db/models/review.model.js';
import { Op } from 'sequelize';

const deleteReview = async (id) => {
	await Review.destroy({
		where: { id }
	});
};

const getAll = async () => {
	const reviews = await Review.findAll({
		where: { isActive: true }
	});
	return reviews;
};

const getById = async (id) => {
	const review = await Review.findByPk(id, {
		where: { isActive: true }
	});
	return review;
};

const getByBook = async (bookId) => {
	const reviews = await Review.findAll({
		where: {
			bookId,
			isActive: true
		},
	})
	return reviews;
};

const getByUser = async (userId) => {
	const reviews = await Review.findAll({
		where: {
			userId,
			isActive: true
		},
	})
	return reviews;
};

const getDeletedReviews = async () => {
	const deletedReviews = await Review.findAll({
		where: {
			deletedAt: {
				[Op.ne]: null
			},
		},
		paranoid: false,
	});
	return deletedReviews;
};

const newReview = async (review) => {
	await Review.create(review);
};

const update = async (id, review) => {
	const [updatedRowCount] = await Review.update(review, {
		where: { id }
	});
	if (updatedRowCount === 0) {
		return null; // Devuelve null si no se actualizó ninguna fila
	}
	const updatedReview = await Review.findByPk(id);
	return updatedReview;
};

export const reviewRepository = {
	deleteReview,
	getAll,
	getById,
	getByBook,
	getByUser,
	getDeletedReviews,
	newReview,
	update
};