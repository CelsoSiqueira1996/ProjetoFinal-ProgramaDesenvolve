import "../processedQuery.js";
import { searchProducts } from "./crud/products-search.js";

const html = document.querySelector("[category]");
const path = window.location.href;
const queryParams = path.split('?')[1];

try{
    await searchProducts.searchProductByCategory(html.getAttribute("category"), queryParams);
} catch(error) {
    alert(error);
}


