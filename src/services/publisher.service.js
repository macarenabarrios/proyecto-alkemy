
import { publisherRepository } from '../repositories/publisher.repository.js';

const deletePublisher = async (id) => {
	let publisher = await publisherRepository.getById(id);
	if (!publisher) {
		throw new Error(`Publisher with id ${id} not found`)
	} else {
		publisher = await publisherRepository.deletePublisher(id);
	}
	return publisher;
};

const getAll = async () => {
	const publishers = await publisherRepository.getAll();
	return publishers;
};

const getById = async (id) => {
	const publisher = await publisherRepository.getById(id);
	if (!publisher) {
		throw new Error(`Publisher with id ${id} not found`)
	}
	return publisher;
};

const getDeletedPublishers = async () => {
	const publishers = await publisherRepository.getDeletedPublishers();
	return publishers;
};

const newPublisher = async (publisher) => {
	await publisherRepository.newPublisher(publisher);
};

const update = async (id, publisher) => {
	let updatedPublisher = await publisherRepository.getById(id);
	if (!updatedPublisher) {
		throw new Error(`Publisher with id ${id} not found`);
	} else {
		updatedPublisher = await publisherRepository.update(id, publisher);
	}
	return updatedPublisher;
};

export const publisherService = {
	deletePublisher,
	getAll,
	getById,
	getDeletedPublishers,
	newPublisher,
	update
};