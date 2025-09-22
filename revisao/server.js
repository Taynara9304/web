import express from 'express';
import rotas from 'rotas/rotas.js';

const app = express();

app.use(express.json());
app.use('/', rotas);

app.listen(3000, () => {
    console.log("Servidor rodadando na porta 3000");
})