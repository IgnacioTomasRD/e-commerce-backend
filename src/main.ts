import dotenv from 'dotenv';
import express from 'express';
import indexRouter from '@routes/index.routes';
import mongoose from 'mongoose';
import { getMongoDURL, getPORT } from 'utils';

dotenv.config();
const app = express();

app.use(express.json());
app.use(indexRouter);


const init = async function(): Promise<void> {
  const URL = getMongoDURL();
  const PORT = getPORT();

  try {
    await mongoose.connect(URL);
    app.listen(PORT, () => {
      console.log(`Servidor levantado en el puerto ${PORT}`);
    });
  } catch (err) {
    console.error(err)
  }
}

void init();
