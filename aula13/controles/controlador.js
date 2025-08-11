/*chama a função que retorna os dados*/

import exemploDados from '../dados/exemploDados.js';

export const getTodosDados = (requisicao, resposta) => {
    console.log("Função chamada com sucesso!");
    resposta.json(exemploDados);
};
