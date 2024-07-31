import { searchUser } from "./crud/user-search.js";

const path = window.location.href;
const idUser = path.split("?")[1];

try {
    await searchUser.searchUserIdForCart(idUser);
} catch(error) {
    alert(error);
}

const productContainer = document.querySelector(".user__cart-container");
const productList = document.querySelector(".user__cart-list");
const productImage = document.querySelector(".user__cart-image");
const productText = document.querySelector(".user__cart-text");
const productStrong = document.querySelector(".user__cart-strong");
const productPrice = document.querySelector(".user__cart-price");

