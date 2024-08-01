import { authConnection } from "../connectionAPI/authConnection.js"

export default async function deleteExpiredTokens() {
    try {
        const result = await authConnection.deleteExpiredTokens();
        alert(result.message);
    } catch(error) {
        throw error;
    }
}