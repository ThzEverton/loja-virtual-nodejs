const express = require('express');
const multer = require('multer');
const ProdutoController = require('../controllers/produtoController');

const produtoRouter = express.Router();

// Armazenamento em disco
let storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/img/produtos");
    },
    filename(req, file, cb) {
        let nomeArq = "prd-" + Date.now() + "." + file.mimetype.split("/").pop();
        cb(null, nomeArq);
    }
});

let upload = multer({ storage });

let ctrl = new ProdutoController();


produtoRouter.get('/loja', (req, res) => ctrl.lojaView(req, res));
produtoRouter.get('/carrinho', (req, res) => {
    res.render("produto/carrinho");
});

produtoRouter.get('/', ctrl.listarView);
produtoRouter.get('/cadastro', ctrl.cadastroView);
produtoRouter.post('/cadastro', upload.single("imagem"), ctrl.cadastrarProduto);
produtoRouter.post('/excluir', ctrl.excluirProduto);
produtoRouter.post('/alterar', upload.single("imagem"), ctrl.alterarProduto);
produtoRouter.get('/alterar/:id', ctrl.alterarView);

module.exports = produtoRouter;