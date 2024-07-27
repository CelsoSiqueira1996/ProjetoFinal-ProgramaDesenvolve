import { productsConnection } from "../../connectionAPI/productsConnection.js";
import { queryFromPath } from "../../processedQuery.js";
import showProducts from "../showProducts.js";
import { showProductsIndexPage } from "../showProductsIndexPage.js";

async function searchProductById(event) {
    try {
        event.preventDefault();
        const id = event.target.elements['id-produto'].value;
        const result = await productsConnection.getProductsById(id);

        showProducts([result]);
    } catch(error) {
        throw error;
    }
}

async function searchProductByIdPage(id) {
    try {
        const result = await productsConnection.getProductsById(id);

        showProducts([result]);
    } catch(error) {
        throw error;
    }
}


async function searchProductByCategory(category, queryParams="") {
    try {   
        queryParams = (!queryParams)? "" : `?${queryParams}`;
        const pageNumber = (queryFromPath(queryParams).page)? queryFromPath(queryParams).page : 1;
        const result = await productsConnection.getProductsByCategory(category, queryParams);
        const [pagesNumber, productsList] = result;

        showProducts(productsList, pagesNumber, pageNumber);
    } catch(error) {
        throw error;
    }

}

async function searchProductByFilter(filterQuery) {
    try {
        const pageNumber = (queryFromPath(filterQuery).page)? queryFromPath(filterQuery).page : 1;
        const result = await productsConnection.getProductsByFilter(filterQuery);
        const [pagesNumber, productsList] = result;

        showProducts(productsList, pagesNumber, pageNumber);
    } catch(error) {
        throw error;
    }
}

async function searchAllProducts(queryParams, element) {
    try {
        queryParams = `?${queryParams}`;
        const result = await productsConnection.getProducts(queryParams);
        const [, productsList] = result;

        showProductsIndexPage(productsList, element);
    } catch(error) {
        throw error;
    }
}

export const searchProducts = {
    searchProductById,
    searchProductByIdPage,
    searchProductByFilter,
    searchProductByCategory,
    searchAllProducts
};