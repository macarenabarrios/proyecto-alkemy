import { publisherService } from '../services/publisher.service.js';

const deletePublisher = (req, res, next) => {
  publisherService.deletePublisher(req.params.id)
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
  publisherService.getAll()
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log(err);
      next(err)
    });
};

const getById = (req, res, next) => {
  publisherService.getById(req.params.id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err.message });
      next(err)
    });
};

const getDeletedPublishers = (req, res, next) => {
  publisherService.getDeletedPublishers()
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      console.log(err);
      next(err)
    });
};

const newPublisher = (req, res, next) => {
  publisherService.newPublisher(req.body)
    .then((response) => {
      res.status(201).json(response)
    })
    .catch((err) => {
      next(err);
    });
};

const update = (req, res, next) => {
  publisherService.update(req.params.id, req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    });
};

export const publisherController = {
  deletePublisher,
  getAll,
  getById,
  getDeletedPublishers,
  newPublisher,
  update
};