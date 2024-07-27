import decodeTokenPayload from "../auth/decodeToken.js";
import getAccessToken from "../auth/getAccessToken.js";

async function login(dto) {
    const connection = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-type": "application/json"},
        body: JSON.stringify(dto)
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }

    return convertedConnection;
}

async function logout(id, dto) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/auth/logout/id/${id}`, {
        method: "POST",
        headers: {"Content-type": "application/json", "authorization": accessToken},
        body: JSON.stringify(dto)
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
}

export const authConnection = {
    login,
    logout
};