import { userConnection } from "../../connectionAPI/usersConnection.js";

async function updateUserAdmin(event) {
    try{
        event.preventDefault();
        const id = event.target.elements["id-usuario"].value;
        const name = event.target.elements["nome"].value;
        const email = event.target.elements["email"].value;
        const permission = event.target.elements["permissao"].value;
        const dto = {};
        if(name) dto.name = name;
        if(email) dto.email = email;
        if(permission) dto.permission = permission;
        const result = await userConnection.updateUser(id, dto);
        alert(result.message);
    } catch(error) {
        throw error;
    }

}

export const updateUser = {
    updateUserAdmin
}