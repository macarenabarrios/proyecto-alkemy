import { reviewRepository } from '../repositories/review.repository.js';

const deleteReview = async (id) => {
	let review = await reviewRepository.getById(id);
	if (!review) {
		throw new Error(`Review with id ${id} not found`)
	}
	review = await reviewRepository.deleteReview(id);
	return review;
};

const getAllReviews = async (page, size) => {
	const reviews = await reviewRepository.getAllReviews(page, size);
	return reviews;
};

const getById = async (id) => {
	let review = await reviewRepository.getById(id);
	if (!review) {
		throw new Error(`Review with id ${id} not found`)
	}
	return review;
};

const getByBook = async (bookId) => {
	try {
		const reviews = await reviewRepository.getByBook(bookId);
		if (!reviews || reviews.length === 0) {
			throw new Error(`No reviews found for book with ID ${bookId}`);
		}
		return reviews;
	} catch (error) {
		throw new Error(`Error getting reviews: ${error.message}`);
	}
};

const getByUser = async (userId) => {
	let reviews = await reviewRepository.getByUser(userId);
	try {
		if (!reviews || reviews.length === 0) {
			throw new Error(`No reviews found for user with ID ${userId}`);
		}
		return reviews;
	} catch (error) {
		throw new Error(`Error getting reviews: ${error.message}`);
	}
};

const getDeletedReviews = async () => {
	const reviews = await reviewRepository.getDeletedReviews();
	return reviews;
};

const newReview = async (review) => {
	try {
		const createdReview = await reviewRepository.newReview(review);
		return createdReview;
	} catch (error) {
		throw new Error(`Error creating review: ${error.message}`);
	}
};

const update = async (id, review) => {
	let updatedReview = await reviewRepository.getById(id);
	if (!updatedReview) {
		throw new Error(`Review with id ${id} not found`)
	}
	updatedReview = await reviewRepository.update(id, review);
	return updatedReview;
};

export const reviewService = {
	deleteReview,
	getAllReviews,
	getById,
	getByBook,
	getByUser,
	getDeletedReviews,
	newReview,
	update
};