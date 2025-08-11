function criarCard(nomePessoa, idadePessoa, profissaoPessoa) {
    const container = document.createElement('div');
    const nome = document.createElement('h1');
    const idade = document.createElement('p');
    const profissao = document.createElement('p');

    nome.textContent = nomePessoa;
    idade.textContent = idadePessoa;
    profissao.textContent = profissaoPessoa;

    container.classList.add("container-card");

    container.appendChild(nome);
    container.appendChild(idade);
    container.appendChild(profissao);

    return container;
};

async function buscarPessoas() {
    const resposta = await fetch("http://localhost:1234/");
    const pessoas = await resposta.json();

    pessoas.forEach(pessoa => {
        const card = criarCard(pessoa.nome, pessoa.idade, pessoa.profissao);
        document.getElementById('card').appendChild(card);
    });
};

document.addEventListener('DOMContentLoaded', buscarPessoas);