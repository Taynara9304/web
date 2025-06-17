/*document.getElementById("add").addEventListener("click", function (event) {
event.preventDefault();

    const nomeTarefa = document.getElementById("addTarefa");
    const valor = nomeTarefa.value.trim();

    const texto = document.createElement("p");
    texto.className = "tarefa-item";

    texto.innerHTML = `<span>${valor}</span>
    <button id="remover" class="botao">Remover</button>`;

    document.getElementById("listaTarefas").appendChild(texto);
    nomeTarefa.value = "";

    texto.querySelector(".remover").addEventListener("click", () => {
        texto.remove();
    });

})*/

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
let filtroAtual = "todas";
let arrastandoIndex = null;

document.addEventListener("DOMContentLoaded", () => {
    renderizarTarefas();
    atualizarBotaoAtivo();

    document.querySelector(".addTarefa").addEventListener("submit", function(event) {
        event.preventDefault();
        const input = document.getElementById("addTarefa");
        const valor = input.value.trim();

        if (valor) {
            tarefas.push({ texto: valor, concluida: false });
            salvarTarefas();
            renderizarTarefas();
            input.value = "";
        }
    });

    document.querySelectorAll(".botaoFiltro").forEach(botao => {
        botao.addEventListener("click", () => {
            filtroAtual = botao.dataset.filtro;
            atualizarBotaoAtivo();
            renderizarTarefas();
        });
    });

    document.getElementById("limpar").addEventListener("click", () => {
        if (confirm("Tem certeza que deseja limpar todas as tarefas?")) {
            tarefas = [];
            salvarTarefas();
            renderizarTarefas();
        }
    });
});

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        if (filtroAtual === "pendentes" && tarefa.concluida) return;
        if (filtroAtual === "concluidas" && !tarefa.concluida) return;

        const item = document.createElement("li");
        item.className = "tarefa-item";
        item.setAttribute("draggable", true);
        item.dataset.index = index;

        item.addEventListener("dragstart", dragStart);
        item.addEventListener("dragover", dragOver);
        item.addEventListener("drop", drop);
        item.addEventListener("dragend", dragEnd);

        const nome = document.createElement("span");
        nome.className = "nomeTarefa";
        nome.textContent = tarefa.texto;
        if (tarefa.concluida) nome.classList.add("concluida");

        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = tarefa.concluida ? "Desfazer" : "Concluir";
        btnConcluir.className = "botao";
        btnConcluir.addEventListener("click", () => {
            tarefas[index].concluida = !tarefas[index].concluida;
            salvarTarefas();
            renderizarTarefas();
        });

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.className = "botao";
        btnRemover.addEventListener("click", () => {
            tarefas.splice(index, 1);
            salvarTarefas();
            renderizarTarefas();
        });

        item.appendChild(nome);
        item.appendChild(btnConcluir);
        item.appendChild(btnRemover);
        lista.appendChild(item);
    });
}

function dragStart(e) {
    arrastandoIndex = +this.dataset.index;
    this.style.opacity = "0.5";
    e.dataTransfer.effectAllowed = "move";
}

function dragOver(e) {
    e.preventDefault();
    this.style.borderTop = "2px solid rgb(4, 4, 90)";
}

function drop(e) {
    e.preventDefault();
    const indexDrop = +this.dataset.index;

    if (arrastandoIndex === null || indexDrop === arrastandoIndex) return;

    this.style.borderTop = "";

    const itemArrastado = tarefas.splice(arrastandoIndex, 1)[0];
    tarefas.splice(indexDrop, 0, itemArrastado);

    salvarTarefas();
    renderizarTarefas();
}

function dragEnd(e) {
    this.style.opacity = "1";
    document.querySelectorAll(".tarefa-item").forEach(item => item.style.borderTop = "");
}

function atualizarBotaoAtivo() {
    document.querySelectorAll(".botaoFiltro").forEach(botao => {
        if (botao.dataset.filtro === filtroAtual) {
            botao.classList.add("ativo");
        } else {
            botao.classList.remove("ativo");
        }
    });
}

