
import { response } from 'express';
import { userService } from '../services/user.service.js';


const getAll = (req, res, next) => {
  userService.getAll(req.query['page'], req.query['size'],req.query['firstname'],req.query['lastname'],req.query['email']).then((response) =>
    res.status(200).json(response)
  ).catch((err) => {
    next(err)
  });
};

const getById = (req, res, next) => {
  userService.getById(req.params.id).then((response) =>
    res.status(200).json(response)
  ).catch((err) => {
    next(err)
  });
};

const save = (req, res, next) => {
  userService.create(req.body)
    .then(() => {
      res.status(201).json()
    })
    .catch((err) => {
      next(err)
    })
};

const update = (req, res, next) => {
  userService.update(req.userId, req.body)
    .then(() => {
      res.status(200).json()
    })
    .catch((err) => {
      next(err)
    })
};

const deleteUser = (req, res, next) => {
  userService.deleteUser(req.params.id)
    .then(() => {
      res.status(200).json()
    })
    .catch((err) => {
      next(err)
    })
};

const getRecommendations = (req,res,next)=>{
  userService.getRecommendations(req.userId)
  .then((response)=>{
    res.status(200).json(response)
  })
  .catch(
    (err)=>{
      next(err)
    }
  );
}

export {
  getAll,
  getById,
  save,
  update,
  deleteUser,
  getRecommendations
};
