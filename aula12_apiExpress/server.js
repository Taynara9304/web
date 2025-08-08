import express from 'express';
import rotaGet from './router/router';
import usuarios from './data/sample.data';

const app = express();

app.use('./data/sample.data', rotaGet);

app.listen(1234, () => {
    console.log("Servidor rodando na porta 1234");
});