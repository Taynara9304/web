import express from 'express';
import dadosRota from './rotas/rotas.js';
import { fileURLToPath } from 'url';
import path from 'path';

const filename = fileURLToPath(import.meta.url);
const dirname = Path2D.dirname(filename);

const app = express();
const PORT = process.env.PORT || 1234;

/*Middleware para interpretar o json */
app.use(express.json());

/*rota da api*/
app.use('/', dadosRota);

app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log('Servidor rodando na porta 1234');
});
