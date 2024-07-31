import { userConnection } from "../../connectionAPI/usersConnection.js";
import showUserCart from "../showUserCart.js";
import showUsers from "../showUsers.js";

async function searchUserAdmin(event, campos) {
    try{
        event.preventDefault();
        const id = event.target.elements["id-usuario"].value;
        const result = await userConnection.getUserById(id);

        showUsers(result, campos);

    } catch(error) {
        throw error;
    }
}

async function searchUserId(id, campos) {
    try {
        const result = await userConnection.getUserById(id);
        showUsers(result, campos)

    } catch(error) {
        throw error;
    }

}

async function searchUserIdForCart(id) {
    try {
        const result = await userConnection.getUserById(id);
        showUserCart(result.cart);
    } catch(error) {
        throw error;
    }
}

export const searchUser = {
    searchUserAdmin,
    searchUserId,
    searchUserIdForCart
}