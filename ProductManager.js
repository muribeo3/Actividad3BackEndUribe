const fs = require('fs/promises');


class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(product) {
        try {
            const products = await this.getProductsFromFile();

            // Asignar un id autoincrementable
            const id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            product.id = id;

            // Agregar el producto al arreglo
            products.push(product);

            // Guardar el arreglo actualizado en el archivo
            await this.saveProductsToFile(products);

            console.log('Producto agregado correctamente:', product);
        } catch (error) {
            console.error('Error al agregar el producto:', error.message);
        }
    }

    async getProducts() {
        try {
            const products = await this.getProductsFromFile();
            console.log('Todos los productos:', products);
            return products;
        } catch (error) {
            console.error('Error al obtener los productos:', error.message);
            return [];
        }
    }

    async getProductById(id) {
        try {
            const products = await this.getProductsFromFile();
            const product = products.find(p => p.id === id);

            if (product) {
                console.log('Producto encontrado:', product);
                return product;
            } else {
                console.error('Producto no encontrado. ID:', id);
                return null;
            }
        } catch (error) {
            console.error('Error al obtener el producto por ID:', error.message);
            return null;
        }
    }

    async updateProduct(id, updatedProduct) {
        try {
            const products = await this.getProductsFromFile();
            const index = products.findIndex(p => p.id === id);

            if (index !== -1) {
                // Actualizar el producto en el arreglo
                products[index] = { ...products[index], ...updatedProduct };

                // Guardar el arreglo actualizado en el archivo
                await this.saveProductsToFile(products);

                console.log('Producto actualizado correctamente:', products[index]);
            } else {
                console.error('Producto no encontrado. ID:', id);
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error.message);
        }
    }

    async deleteProduct(id) {
        try {
            const products = await this.getProductsFromFile();
            const updatedProducts = products.filter(p => p.id !== id);

            // Guardar el arreglo actualizado en el archivo
            await this.saveProductsToFile(updatedProducts);

            console.log('Producto eliminado correctamente. ID:', id);
        } catch (error) {
            console.error('Error al eliminar el producto:', error.message);
        }
    }

    async getProductsFromFile() {
        try {
            const data = await fs.readFile(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            // Si el archivo no existe, retorna un arreglo vacío
            if (error.code === 'ENOENT') {
                return [];
            } else {
                throw error;
            }
        }
    }

    async saveProductsToFile(products) {
        await fs.writeFile(this.path, JSON.stringify(products, null, 2), 'utf-8');
    }
}

module.exports = ProductManager;


