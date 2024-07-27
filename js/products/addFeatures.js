export default function addFeatures(product) {
    product.addEventListener("click", () => {
        const id = product.getAttribute("id");
        window.location = location.protocol + "//" + location.host + `/pages/products/id.html?${id}`;
    });
}