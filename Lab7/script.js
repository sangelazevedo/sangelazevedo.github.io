// Inicializar o localStorage

if (localStorage.getItem("produtos-selecionados") === null) {
    localStorage.setItem("produtos-selecionados", JSON.stringify([]));
}

// B. Funções utilitárias

function criarProduto(produto) {
    const article = document.createElement("article");

    const imagem = document.createElement("img");
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const titulo = document.createElement("h2");
    titulo.textContent = produto.title;

    const descricao = document.createElement("p");
    descricao.textContent = produto.description;

    const categoria = document.createElement("p");
    categoria.textContent = "Categoria: " + produto.category;

    const preco = document.createElement("p");
    preco.textContent = "Preço: " + produto.price.toFixed(2) + " €";

    const classificacao = document.createElement("p");
    classificacao.textContent = "Classificação: " + produto.rating.rate + "/5";

    const botao = document.createElement("button");
    botao.textContent = "+ Adicionar ao cesto";

    botao.addEventListener("click", function () {
        const produtosSelecionados = JSON.parse(
            localStorage.getItem("produtos-selecionados")
        );

        produtosSelecionados.push(produto);

        localStorage.setItem(
            "produtos-selecionados",
            JSON.stringify(produtosSelecionados)
        );

        atualizaCesto();
    });

    article.append(
        imagem,
        titulo,
        descricao,
        categoria,
        preco,
        classificacao,
        botao
    );

    return article;
}


function criaProdutoCesto(produto) {
    const article = document.createElement("article");

    const titulo = document.createElement("h3");
    titulo.textContent = produto.title;

    const preco = document.createElement("p");
    preco.textContent = "Preço: " + produto.price.toFixed(2) + " €";

    const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Remover";

    botaoRemover.addEventListener("click", function () {
        const produtosSelecionados = JSON.parse(
            localStorage.getItem("produtos-selecionados")
        );

        const indice = produtosSelecionados.findIndex(function (item) {
            return item.id === produto.id;
        });

        if (indice !== -1) {
            produtosSelecionados.splice(indice, 1);
        }

        localStorage.setItem(
            "produtos-selecionados",
            JSON.stringify(produtosSelecionados)
        );

        atualizaCesto();
    });

    article.append(titulo, preco, botaoRemover);

    return article;
}


// C. Event handlers

function renderizarProdutos(produtos) {
    const nodeProdutos = document.querySelector("#produtos");

    nodeProdutos.innerHTML = "";

    produtos.forEach(function (produto) {
        const article = criarProduto(produto);
        nodeProdutos.append(article);
    });
}


function atualizaCesto() {
    const nodeCesto = document.querySelector("#produtos-selecionados");
    const nodeTotal = document.querySelector("#preco-total");

    const produtosSelecionados = JSON.parse(
        localStorage.getItem("produtos-selecionados")
    );

    nodeCesto.innerHTML = "";

    let total = 0;

    produtosSelecionados.forEach(function (produto) {
        const article = criaProdutoCesto(produto);
        nodeCesto.append(article);

        total += produto.price;
    });

    nodeTotal.textContent = "Preço total: " + total.toFixed(2) + " €";
}


// E. Inicialização

renderizarProdutos(produtos);
atualizaCesto();
