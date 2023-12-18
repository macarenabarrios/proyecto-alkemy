import express from 'express';
import compression from 'compression';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './src/routes/index.route.js'
import seed from './src/db/seed.db.js';
import errorHandler from './src/middleware/error.middleware.js';
import { dueReminder } from './src/utils/cron.util.js';
import { extractAuthenticated } from './src/middleware/extract-authenticated.middleware.js';
import { configureSocketIO } from './src/notifications/notification.service.js';
import { dbBackup
 } from './src/scheduled/backup.scheduled.js';
dotenv.config();

// Instancia de Sequelize
import { sequelize } from './src/db/index.db.js';

// Modelos de sequelize -> Importarte importarlos para generar las tablas
import './src/db/models/user.model.js';
import './src/db/models/book.model.js';
import './src/db/models/role.model.js';
import './src/db/models/loan.model.js';
import './src/db/models/publisher.model.js';
import './src/db/models/review.model.js';
import './src/db/associations.db.js';
import './src/db/models/event.model.js'
import './src/db/models/library.model.js'

//Documentacion
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
const swaggerDocs = YAML.load("./src/doc/swagger.doc.yaml");


// Conexion y generacion de la base de datos
const main = async () => {
  try {
    await sequelize.sync({alter:false});
    seed()
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

main();

const app = express();

// Middleware de compresión
app.use(compression({
  filter: (req, res) => {
    // Detección del tipo de contenido compatible
    return /json|text|html|xml|rss|css|javascript|svg/.test(res.getHeader('Content-Type'));
  },
}));

// Configuración Socket.IO
import http from 'http';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const server = http.createServer(app);
configureSocketIO(server);

// Ruta de notificaciones
import path from 'path';
import { availableParallelism } from 'os';
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'src', 'public', 'index.html');
  console.log("Ruta completa:", filePath);
  res.sendFile(filePath);
});

const PORT = process.env.PORT || 8080;
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', extractAuthenticated, indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs, {explorer: true}));
server.listen(PORT, () => {
  console.log(`app listening on port ${PORT}!`);
});

// Middleware para manejar errores 404
app.use((req, res, next) => {
  const err = new Error('Path not Found');
  err.status = 404;
  next(err);
});

app.use(errorHandler);
dueReminder()
dbBackup();

export default app;