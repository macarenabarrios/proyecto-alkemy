import { authorService } from "../services/author.service.js";


const findById = (req, res) => {
  const id = req.params.id;

  authorService
    .getById(id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(error.status || 500).json({ error: error.message });
    });
};

const createAuthor = async (req, res) => {
  
  const authorData = req.body;

  try {
    const newAuthor = await authorService.createAuthor(authorData);
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(error.status || 500).json({ error: error.message });
  }
};

export const authorController = {
  findById,
  createAuthor
};
