import { processedQuery } from "../processedQuery.js";
import addFeatures from "./addFeatures.js";

const list = document.querySelector(".products__container");
const pages = document.querySelector(".pages__number");

export default function showProducts(productsList, pagesNumber, pageNumber) {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if(productsList.length == 0) {
        const mensagem = document.createElement("p");
        mensagem.classList.add("mensagem__nao-encontrado")
        mensagem.textContent = "Nenhum produto com as características especificadas foi encontrado.";
        list.append(mensagem);
        return;
    }
    productsList.forEach((product) => {
        list.appendChild(buildCard(product.name, product.description, product.urlImage, product.price, product._id));
    });
    if(pagesNumber) {
        pagesNumber = parseInt(pagesNumber);
        pageNumber = parseInt(pageNumber);
        pageNumber = (pageNumber > pagesNumber)? pagesNumber : pageNumber;
        buildPagesNumber(pagesNumber, pageNumber);
        queryPagesNumber(pageNumber);
    }
}


function buildCard(name, description, urlImage, price, id) {
    const product = document.createElement("li");
    product.classList.add("slide-lancamentos");
    product.classList.add("product__from-api");
    product.setAttribute("id", id);
    product.innerHTML = `
        <img src="${urlImage}" class="carrossel-lancamentos__imagem">
        <p class="carrossel-lancamentos__texto">
            <strong class="carrossel-lancamentos__vendedor">${name}</strong><br>
            ${description}
        </p>
        <p class="product__price">R$ ${parseFloat(price).toFixed(2)}</p>
    `;

    addFeatures(product);
    return product;
}

function buildPagesNumber(pagesNumber, pageNumber) {
    while(pages.firstChild) {
        pages.removeChild(pages.firstChild);
    }
    const buttonStart = document.createElement("button");
    buttonStart.setAttribute("id", "start__button");
    buttonStart.textContent = "<";
    if(pageNumber == 1) {
        buttonStart.setAttribute("disabled", "true");
    }
    pages.append(buttonStart);
    let i = ((pagesNumber - pageNumber) >= 5)? pageNumber : ((pagesNumber - 5) <= 1)? 1 : pagesNumber - 5;
    for(i; (i <= (5 + pageNumber) && i <= pagesNumber); i++) {
        const buttonPageNumber = document.createElement("button");
        buttonPageNumber.setAttribute("id", `${i}`);
        if(i == pageNumber) {
            buttonPageNumber.classList.add("page__number-selected");
        }
        buttonPageNumber.textContent = i;
        pages.append(buttonPageNumber);
    }
    const buttonEnd = document.createElement("button");
    buttonEnd.setAttribute("id", "end__button");
    buttonEnd.textContent = ">";
    if(pageNumber == pagesNumber) {
        buttonEnd.setAttribute("disabled", "true");
    }
    pages.append(buttonEnd);
}

function queryPagesNumber(pageNumber) {
    const btnPages = document.querySelectorAll(".pages__number button");
    btnPages.forEach((btn) => {
        btn.addEventListener("click", () => {
            if(btn.id == "start__button") {
                processedQuery(undefined, undefined, parseInt(pageNumber) - 1);
                return;
            } else if(btn.id == "end__button") {
                processedQuery(undefined, undefined, parseInt(pageNumber) + 1);
                return;
            }
            processedQuery(undefined, undefined, btn.id);
        });
    });
}
