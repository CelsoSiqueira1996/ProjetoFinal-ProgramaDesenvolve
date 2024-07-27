import "../processedQuery.js";
import { searchProducts } from "./crud/products-search.js";

const filterQuery = window.location.href.split("?")[1].substring(2);
const path = document.querySelector(".path");

try {
    await searchProducts.searchProductByFilter(`?q=${filterQuery}`);
    path.innerHTML = `
    <a href="../../index.html">Home</a> > Resultado da busca "${filterQuery.split("&")[0].replace(/%/g, " ")}"
    `;
} catch(error) {
    alert(error);
}



