import { userConnection } from "../../connectionAPI/usersConnection.js";

export default async function createUser(event) {
    try {
        event.preventDefault();
        const dto = {
            name: event.target.elements["nome"].value,
            cpf: event.target.elements['cpf'].value.replace(/\.|-/g, ""),
            email: event.target.elements["email"].value,
            password: event.target.elements["senha"].value,
            birthdate: event.target.elements["data-nascimento"].value
        };
    
        await userConnection.postUser(dto);

    } catch(error) {
        throw error;
    }


}