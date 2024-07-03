const express = require('express')
const clientsRoutes = require('./src/routes/clients.routes')
const productsRouter = require('./src/routes/products.routes')

const app = express()

app.use(express.json())

app.use('/clients', clientsRoutes)
app.use('/products', productsRouter)

app.listen(3000, () => {
    console.log("Servidor online")
})