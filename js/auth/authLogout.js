import { authConnection } from "../connectionAPI/authConnection.js";
import decodeTokenPayload from "./decodeToken.js";

export default async function authLogout() {
    try {
        const payload = decodeTokenPayload();
        const id = payload.id;
        const dto = JSON.parse(sessionStorage.getItem("loginUser"));
        await authConnection.logout(id, dto);
    } catch(error) {
        throw error;
    }
}