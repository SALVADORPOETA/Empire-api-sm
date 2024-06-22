import express from 'express'
import bodyParser from 'body-parser'

import productsRoutes from './routes/products.js'

const app = express()
const PORT = 5000

app.use(bodyParser.json())

app.use('/products', productsRoutes)

app.get('/', (req, res) => res.send('Hello from homepage.'))

app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))