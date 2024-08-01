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

async function logout(dto) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/auth/logout`, {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "authorization": accessToken
        },
        body: JSON.stringify(dto)
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
}

async function deleteExpiredTokens() {
    const accessToken = getAccessToken();
    const connection = await fetch("http://localhost:3000/auth/tokens", {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "authorization": accessToken
        }
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
    return convertedConnection;
}

export const authConnection = {
    login,
    logout,
    deleteExpiredTokens
};