const express = require('express')
const clientsRoutes = require('./src/routes/clients.routes')

const app = express()

app.use(express.json())

app.use('/clients', clientsRoutes)

app.listen(3000, () => {
    console.log("Servidor online")
})