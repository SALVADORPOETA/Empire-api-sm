import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import productsRoutes from './routes/products.js'

const app = express()
const PORT = 5000

const corsOptions = {
    origin: [   
                'http://localhost:3000', 
                'http://localhost:3001', 
                'http://localhost:3002', 
                'http://localhost:3004', 
                'http://localhost:3005', 
                'https://empire-sm.vercel.app'
            ]
}

app.use(cors(corsOptions))

app.use(bodyParser.json())

app.use('/products', productsRoutes)

app.get('/', (req, res) => {
    const homePageContent = `
        <html>
            <head>
                <title>Homepage</Title>
            </head>
            <body>
                <p>This is the homepage. Start to use this API here: <a href="https://empire-api-sm.vercel.app/products">Products Data</a></p>
            </body>
        </html>
    `
    res.send(homePageContent)
})
app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`))