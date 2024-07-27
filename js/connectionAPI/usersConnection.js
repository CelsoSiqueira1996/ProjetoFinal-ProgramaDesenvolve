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

export const userConnection = {
    postUser
};