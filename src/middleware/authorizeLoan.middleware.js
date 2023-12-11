import { loanService } from '../services/loan.service.js';

const authorizeLoan = async (req, res, next) => {
  try {
 
    const userId = req.userId

    // Obtén el ID del préstamo desde los parámetros de la ruta
    const loanId = req.params.id;

    // Verifica si el préstamo pertenece al usuario autenticado
    const loan = await loanService.getById(loanId);
  
    if (!loan || loan.user.id !== userId) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a este préstamo.' });
    }

    next();
  } catch (error) {
    throw error
  }
};

export default authorizeLoan;
