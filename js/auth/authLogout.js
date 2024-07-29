import { authConnection } from "../connectionAPI/authConnection.js";

export default async function authLogout() {
    try {
        const dto = JSON.parse(sessionStorage.getItem("loginUser"));
        await authConnection.logout(dto);
    } catch(error) {
        throw error;
    }
}