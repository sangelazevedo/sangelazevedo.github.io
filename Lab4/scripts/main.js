let contador = localStorage.getItem("contador") || 0;

const texto = document.getElementById("texto");
const cor = document.getElementById("cor");
const botao = document.getElementById("botao");
const contadorTexto = document.getElementById("contador");

contadorTexto.textContent = "Cliques: " + contador;

cor.addEventListener("input", function () {
    texto.style.color = cor.value;
});

botao.addEventListener("mouseover", function () {
    botao.style.backgroundColor = "red";
});

botao.addEventListener("mouseout", function () {
    botao.style.backgroundColor = "";
});

botao.addEventListener("click", function () {
    contador++;

    contadorTexto.textContent = "Cliques: " + contador;

    localStorage.setItem("contador", contador);
});
