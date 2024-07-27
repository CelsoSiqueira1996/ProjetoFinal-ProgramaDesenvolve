import { productsConnection } from "../../connectionAPI/productsConnection.js";

async function createProduct(event) {
    try{
        event.preventDefault();
        const category = event.target.elements['categoria'].value.split(";")
            .map((element) => element.trim());
        const dto = {
            name: event.target.elements['nome'].value.trim(),
            description: event.target.elements['descricao'].value.trim(),
            urlImage: event.target.elements['url-imagem'].value.trim(),
            category,
            price: parseFloat(event.target.elements['preco'].value),
            salesCount: Math.ceil(Math.random() * 100000)
        }
        const result = await productsConnection.postProducts(dto);
        alert(result.message);
    } catch(error) {
        throw error;
    }
}

export default createProduct;