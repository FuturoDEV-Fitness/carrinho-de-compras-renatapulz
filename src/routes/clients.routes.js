const {Router} = require('express')
const ClientController = require ('../controllers/ClientController')

const clientsRoutes = new Router()
const clientController = new ClientController

clientsRoutes.post('/', (req, res) => clientController.create(req, res));


module.exports = clientsRoutes