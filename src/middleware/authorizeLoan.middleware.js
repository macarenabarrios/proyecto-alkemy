import jwt from 'jsonwebtoken';
import { loanRepository } from '../repositories/loan.repository.js';

const authorizeLoan = async (req, res, next) => {
  try {
    // Obtén el token del encabezado de autorización
    let token = req.headers.authorization;
    token = token.replace("Bearer ", "");

    // Verifica el token y extrae la información del usuario
    const decodedToken = jwt.verify(token,process.env.SECRET_KEY);
    const userId = decodedToken.id;

    // Obtén el ID del préstamo desde los parámetros de la ruta
    const loanId = req.params.id;

    // Verifica si el préstamo pertenece al usuario autenticado
    const loan = await loanRepository.findById(loanId);
  
    if (!loan || loan.user.id !== userId) {
      return res.status(403).json({ error: 'No tienes permisos para acceder a este préstamo.' });
    }

    next();
  } catch (error) {
    throw error
  }
};

export default authorizeLoan;
