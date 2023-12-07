import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import 'express-async-errors';
import { router } from '@/routes';

const app = express();
app.disable('x-powered-by');

const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use(router);

// Rota para a raiz
app.get('/', (req, res) => {
  const nome = process.env.NOME ?? 'vsftmj';
  const password = process.env.PASSWORD ?? 'password';
  res.send(`Hello ${nome}! Your password is ${password}`);
});

app.listen(port, () => {
  console.log(`Running on http://localhost:${port} 🚀`);
});

export { app };
