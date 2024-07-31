const list = document.querySelector(".user__cart-container");

export default function showUserCart(cart) {
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
        list.appendChild(buildCard(product.name, product.description, product.urlImage, product.price, product._id, quantity));
    });
}

function buildCard(name, description, urlImage, price, id, quantity) {
    const product = document.createElement("li");
    product.classList.add("user__cart-list");
    product.setAttribute("id", id);
    product.innerHTML = `
        <img src="${urlImage}" class="user__cart-image">
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
    return product;
}
