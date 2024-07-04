const {Router} = require('express')
const CategoryController = require ('../controllers/CategoryController')

const categoryRoutes = new Router()
const categoryController = new CategoryController

categoryRoutes.post('/', (req, res) => categoryController.create(req, res));
categoryRoutes.delete('/:id', (req, res) => categoryController.delete(req, res));


module.exports = categoryRoutes