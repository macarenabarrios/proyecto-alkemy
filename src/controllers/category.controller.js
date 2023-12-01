import { categoryService } from "../services/category.service.js"

const getAllBookCategory = async (req, res, next) => {
    try {
        const response = await categoryService.getAll();

        res.status(200).json(
            {
                success: true,
                message: 'Se recuperaron todas las categorias asociadas con libros satisfactoriamente.',
                data: response,
                count: response?.length
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error al recuperar todas las categorias asociadas con libros.',
                error: error.message
            }
        );

        next(error);
    }

}

const getAllCategories = async (req, res, next) => {
    try {
        const response = await categoryService.getAllCategories();

        res.status(200).json(
            {
                success: true,
                message: 'Se recuperaron todas las categorias satisfactoriamente.',
                data: response,
                count: response?.length
            }
        );

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: 'Error al recuperar todas las categorias.',
                error: error.message
            }
        );

        next(error);
    }

}

const getById = async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await categoryService.getById(id);

        res.status(200).json(
            {
                success: true,
                message: `Se recupero la categoria con id #${id} satisfactoriamente.`,
                data: response,
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: `Error al recuperar la categoria con id #${id}.`,
                error: error.message
            }
        );

        next(error)
    }

}

const getByIdBookCategory = async (req, res, next) => {
    const id = req.params.id;

    try {
        const response = await categoryService.getByIdBookCategory(id);

        res.status(200).json(
            {
                success: true,
                message: `Se recupero la categoria con id #${id} satisfactoriamente.`,
                data: response,
            }
        )

    } catch (error) {
        res.status(500).json(
            {
                success: false,
                message: `Error al recuperar la categoria con id #${id}.`,
                error: error.message
            }
        );

        next(error)
    }

}

const save = async (req, res, next) => {
    const newCategory = req.body;

    try {
        const response = await categoryService.create(newCategory);

        if (!response?.error) {
            res.status(200).json(
                {
                    success: true,
                    message: 'Se creo la categoria satisfactoriamente.',
                    data: response.data,
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
}

const saveBookCategory = async (req, res, next) => {
    const newBookCategory = req.body;

    try {
        const response = await categoryService.createBookCategory(newBookCategory);

        if (!response?.error) {
            res.status(200).json(
                {
                    success: true,
                    message: 'Se creo la asociación entre categoria y libro satisfactoriamente.',
                    data: response.data,
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
}

const update = (req, res, next) => {
    categoryService.update(req.params.id, req.body)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}

const updateBookCategory = (req, res, next) => {
    categoryService.updateBookCategory(req.params.id, req.body)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}

const deleteCategory = (req, res, next) => {
    categoryService.deleteCategory(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}

const deleteBookCategory = (req, res, next) => {
    categoryService.deleteBookCategory(req.params.id)
        .then(() => {
            res.status(200).json()
        })
        .catch((err) => {
            next(err)
        })
}

export {
    getAllBookCategory,
    getAllCategories,
    getById,
    getByIdBookCategory,
    save,
    saveBookCategory,
    update,
    updateBookCategory,
    deleteCategory,
    deleteBookCategory
}