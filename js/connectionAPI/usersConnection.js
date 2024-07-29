import getAccessToken from "../auth/getAccessToken.js";

async function postUser(dto) {
    const connection = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {"Content-type" : "application/json"},
        body: JSON.stringify(dto)
    });
    const convertedConnection = await connection.json();
    if(!connection.ok) {
        throw new Error(convertedConnection.message);
    }
}

async function deleteUser(id) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/users/id/${id}`, {
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

async function updateUser(id, dto) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/users/id/${id}`, {
        method: "PUT",
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
    return convertedConnection;
}

async function getUserById(id) {
    const accessToken = getAccessToken();
    const connection = await fetch(`http://localhost:3000/users/id/${id}`, {
        method: "GET",
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

export const userConnection = {
    postUser,
    deleteUser,
    updateUser,
    getUserById
};