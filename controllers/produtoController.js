const CategoriaModel = require("../models/categoriaModel");
const MarcaModel = require("../models/marcaModel");
const ProdutoModel = require("../models/produtoModel");
const fs = require("fs");

class ProdutoController {

    async listarView(req, res) {
        try {
            let produtoModel = new ProdutoModel();
            let lista = await produtoModel.listarProdutos();
            res.render('produto/listar', { lista });
        } catch (error) {
            console.error("Erro ao listar produtos:", error);
            res.status(500).send("Erro ao carregar produtos");
        }
    }

    async excluirProduto(req, res) {
        try {
            const { codigo } = req.body;
            let produtoModel = new ProdutoModel();
            const ok = codigo ? await produtoModel.excluir(codigo) : false;
            res.send({ ok });
        } catch (error) {
            console.error("Erro ao excluir produto:", error);
            res.status(500).send({ ok: false });
        }
    }

    async cadastrarProduto(req, res) {
        try {
            const { codigo, nome, quantidade, marca, categoria, valor } = req.body;
            const arquivo = req.file;

            if (codigo && nome && quantidade !== "0" && marca !== "0" &&
                categoria !== "0" && valor !== "0" && arquivo) {

                let produtoModel = new ProdutoModel(0, codigo, nome, quantidade, valor, arquivo.filename,
                    arquivo.mimetype.split("/").pop(), categoria, marca, "", "");

                const ok = await produtoModel.gravar();
                res.send({ ok });
            } else {
                res.send({ ok: false });
            }
        } catch (error) {
            console.error("Erro ao cadastrar produto:", error);
            res.status(500).send({ ok: false });
        }
    }

    async alterarView(req, res) {
        try {
            let produtoModel = new ProdutoModel();
            let produto = req.params.id ? await produtoModel.buscarProduto(req.params.id) : new ProdutoModel();
            const listaMarcas = await new MarcaModel().listarMarcas();
            const listaCategorias = await new CategoriaModel().listarCategorias();

            res.render("produto/alterar", { produtoAlter: produto, listaMarcas, listaCategorias });
        } catch (error) {
            console.error("Erro ao carregar tela de alteração:", error);
            res.status(500).send("Erro ao carregar página");
        }
    }

    async alterarProduto(req, res) {
        try {
            const { id, codigo, nome, quantidade, valor, marca, categoria } = req.body;
            const arquivo = req.file;
            let ok = false;

            if (codigo && nome && quantidade !== "0" && marca !== "0" && categoria !== "0" && valor) {
                let produtoModel = new ProdutoModel(id, codigo, nome, quantidade, valor, null, null, categoria, marca, "", "");
                let produtoOld = await produtoModel.buscarProduto(id);

                if (arquivo) {
                    produtoModel.produtoImagem = arquivo.filename;
                    produtoModel.produtoImgExtensao = arquivo.mimetype.split("/").pop();

                    const imagemAntiga = produtoOld.produtoImagem.split("/").pop();
                    if (fs.existsSync(global.CAMINHO_DIRETORIO + imagemAntiga)) {
                        fs.unlinkSync(global.CAMINHO_DIRETORIO + imagemAntiga);
                    }
                } else {
                    produtoModel.produtoImagem = produtoOld.produtoImagem.split("/").pop();
                    produtoModel.produtoImgExtensao = produtoOld.produtoImgExtensao;
                }

                ok = await produtoModel.gravar();
            }

            res.send({ ok });
        } catch (error) {
            console.error("Erro ao alterar produto:", error);
            res.status(500).send({ ok: false });
        }
    }

    async cadastroView(req, res) {
        try {
            const listaMarcas = await new MarcaModel().listarMarcas();
            const listaCategorias = await new CategoriaModel().listarCategorias();
            res.render('produto/cadastro', { listaMarcas, listaCategorias });
        } catch (error) {
            console.error("Erro ao carregar tela de cadastro:", error);
            res.status(500).send("Erro ao carregar página");
        }
    }

    async lojaView(req, res) {
        try {
            let produtoModel = new ProdutoModel();
            let produtos = await produtoModel.listarProdutos();
            let produtosJSON = produtos.map(p => p.toJSON());
            res.render("produto/loja", { produtos: produtosJSON });
        } catch (error) {
            console.error("Erro ao carregar página da loja:", error);
            res.status(500).send("Erro ao carregar página da loja");
        }
    }
}

module.exports = ProdutoController;