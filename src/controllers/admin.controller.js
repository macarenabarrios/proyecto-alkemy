import { logAction, logError } from '../logger/logger.js';
import { backupService } from '../services/backup.service.js';

const backup = (req, res, next) => {
  backupService.executeBackup()
    .then((response) =>{
      res.status(200).json(response)
      logAction(
        req,
        `Backup realizado`
      );
    }
    ).catch((err) => {
      next(err)
      logError(req,
        err.message
      )
    });
};

export {
  backup
};