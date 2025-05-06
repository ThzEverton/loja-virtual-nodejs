const express = require('express');
const HomeController = require('../controllers/homeController');

const homeRouter = express.Router();

let ctrl = new HomeController();
homeRouter.get('/', ctrl.homeView);
homeRouter.get('/carrinho', (req, res) => ctrl.CarrinhoView(req, res));

module.exports = homeRouter;