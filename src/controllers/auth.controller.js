import { logAction, logError } from '../logger/logger.js';
import { authService } from '../services/auth.service.js';


const login = (req, res, next) => {
  const { email, password } = req.body;
  authService.authenticate(email, password)
    .then((response) =>{
      res.status(200).json({ accessToken: response })
      logAction(
				req,
				`Usuario ${req.body.email} inició sesión`
			)}
    ).catch((err) => {
      next(err)
      logError(req,
        err.message
        +': '+
        req.body.email
      )
    });
};

const register = (req, res, next) => {
  const user = req.body;
  console.log(req);
  authService.register(user)
    .then((response) =>{
      res.status(200).json({ accessToken: response })
      logAction(
        req,
        `Usuario ${req.body.email} se registró`
      );
    }
    ).catch((err) => {
      next(err)
      logError(req,
        err.message
        +': '+
        req.body.email
      )
    });
};

export {
  login,
  register
};