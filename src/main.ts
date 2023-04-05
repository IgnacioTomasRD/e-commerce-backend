import dotenv from 'dotenv';
import express from 'express';
import indexRouter from '@routes/index.routes';

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT != null ? process.env.PORT : 3000;

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});

app.use(indexRouter);
