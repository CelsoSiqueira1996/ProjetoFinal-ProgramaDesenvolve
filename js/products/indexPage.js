import { searchProducts } from "./crud/products-search.js";
import { swiper } from "./showProductsIndexPage.js";

const swiperNewReleases = document.querySelector(".swiper-wrapper__new-releases");
const swiperBestSellers = document.querySelector(".swiper-wrapper__best-sellers");
const querySalesCount = "limit=15&ordernation=salesCount:-1";
const queryNewReleases = "limit=15";

try {
    await searchProducts.searchAllProducts(queryNewReleases, swiperNewReleases);
    await searchProducts.searchAllProducts(querySalesCount, swiperBestSellers);
    swiper();
} catch(error) {
    alert(error);
}