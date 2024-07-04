const {Router} = require('express')
const ClientController = require ('../controllers/ClientController')

const clientsRoutes = new Router()
const clientController = new ClientController

clientsRoutes.post('/', (req, res) => clientController.create(req, res));
clientsRoutes.get('/', (req, res) => clientController.getAll(req, res));
clientsRoutes.get('/:id', (req, res) => clientController.getById(req, res));
clientsRoutes.put('/:id', (req, res) => clientController.update(req, res));
clientsRoutes.delete('/:id', (req, res) => clientController.delete(req, res));


module.exports = clientsRoutes