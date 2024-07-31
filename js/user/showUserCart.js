import { modalCarregamento } from "../modalCarregamento.js";
import { updateUser } from "./crud/user-update.js";

const list = document.querySelector(".user__cart-container");

export default function showUserCart(cart, idUser) {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
    if(cart.length == 0) {
        const mensagem = document.createElement("p");
        mensagem.classList.add("mensagem__nao-encontrado")
        mensagem.textContent = "Seu carrinho de compras esta vazio.";
        list.append(mensagem);
        return;
    }
    cart.forEach(({ product, quantity }) => {
        list.appendChild(buildCard(product.name, product.description, product.urlImage, product.price, product._id, quantity, idUser));
    });
}

function buildCard(name, description, urlImage, price, id, quantity, idUser) {
    const product = document.createElement("li");
    product.classList.add("user__cart-list");
    product.setAttribute("id", id);
    product.innerHTML = `
        <img src="${urlImage}" class="user__cart-image">
        <span class="btn__remove-product"></span>
        <div class="user__cart-div">
            <p class="user__cart-text">
                <strong class="user__cart-strong">${name}</strong><br>
                ${description}
            </p>
        </div>
        <div class="total__value">
            <div class="btn__quantities">
                <input type="button" class="btn__decrease-quantity" value="-">
                <p disabled class="user__cart-quantity">${quantity}</p>
                <input type="button" class="btn__increase-quantity" value="+">
            </div>
            <p class="user__cart-price">R$ ${(parseFloat(price)*parseInt(quantity)).toFixed(2)}</p>
        </div>
    `;
    btnIncreaseQuantity(product, idUser, id, price);
    btnDecreaseQuantity(product, idUser, id, price);
    btnRemoveProduct(product, idUser, id);
    return product;
}

function btnIncreaseQuantity(product, idUser, productId, price) {
    const btn = product.querySelector(".btn__increase-quantity");
    const inputQuantity = product.querySelector(".user__cart-quantity");
    const priceText = product.querySelector(".user__cart-price");
    btn.addEventListener("click", async () => {
        modalCarregamento.mostrarModalCarregamento();
        const quantity = parseInt(inputQuantity.textContent) + 1;
        try {
            await updateUser.updateCartProductQuantityIdUser(idUser, quantity, productId);
        } catch(error) {
            modalCarregamento.esconderModalCarregamento();
            alert(error);
        }
        inputQuantity.textContent = quantity;
        priceText.textContent = `R$ ${(parseFloat(price)*quantity).toFixed(2)}`;
        modalCarregamento.esconderModalCarregamento();
    });
}

function btnDecreaseQuantity(product, idUser, productId, price) {
    const btn = product.querySelector(".btn__decrease-quantity");
    const inputQuantity = product.querySelector(".user__cart-quantity");
    const priceText = product.querySelector(".user__cart-price");
    btn.addEventListener("click", async () => {
        if(parseInt(inputQuantity.textContent) <= 1) {
            return;
        }
        const quantity = parseInt(inputQuantity.textContent) - 1;
        modalCarregamento.mostrarModalCarregamento();
        try {
            await updateUser.updateCartProductQuantityIdUser(idUser, quantity, productId);
        } catch(error) {
            modalCarregamento.esconderModalCarregamento();
            alert(error);
        }
        inputQuantity.textContent = quantity;
        priceText.textContent = `R$ ${(parseFloat(price)*quantity).toFixed(2)}`;
        modalCarregamento.esconderModalCarregamento();
    });
}

function btnRemoveProduct(product, idUser, productId) {
    const btn = product.querySelector(".btn__remove-product");
    btn.addEventListener("click", async () => {
        modalCarregamento.mostrarModalCarregamento();
        try {
            await updateUser.updateCartListRemoveProduct(idUser, productId);
            list.removeChild(product);
            if(list.childElementCount == 0) {
                const mensagem = document.createElement("p");
                mensagem.classList.add("mensagem__nao-encontrado")
                mensagem.textContent = "Seu carrinho de compras esta vazio.";
                list.append(mensagem);
            }
        } catch(error) {
            modalCarregamento.esconderModalCarregamento();
            alert(error);
        }
        modalCarregamento.esconderModalCarregamento();
    });
}