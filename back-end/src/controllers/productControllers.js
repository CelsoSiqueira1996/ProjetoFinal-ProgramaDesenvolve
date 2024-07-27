import NotFoundError from "../errors/notFoundError.js";
import ProductService from "../services/productService.js";

const productService = new ProductService();

class ProductController {
    static async createProduct(req, res, next) {
        try {
            const product = await productService.createProduct(req.body)
            res.status(201).send({message: 'Product successfully created', product});
        } catch(error) {
            next(error);
        }
    }

    static async getProducts(req, res, next) {
        try {
            const { productsList, elementsCount } = await productService.getProducts();
            req.result = productsList;
            req.elementsCount = elementsCount;
            next();
        } catch(error) {
            next(error);
        }
    }

    static async getProductById(req, res, next) {
        try {
            const id = req.params.id;
            const product = await productService.getProductById(id);
            res.status(200).send(product);
        } catch(error) {
            next(error);
        }
    }

    static async deleteProduct(req, res, next) {
        const id = req.params.id;
        try{
            await productService.deleteProduct(id)
            res.status(200).send({message: 'Product successfully deleted.'});
        } catch(error) {
            next(error);
        }
    }

    static async updateProduct(req, res, next) {
        const id = req.params.id;
        try {
            await productService.updateProduct({ id, ...req.body });
            res.status(200).send({message: "Product successfully updated."});
        } catch(error) {
            next(error);
        }
    }

    static async getProductsByCategory(req, res, next) {
        const category = req.params.category;
        try {
            const { productsList, elementsCount } = await productService.getProductsByCategory(category);
            req.result = productsList;
            req.elementsCount = elementsCount;
            next();
        } catch(error) {
            next(error);
        }
    }

    static async getProductsByFilter(req, res, next) {
        const filter = req.query.q;
        try {
            if(!filter) {
                throw new NotFoundError();
            }
            const { productsList, elementsCount } = await productService.getProductsByFilter(filter);
            req.result = productsList;
            req.elementsCount = elementsCount;
            next();
        } catch(error) {
            next(error);
        }
    }

}

export default ProductController;