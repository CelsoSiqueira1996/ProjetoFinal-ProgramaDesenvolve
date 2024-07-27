import { searchProducts } from "./crud/products-search.js";

const path = window.location.href;
const productId = path.split("?")[1];

try {
    await searchProducts.searchProductByIdPage(productId);
} catch(error) {
    alert(error);
}

const productContainer = document.querySelector(".products__container");
const productImage = document.querySelector(".carrossel-lancamentos__imagem");
const productText = document.querySelector(".carrossel-lancamentos__texto");
const productStrong = document.querySelector(".carrossel-lancamentos__vendedor");
const productPrice = document.querySelector(".product__price");
const pathHistoric = document.querySelector(".path");

pathHistoric.innerHTML = `
    <a href="../../index.html">Home</a> > ${productText.textContent}   
`;

clearElementClassList(productContainer);
clearElementClassList(productImage);
clearElementClassList(productText);
clearElementClassList(productStrong);
clearElementClassList(productPrice);

productContainer.classList.add("product__page-container");
productImage.classList.add("product__page-image");
productText.classList.add("product__page-text");
productStrong.classList.add("product__page-strong");
productPrice.classList.add("product__page-price");

function removeElementsFromContainer() {
    while(productContainer.firstChild) {
        productContainer.removeChild(productContainer.firstChild)
    }
    productContainer.append(productImage);
}

function createDivProduct() {
    removeElementsFromContainer();
    const productBtn = createBtnAddCart();
    const productDiv = document.createElement("div");    
    productDiv.classList.add("product__page-div");
    productDiv.append(productStrong);
    productDiv.append(productText);
    productDiv.append(productPrice);
    productDiv.append(productBtn);
    productContainer.append(productDiv);
}

function createBtnAddCart() {
    const btnAddCart = document.createElement("button");
    btnAddCart.classList.add("btn__add-cart");
    btnAddCart.innerHTML = `
        <p class="product__page-btn">Adicionar ao carrinho</p>
    `;
    return btnAddCart;
}

function clearElementClassList(element) {
    element.classList.remove(...element.classList);
}

createDivProduct();

