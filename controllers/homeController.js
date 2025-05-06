const ProdutoModel = require("../models/produtoModel");
class HomeController {

    constructor() {

    }

    async homeView(req, res) {
        try {
            let produtoModel = new ProdutoModel();
            let produtos = await produtoModel.listarProdutos();
            let produtosJSON = produtos.map(p => p.toJSON());
            res.render("home/index", { produtos: produtosJSON , layout : false});
        } catch (error) {
            console.error("Erro ao carregar página da loja:", error);
            res.status(500).send("Erro ao carregar página da loja");
        }
    
    }
    async CarrinhoView(req, res) {
        res.render("produto/carrinho", { layout : false});
    }
}


module.exports = HomeController;