import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import indexRouter from './src/routes/index.route.js'
import { sequelize } from "./src/db/index-db.js";
import seed from "./src/db/seed.db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', indexRouter);

console.log(process.env.DB_NAME);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_HOST);


try {
  await sequelize.sync();
  seed();
} catch (error) {
console.error("Unable to connect to the database:", error);
}


export default app;