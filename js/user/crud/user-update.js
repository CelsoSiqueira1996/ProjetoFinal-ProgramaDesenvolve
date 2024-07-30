import { userConnection } from "../../connectionAPI/usersConnection.js";
import { searchUser } from "./user-search.js";

async function updateUserAdmin(event) {
    try{
        event.preventDefault();
        const id = event.target.elements["id-usuario"].value;
        const email = event.target.elements["email"].value;
        const permission = event.target.elements["permission"].value;
        const street = event.target.elements["street"].value; 
        const district = event.target.elements["district"].value;
        const number = event.target.elements["number"].value; 
        const cellphone = event.target.elements["cellphone"].value;

        const dto = {};
        if(email) dto.email = email;
        if(permission) dto.permission = permission;
        if(street) dto.street = street;
        if(district) dto.district = district;
        if(number) dto.number = number;
        if(cellphone) dto.cellphone = cellphone;
        const result = await userConnection.updateUser(id, dto);
        alert(result.message);
    } catch(error) {
        throw error;
    }

}

async function updateUserId(event, id, campos) {
    try{
        event.preventDefault();
        const email = event.target.elements["email"].value;
        const street = event.target.elements["street"].value; 
        const district = event.target.elements["district"].value;
        const number = event.target.elements["number"].value; 
        const cellphone = event.target.elements["cellphone"].value;

        const dto = {};
        if(email) dto.email = email;
        if(street) dto.street = street;
        if(district) dto.district = district;
        if(number) dto.number = number;
        if(cellphone) dto.cellphone = cellphone;
        const result = await userConnection.updateUser(id, dto);
        await searchUser.searchUserId(id, campos);

        alert(result.message);
    } catch(error) {
        throw error;
    }

}

export const updateUser = {
    updateUserAdmin,
    updateUserId
}