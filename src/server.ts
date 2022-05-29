import express, { json } from 'express';
import cors from 'cors';
import { routes } from './routes';
import dotenv from 'dotenv';
import { createModels } from './functions/database/createModels';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(json());
app.use(cors());

routes.forEach((route) => app.use(route));

app.listen(PORT, async () => {
  await createModels();
  console.log(`API is running at ${PORT}!`);
});
