import { authorService } from "../services/author.service.js";

const findById = (req, res) => {
  const id = req.params.id;

  authorService
    .getById(id)
    .then((result) => {
			if (!result) {
        return res.status(404).json({ error: 'Autor no encontrado' });
      }
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.status || 500).json({ error: error.message });
    });
};

export const authorController = {
  findById,
};
