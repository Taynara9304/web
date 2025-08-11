import express from 'express';
import dadosRota from './rotas/rotas.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 1234;
app.use(cors());

/*Middleware para interpretar o json */
app.use(express.json());

/*rota da api*/
app.use('/', dadosRota);

app.listen(PORT, () => {
    console.log('Servidor rodando na porta 1234');
});
