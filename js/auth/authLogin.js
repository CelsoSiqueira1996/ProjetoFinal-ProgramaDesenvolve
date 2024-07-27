import { authConnection } from "../connectionAPI/authConnection.js";

export default async function authLogin(event) {
    try {
        event.preventDefault();
        const dto = {
            cpf: event.target.elements['cpf__logar'].value.replace(/\.|-/g, ""),
            password: event.target.elements['senha__logar'].value
        };
        const result = await authConnection.login(dto);
        result.accessToken = `Bearer ${result.accessToken}`;
        sessionStorage.setItem("loginUser", JSON.stringify(result));
    } catch(error) {
        throw error;
    }
}