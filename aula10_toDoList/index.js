document.getElementById("add").addEventListener("click", function (event) {
event.preventDefault();

    const nomeTarefa = document.getElementById("addTarefa");
    const valor = nomeTarefa.value.trim();

    const texto = document.createElement("p");
    texto.className = "tarefa-item";

    texto.innerHTML = `<span>${valor}</span>
    <button id="remover" class="botao">Remover</button>
    `;

    document.getElementById("listaTarefas").appendChild(texto);
    nomeTarefa.value = "";

    texto.querySelector(".remover").addEventListener("click", () => {
        texto.remove();
    });

})
