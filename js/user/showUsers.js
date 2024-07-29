export default function showUsers(result, campos) {
    campos.forEach((campo) => {
        if(result[campo.id]) campo.setAttribute("placeholder", result[campo.id]);
        if(campo.hasAttribute("disabled")) campo.parentNode.style.display = "block";
    });
}