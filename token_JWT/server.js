import express from 'express';
import authRotes from './routes/auth.routes.js';

const app = express();
app.use(express.json());

app.use('/auth', authRotes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
