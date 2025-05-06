document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("carrinho");
    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    container.innerHTML = "";

    if (carrinho.length === 0) {
        container.innerHTML = "<p>O carrinho está vazio.</p>";
        return;
    }

    carrinho.forEach((produto, index) => {
        let item = document.createElement("div");
        item.classList.add("cart-item");
        item.innerHTML = `
            <div class="cart-item-info">
                <img src="${produto.produtoImagem}" width="80">
                <p><strong>${produto.produtoNome}</strong></p>
                <p>Preço: R$ ${Number(produto.produtoValor).toFixed(2)}</p>
                <p>Marca: ${produto.marcaNome}</p>
                <button class="btn btn-danger btnRemover" data-index="${index}">
                    <i class="fas fa-trash"></i> Remover
                </button>
            </div>
        `;
        container.appendChild(item);
    });

    document.querySelectorAll(".btnRemover").forEach(button => {
        button.addEventListener("click", function () {
            let index = this.getAttribute("data-index");
            carrinho.splice(index, 1);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));
            location.reload(); // Atualiza a página para refletir as mudanças
        });
    });
});

function limparCarrinho() {
    localStorage.removeItem("carrinho");
    location.reload();
}