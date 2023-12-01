import { loanService } from "../services/loan.service.js"

const getAll = async (req, res, next) => {
    try {
        const response = await loanService.getAll();

        res.status(200).json(
            {
                success: true,
                message: 'Se recuperaron los prestamos satisfactoriamente.',
                data: response,
                count: response?.length
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error al recuperar todos los prestamos.',
                error: error.message
            }
        );

        next(error);
    }

}

const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await loanService.getById(id);

        res.status(200).json(
            {
                success: true,
                message: `Se recupero el prestamo con id #${id} satisfactoriamente.`,
                data: response,
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: `Error al recuperar el prestamo con id #${id}.`,
                error: error.message
            }
        );

        next(error)
    }

}

const save = async (req, res, next) => {
    const newLoan = req.body;

    try {
        const response = await loanService.create(newLoan);
        console.log(response)
        if (!response?.error) {
            res.status(200).json(
                {
                    success: true,
                    message: 'Se creo el prestamo satisfactoriamente.',
                    data: response.data,
                    availableLoans: response?.availableLoans
                }
            )
        }
        else {
            res.status(500).json(
                {
                    success: false,
                    message: response.error,
                }
            )
        }

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'No se creo el prestamo satisfactoriamente.',
                error: error.message
            }
        );

        next(error)
    }

    // loanService.create(req.body)
    //     .then((response) => {
    //         res.status(201).json(response)
    //     })
    //     .catch((err) => {
    //         next(err)
    //     })
}

const update = (req, res, next) => {
    loanService.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}


const deleteLoan = (req, res, next) => {
    loanService.deleteLoan(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}

const deleteAllLoans = (req, res, next) => {
    loanService.deleteAllLoans(req.params.idUser)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}


export { getAll, getById, save, update, deleteLoan, deleteAllLoans }
