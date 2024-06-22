import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsFilePath = path.resolve(__dirname, '../routes/products.json');

let products = [];

// Function to load products from file
const loadProducts = () => {
    try {
        const dataBuffer = fs.readFileSync(productsFilePath);
        const dataJSON = dataBuffer.toString();
        products = JSON.parse(dataJSON);
    } catch (e) {
        products = [];
    }
};

// Function to save products to file
const saveProducts = () => {
    const dataJSON = JSON.stringify(products, null, 2);
    fs.writeFileSync(productsFilePath, dataJSON);
};

export const getProducts = (req, res) => {
    loadProducts();
    res.send(products);
}

export const createProduct = (req, res) => {
    const product = req.body;
    loadProducts();
    products.push({ ...product, id: uuidv4() });
    saveProducts();
    res.send(`Product with the name ${product.name} added to the database!`);
}

export const getProduct = (req, res) => {
    const { id } = req.params;
    loadProducts();
    const foundProduct = products.find((product) => product.id === id);
    res.send(foundProduct);
}

export const deleteProduct = (req, res) => {
    const { id } = req.params;
    loadProducts();
    products = products.filter((product) => product.id !== id);
    saveProducts();
    res.send(`Product with the id ${id} deleted from the database.`);
}

export const updateProduct = (req, res) => {
    const { id } = req.params;
    const { link, name, category, image, price } = req.body;
    loadProducts();
    const product = products.find((product) => product.id === id);

    if (!product) {
        return res.status(404).send(`Product with the id ${id} not found.`);
    }
    if (link) product.link = link;
    if (name) product.name = name;
    if (category) product.category = category;
    if (image) product.image = image;
    if (price) product.price = price;

    saveProducts();
    res.send(`Product with the id ${id} has been updated.`);
}

{/* 
import { v4 as uuidv4 } from 'uuid';

let products = []

export const getProducts = (req, res) => {
    res.send(products)
}

export const createProduct = (req, res) => {
    const product = req.body
    products.push({ ... product, id: uuidv4()})
    res.send(`Product with the name ${product.name} added to the database!`)
}

export const getProduct = (req, res) => {
    const { id } = req.params
    const foundProduct = products.find((product) => product.id === id)
    res.send(foundProduct)
}

export const deleteProduct = (req, res) => {
    const { id } = req.params
    products = products.filter((product) => product.id !== id)
    res.send(`User with the id ${id} deleted from the database.`)
}

export const updateProduct = (req, res) => {
    const { id } = req.params
    const { link, name, category, image, price } = req.body
    const product = products.find((product) => product.id === id)
    
    if (!product) {
        return res.status(404).send(`Product with the id ${id} not found.`);
    }
    if (link) product.link = link
    if (name) product.name = name
    if (category) product.category = category
    if (image) product.image = image   
    if (price) product.price = price

    res.send(`Product with the id ${id} has been updated.`)
}
*/}