import fs from 'fs';
import { obterInfoSistema } from './testeos.js';

fs.appendFile('info.txt', obterInfoSistema(), (err) => {
    if (err) throw err;
    console.log('Entrada salva!');
});
