import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './src/routes/index.route.js'
import seed from './src/db/seed.db.js';
import errorHandler from './src/middleware/error.middleware.js';



dotenv.config();

//Instancia de Sequelize
import { sequelize } from './src/db/index.db.js';

//Modelos de sequelize -> Importarte importarlos para generar las tablas
import './src/db/models/user.model.js';
import './src/db/models/book.model.js';
import './src/db/models/role.model.js';
import './src/db/models/loan.model.js';
import './src/db/models/publisher.model.js';
import './src/db/models/review.model.js';
import './src/db/associations.db.js';

//Conexion y generacion de la base de datos
const main = async () => {
  try {
    await sequelize.sync({alter:true});
    seed()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', indexRouter);
app.use((req, res, next) => {
  const err = new Error('Path not Found');
  err.status = 404;
  next(err);
});
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});






export default app;