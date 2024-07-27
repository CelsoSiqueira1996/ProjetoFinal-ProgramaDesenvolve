import getAccessToken from "../auth/getAccessToken.js";

async function getProducts(queryParams) {
    const connection = await fetch(`http://localhost:3000/products${queryParams}`);
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

async function getProductsById(id) {
    const connection = await fetch(`http://localhost:3000/products/id/${id}`);
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

async function getProductsByCategory(category, queryParams) {
    const connection = await fetch(`http://localhost:3000/products/category/${category}${queryParams}`);
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

async function getProductsByFilter(filterQuery) {
    const connection = await fetch(`http://localhost:3000/products/search${filterQuery}`);
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

async function postProducts(dto) {
    const accessToken = getAccessToken();
    const connection = await fetch("http://localhost:3000/products", {
        method: "POST",
        headers: {
            "authorization": accessToken,
            "Content-type": "application/json"
        },
        body: JSON.stringify(dto)
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

async function putProducts(id, dto) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/products/id/${id}`, {
        method: "PUT",
        headers: {
            "authorization": accessToken,
            "Content-type": "application/json"
        },
        body: JSON.stringify(dto)
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

async function deleteProducts(id) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/products/id/${id}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "authorization": accessToken
        }
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

export const productsConnection = {
    getProducts,
    getProductsById,
    getProductsByCategory,
    getProductsByFilter,
    postProducts,
    putProducts,
    deleteProducts
}