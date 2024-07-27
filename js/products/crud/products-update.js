import { productsConnection } from "../../connectionAPI/productsConnection.js";

export default async function updateProduct(event) {
    try {
        event.preventDefault();
        const id = event.target.elements["id-produto"].value;
        const categories = event.target.elements['categoria'].value;
        const category = (categories)? categories.split(";").map(element => element.trim()) : [];
        const name = event.target.elements['nome'].value.trim();
        const description = event.target.elements['descricao'].value.trim();
        const urlImage = event.target.elements['url-imagem'].value.trim();
        const price = event.target.elements['preco'].value;
        const dto = {};
        if(name) dto.name = name;
        if(description) dto.description = description;
        if(urlImage) dto.urlImage = urlImage;
        if(price) dto.price = parseFloat(price);
        if(category) dto.category = category;

        const result = await productsConnection.putProducts(id, dto);
        alert(result.message);
    } catch(error) {
        throw error;
    }
}