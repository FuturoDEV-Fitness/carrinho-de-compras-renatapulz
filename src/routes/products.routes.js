const {Router} = require('express')
const ProductController = require('../controllers/ProductController')

const productsRouter = new Router()
const productController = new ProductController

productsRouter.post('/', (req, res) => productController.create(req, res));
productsRouter.get('/', (req, res) => productController.getAll(req, res));
productsRouter.get('/:id', (req, res) => productController.getById(req, res));
productsRouter.put('/:id', (req, res) => productController.update(req, res));
productsRouter.delete('/:id', (req, res) => productController.delete(req, res));

module.exports = productsRouter