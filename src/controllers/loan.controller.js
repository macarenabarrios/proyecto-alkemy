import { loanService } from "../services/loan.service.js"

const getAll = (req, res, next) => {
    loanService.getAll().then((response) =>
        res.status(200).json(response)
    ).catch((err) => {
        next(err)
    });

}

const getById = (req, res, next) => {
    loanService.getById(req.params.id).then((response) =>
        res.status(200).json(response)
    ).catch((err) => {
        next(err)
    });
}

const save = (req, res, next) => {
    loanService.create(req.body)
        .then((response) => {
            res.status(201).json(response)
        })
        .catch((err) => {
            next(err)
        })
}

const update = (req, res, next) => {

}


const deleteLoan = (req, res, next) => {

}

export { getAll, getById, save, update, deleteLoan }
