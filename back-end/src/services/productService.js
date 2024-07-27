import AlreadyExistsError from "../errors/alreadyExistsError.js";
import NotFoundError from "../errors/notFoundError.js";
import { products } from "../models/index.js";

class ProductService {
    async createProduct(dto) {
        try {
            const { name, description } = dto
            const product = await products.findOne({
                name: { $regex: `^${name}$`, $options: "i" },
                description: { $regex: `^${description}$`, $options: "i" }
        });

            if(product) {
                throw new AlreadyExistsError('Product already exists.');
            }

            const createdProduct = await products.create(dto);

            return createdProduct;

        } catch(error) {
            throw error;
        }
    }

    async getProducts() {
        try {
            const query = {};
            const productsList = products.find(query);
            const elementsCount = await products.countDocuments(query);
            return { productsList, elementsCount };
        } catch(error) {
            throw error;
        }
    }

    async getProductById(id) {
        try {
            const product = await products.findById(id);

            if(!product) {
                throw new NotFoundError('Product not found.')
            }

            return product;
        } catch(error) {
            throw error;
        }
    }

    async deleteProduct(id) {
        await this.getProductById(id);
        try {
            await products.findByIdAndDelete(id);
        } catch(error) {
            throw error;
        }
    }

    async updateProduct(dto) {
        const { id, ...updates } = dto;
        await this.getProductById(id);
        try {
            await products.findByIdAndUpdate(id, updates, {runValidators: true});
        } catch(error) {
            throw error;
        }
    }

    async getProductsByCategory(category) {
        try {
            const query = {category: { $regex: `^${category}$`, $options: "i" }};
            const productsList = products.find(query);
            const elementsCount = await products.countDocuments(query);
            return { productsList, elementsCount };
        } catch(error) {
            throw error;
        }
    }

    async getProductsByFilter(filter) {
        const regex = new RegExp(filter, 'i');
        try {
            const query = {$or: [
                { name: regex }, 
                { description: regex },
                { category: regex }
            ]};
            const productsList = products.find(query);
            const elementsCount = await products.countDocuments(query);
            return { productsList, elementsCount };
        } catch(error) {
            throw error;
        }
    }
}

export default ProductService;