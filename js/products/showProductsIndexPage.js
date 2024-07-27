import addFeatures from "./addFeatures.js";

export function showProductsIndexPage(productsList, element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
    if(productsList.length == 0) {
        const mensagem = document.createElement("p");
        mensagem.classList.add("mensagem__nao-encontrado")
        mensagem.textContent = "Nenhum produto com as características especificadas foi encontrado.";
        element.append(mensagem);
        return;
    }
    productsList.forEach((product) => {
        element.appendChild(buildCard(product.name, product.description, product.urlImage, product.price, product._id));
    });
    const pagination = document.createElement("div");
    pagination.classList.add("swiper-pagination");
    element.parentNode.append(pagination);
    const btnPrev = document.createElement("div");
    btnPrev.classList.add("swiper-button-prev");
    element.parentNode.append(btnPrev);
    const btnNext = document.createElement("div");
    btnNext.classList.add("swiper-button-next");
    element.parentNode.append(btnNext);
}

function buildCard(name, description, urlImage, price, id) {
    const product = document.createElement("div");
    product.classList.add("swiper-slide");
    product.classList.add("slide-lancamentos");
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

export function swiper() {
    const swiper1 = new Swiper('.swiper1', {
        autoplay: {
            delay: 5000,
        },
        spaceBetween: 10,
        slidesPerView: 3,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            900: {
            slidesPerView: 4,
            spaceBetween: 20
            },
            1300: {
            slidesPerView: 5,
            spaceBetween: 30
            }
        }
    });
    const swiper2 = new Swiper('.swiper2', {
        spaceBetween: 5,
        slidesPerView: 3,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            900: {
            slidesPerView: 4,
            spaceBetween: 15
            },
            1300: {
            slidesPerView: 5,
            spaceBetween: 20
            }
        }
    });
}