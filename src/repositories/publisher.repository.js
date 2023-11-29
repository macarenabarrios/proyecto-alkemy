import Publisher from '../db/models/publisher.model.js';
import { Op } from 'sequelize';

const deletePublisher = async (id) => {
  await Publisher.destroy({
    where: { id: id }
  });
};

const getAll = async () => {
  const publishers = await Publisher.findAll({
    where: { isActive: true }
  });
  return publishers;
};

const getById = async (id) => {
  const publisher = await Publisher.findByPk(id,
    {
      where: { isActive: true }
    });
  return publisher;
};

const getDeletedPublishers = async () => {
  const deletedPublishers = await Publisher.findAll({
    where: {
      deletedAt: {
        [Op.ne]: null, // Filtrar aquellos registros donde deletedAt no es nulo
      },
    },
    paranoid: false, // Desactiva el modo paranoid para incluir registros eliminados
  });
  return deletedPublishers;
};

const newPublisher = async (publisher) => {
  await Publisher.create(publisher);
};

const update = async (id, publisher) => {
  const [updatedRowCount] = await Publisher.update(publisher, {
    where: { id: id }
  });
  if (updatedRowCount === 0) {
    return null; // Devuelve null si no se actualizó ninguna fila
  }
  const updatedPublisher = await Publisher.findByPk(id);
  return updatedPublisher;
};

export const publisherRepository = {
  deletePublisher,
  getAll,
  getById,
  getDeletedPublishers,
  newPublisher,
  update
};