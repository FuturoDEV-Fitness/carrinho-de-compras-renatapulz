const {Router} = require('express')
const OrdersController = require ('../controllers/OrdersController')

const ordersRoutes = new Router()
const ordersController = new OrdersController

ordersRoutes.post('/', (req, res) => ordersController.create(req, res));
ordersRoutes.delete('/:id', (req, res) => ordersController.delete(req, res));

module.exports = ordersRoutes