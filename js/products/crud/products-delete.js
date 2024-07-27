import { productsConnection } from "../../connectionAPI/productsConnection.js";

export default async function deleteProduct(event) {
    try {
        event.preventDefault();
        const id = event.target.elements["id-produto"].value;
        const result = await productsConnection.deleteProducts(id);
        alert(result.message);
    } catch(error) {
        throw error;
    }
}
