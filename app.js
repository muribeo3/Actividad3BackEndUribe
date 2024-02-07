const express = require('express');
const ProductManager = require('./ProductManager'); // Ajusta la ruta según tu estructura de archivos

const app = express();
const port = 8080; // Puedes cambiar el puerto según tus necesidades

const productManager = new ProductManager('productos.json'); // Ajusta la ruta según tu estructura de archivos

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit;
        const products = await productManager.getProducts();

        if (limit) {
            res.json(products.slice(0, limit));
        } else {
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto por ID' });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});