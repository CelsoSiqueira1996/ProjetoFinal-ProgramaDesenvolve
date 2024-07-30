import { userConnection } from "../../connectionAPI/usersConnection.js";

async function deleteUserAdmin(event) {
    try{
        event.preventDefault();
        const id = event.target.elements["id-usuario"].value;
        const result = await userConnection.deleteUser(id);

        alert(result.message);
    } catch(error) {
        throw error;
    }
}

async function deleteUserId(id) {
    try{
        const result = await userConnection.deleteUser(id);

        alert(result.message);
    } catch(error) {
        throw error;
    }
}

export const deleteUser = {
    deleteUserAdmin,
    deleteUserId
}