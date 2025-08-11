import { Router } from 'express';
import { getTodosDados } from '../controles/controlador.js';

const rota = Router();

/*Rota para retornar dados*/
rota.get('/', getTodosDados);

export default rota;
