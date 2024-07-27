import express from 'express';
import ProductController from '../controllers/productControllers.js';
import pagination from '../middlewares/pagination.js';
import permission from '../middlewares/permission.js';
import authenticated from '../middlewares/authenticated.js';

const productRoutes = express.Router();

productRoutes
    .get('/products', ProductController.getProducts, pagination)
    .post('/products', authenticated, permission('products'), ProductController.createProduct)
    .delete('/products/id/:id', authenticated, permission('products'), ProductController.deleteProduct)
    .put('/products/id/:id', authenticated, permission('products'), ProductController.updateProduct)
    .get('/products/search', ProductController.getProductsByFilter, pagination)
    .get('/products/category/:category', ProductController.getProductsByCategory, pagination)
    .get('/products/id/:id', ProductController.getProductById);

export default productRoutes;