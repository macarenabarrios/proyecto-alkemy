import { reviewRepository } from '../repositories/review.repository.js';
//import { } from '../repositories/book.repository.js';
import { userRepository } from '../repositories/user.repository.js';

const deleteReview = async (id) => {
	let review = await reviewRepository.getById(id);
	if (!review) {
		throw new Error(`Review with id ${id} not found`)
	}
	review = await reviewRepository.deleteReview(id);
	return review;
};

const getAll = async () => {
	const reviews = await reviewRepository.getAll();
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
	/* 	const book = await bookRepository.findById(bookId);
		if (!book) {
			throw new Error(`Book with id ${id} not found`)
		}
		let reviews = await reviewRepository.getByBook(bookId);
		return reviews; */
};

const getByUser = async (userId) => {
	const user = await userRepository.findById(userId);
	if (!user) {
		throw new Error(`User with id ${id} not found`)
	}
	let reviews = await reviewRepository.getByUser(userId);
	return reviews;
};

const getDeletedReviews = async () => {
	const reviews = await reviewRepository.getDeletedReviews();
	return reviews;
};

const newReview = async (review) => {
	/* 	const book = await bookRepository.findById(review.book_id);
		if (!book) {
			throw new Error(`Book with id ${review.book_id} not found`)
		} */
	const user = await userRepository.findById(review.user_id);
	if (!user) {
		throw new Error(`User with id ${review.user_id} not found`)
	}
	await reviewRepository.newReview(review);
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
	getAll,
	getById,
	getByBook,
	getByUser,
	getDeletedReviews,
	newReview,
	update
};