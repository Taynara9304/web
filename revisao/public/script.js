const API_URL = "http://localhost:3000/";

const form = document.getElementById("form");
const listaAlunos = document.getElementById("listaAlunos");

let editandoAluno = null;

async function carregarAlunos() {
    const res = await fetch(API_URL);
    const alunos = await res.json();

    listaAlunos.innerHTML = "";

    alunos.forEach(aluno => {
        const div = document.createElement("div");
        div.classList.add("aluno");
        div.innerHTML = `
            <div>
                <p>${aluno.nome} <br> ${aluno.cpf} <br> ${aluno.telefone} <br> ${aluno.email} <br> ${aluno.matricula}</p>
            </div>
            <div>
                <button onclick="editarAluno(${aluno.id})">Editar</button>
                <button onclick="excluirAluno(${aluno.id})">Excluir</button>
            </div>
        `;
        listaAlunos.appendChild(div);
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const aluno = {
        nome: document.getElementById("nome").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        matricula: document.getElementById("matricula").value,
    };

    if (editandoAluno) {
        await fetch(`${API_URL}/${editandoAluno}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
        });

        editandoAluno = null;
    } else {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(aluno),
        });
    }

    form.reset();
    carregarAlunos();
})

async function excluirAluno(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    carregarAlunos();
}

async function editarAluno(id) {
    const res = await fetch(`${API_URL}`);
    const alunos = await res.json();
    const aluno = alunos.find(a => a.id === id);

    if(!aluno) return;

    document.getElementById("nome").value = aluno.nome;
    document.getElementById("cpf").value = aluno.cpf;
    document.getElementById("telefone").value = aluno.telefone;
    document.getElementById("email").value = aluno.email;
    document.getElementById("matricula").value = aluno.matricula;

    editandoAluno = id;

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.textContent = "Atualizar Aluno";
}

carregarAlunos();