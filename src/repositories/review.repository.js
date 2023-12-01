import Review from '../db/models/review.model.js';
import User from '../db/models/user.model.js';
import Book from '../db/models/book.model.js';
import { Op } from 'sequelize';

const deleteReview = async (id) => {
	await Review.destroy({
		where: { id }
	});
};

const getAllReviews = async (page = 0, size = 10) => {
	page = parseInt(page);
	size = parseInt(size);
	const offset = page === 0 ? page : page * size;
	const limit = parseInt(size);
	console.log("OFFSET TYPE:", typeof (offset));
	console.log("LIMIT TYPE:", typeof (limit));
	const reviews = await Review.findAll({
		offset: offset,
		limit: limit,
		order: [['id', 'ASC']],
	});
	return reviews;
};

const getById = async (id) => {
	const review = await Review.findByPk(id);
	return review;
};

const getByBook = async (bookId) => {
	try {
		const reviews = await Review.findAll({
			where: {
				bookId: bookId,
			},
		});
		return reviews;
	} catch (error) {
		throw new Error(`Error getting reviews by bookId: ${error.message}`);
	}
};

const getByUser = async (userId) => {
	try {
		const reviews = await Review.findAll({
			where: {
				userId: userId,
			},
		})
		return reviews;
	} catch (error) {
		throw new Error(`Error getting reviews by userId: ${error.message}`);
	}
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
	try {
		const [book, user] = await Promise.all([
			Book.findByPk(review.bookId, { where: { isActive: true } }),
			User.findByPk(review.userId, { where: { isActive: true } })
		]);
		if (!book) {
			throw new Error(`Book with id ${review.bookId} not found`);
		}
		if (!user) {
			throw new Error(`User with id ${review.userId} not found`);
		}
		review.bookId = book.id;
		review.userId = user.id;
		const createdReview = await Review.create(review);
		return createdReview;
	} catch (error) {
		throw new Error(`Error creating review: ${error.message}`);
	}
};

const update = async (id, review) => {
	const [updatedRowCount] = await Review.update(review, {
		where: { id }
	});
	if (updatedRowCount === 0) {
		return null;
	}
	const updatedReview = await Review.findByPk(id);
	return updatedReview;
};

export const reviewRepository = {
	deleteReview,
	getAllReviews,
	getById,
	getByBook,
	getByUser,
	getDeletedReviews,
	newReview,
	update
};