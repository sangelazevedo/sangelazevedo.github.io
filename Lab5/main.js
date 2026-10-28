const titulo = document.getElementById("titulo");
const texto = document.getElementById("texto");
const botao = document.getElementById("botao");
const botaoTexto = document.getElementById("botaoTexto");
const mensagem = document.getElementById("mensagem");
const caixa = document.getElementById("caixa");

const elementoContador = document.getElementById("contador");
const botaoIncrementar = document.getElementById("incrementar");
const botaoDecrementar = document.getElementById("decrementar");
const botaoReset = document.getElementById("reset");

const elementoTemporizador = document.getElementById("temporizador");

let cliques = 0;
let indiceCor = 0;
let tempo = 0;

const cores = ["red", "blue", "green", "orange"];

let contador = Number(localStorage.getItem("contador")) || 0;

elementoContador.textContent = "Valor: " + contador;


function contarCliques() {
  cliques++;
  mensagem.textContent = "Cliques: " + cliques;
}

const alterarTexto = () => {
  texto.textContent = "A aprender JavaScript!";
};

function duploClique() {
  titulo.textContent = "Bem-vindo a Luanda!";
}

function passarRato() {
  caixa.style.backgroundColor = "yellow";
}

function retirarRato() {
  caixa.style.backgroundColor = "lightgray";
}

function mudarCorTeclado() {
  titulo.style.color = cores[indiceCor];

  indiceCor++;

  if (indiceCor == cores.length) {
    indiceCor = 0;
  }
}


function incrementar() {
  contador++;
  atualizarContador();
}

function decrementar() {
  contador--;
  atualizarContador();
}

function reset() {
  contador = 0;
  atualizarContador();
}

function atualizarContador() {
  elementoContador.textContent = "Valor: " + contador;
  localStorage.setItem("contador", contador);
}

// Temporizador automático

function count() {
  tempo++;
  elementoTemporizador.textContent = "Tempo: " + tempo + " segundos";
}


// 3. Event listeners

document.querySelectorAll("button.color").forEach((e) => {
  e.addEventListener("click", () => {
    texto.style.color = e.dataset.color;
  });
});

botao.addEventListener("click", contarCliques);
botaoTexto.addEventListener("click", alterarTexto);

titulo.addEventListener("dblclick", duploClique);

caixa.addEventListener("mouseover", passarRato);
caixa.addEventListener("mouseout", retirarRato);

document.addEventListener("keydown", mudarCorTeclado);

// Alterar a cor de fundo com select e this

document.querySelector("#corFundo").addEventListener("change", function () {
  document.body.style.backgroundColor = this.value;
});

// Alterar a direção do Flexbox

document.querySelector("#direcao").addEventListener("change", function () {
  document.querySelector("#containerFlex").style.flexDirection = this.value;
});

// Eventos do contador

botaoIncrementar.addEventListener("click", incrementar);
botaoDecrementar.addEventListener("click", decrementar);
botaoReset.addEventListener("click", reset);

// Iniciar o temporizador: uma vez por segundo

setInterval(count, 1000);
