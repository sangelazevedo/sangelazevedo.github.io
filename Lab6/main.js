const nodeInputNumero = document.querySelector("form input[type='number']");
const nodeUlColecao = document.querySelector("#colecao ul");
const nodeUlRepetidos = document.querySelector("#repetidos ul");
const nodeTotal = document.querySelector("#total");
const nodeTotalRepetidos = document.querySelector("#totalRepetidos");
const form = document.querySelector("form");

// Recuperar as listas do localStorage

const colecao = JSON.parse(localStorage.getItem("colecao")) || [];
const repetidos = JSON.parse(localStorage.getItem("repetidos")) || [];

let totalRepetidos = repetidos.length;


function guardaCarta() {
    const numero = Number(nodeInputNumero.value);

    if (colecao.includes(numero)) {
        repetidos.push(numero);
        repetidos.sort((a, b) => a - b);
    } else {
        colecao.push(numero);
        colecao.sort((a, b) => a - b);
    }

    localStorage.setItem("colecao", JSON.stringify(colecao));
    localStorage.setItem("repetidos", JSON.stringify(repetidos));


    atualizaLista(colecao, nodeUlColecao);
    atualizaLista(repetidos, nodeUlRepetidos);

    nodeTotal.textContent = colecao.length;

    totalRepetidos = repetidos.length;
    nodeTotalRepetidos.textContent = totalRepetidos;

    nodeInputNumero.value = "";
}

function atualizaLista(lista, nodeUl) {
    nodeUl.innerHTML = "";

    lista.forEach((numero, indice) => {
        if (nodeUl === nodeUlRepetidos) {
            nodeUl.innerHTML +=
                "<li>" + numero +
                ' <button class="eliminar" data-indice="' + indice +
                '">Eliminar</button></li>';
        } else {
            nodeUl.innerHTML += "<li>" + numero + "</li>";
        }
    });

    // Eventos dos botões Eliminar

    if (nodeUl === nodeUlRepetidos) {
        document.querySelectorAll(".eliminar").forEach((botao) => {
            botao.addEventListener("click", () => {
                const indice = Number(botao.dataset.indice);

                repetidos.splice(indice, 1);

                // Guardar a lista atualizada

                localStorage.setItem("repetidos", JSON.stringify(repetidos));

                totalRepetidos = repetidos.length;
                nodeTotalRepetidos.textContent = totalRepetidos;

                atualizaLista(repetidos, nodeUlRepetidos);
            });
        });
    }
}


form.onsubmit = (event) => {
    event.preventDefault();

    guardaCarta();
};


atualizaLista(colecao, nodeUlColecao);
atualizaLista(repetidos, nodeUlRepetidos);

nodeTotal.textContent = colecao.length;
nodeTotalRepetidos.textContent = repetidos.length;
