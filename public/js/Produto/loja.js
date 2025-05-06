document.addEventListener("DOMContentLoaded", function() {
    var btnCarrinho = document.getElementById("btnVerCarrinho");

    if (btnCarrinho) {
        btnCarrinho.addEventListener("click", function() {
            window.location.href = "/carrinho"; // Redireciona para a página do carrinho
        });
    }

    document.querySelectorAll('.btnCarrinho').forEach(button => {
        button.addEventListener('click', function() {
            let produto = JSON.parse(this.getAttribute('data-produto'));
            let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

            carrinho.push(produto);
            localStorage.setItem("carrinho", JSON.stringify(carrinho));

            alert("Produto adicionado ao carrinho!");
        });
    });
});