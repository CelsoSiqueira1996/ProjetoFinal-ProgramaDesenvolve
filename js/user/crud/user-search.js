import { userConnection } from "../../connectionAPI/usersConnection.js";
import showUsers from "../showUsers.js";

async function searchUserAdmin(event) {
    try{
        event.preventDefault();
        const id = event.target.elements["id-usuario"].value;
        const result = await userConnection.getUserById(id);

        showUsers(result);

    } catch(error) {
        throw error;
    }
}

export const searchUser = {
    searchUserAdmin
}