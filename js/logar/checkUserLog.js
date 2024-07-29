import decodeTokenPayload from "../auth/decodeToken.js";

const btnProdutos = document.querySelector(".botao__produtos");
const btnUsuarios =  document.querySelector(".botao__usuarios");

btnProdutos.addEventListener("click", () => {
    window.location = location.protocol + "//" + location.host + '/pages/products/admin.html';
});

btnUsuarios.addEventListener("click", () => {
     window.location = location.protocol + "//" + location.host + '/pages/users/admin.html';
});

function checkUserLog() {
    if(sessionStorage.getItem("loginUser")) {
        const payload = decodeTokenPayload();
        const permission = payload.permission;
        const nomeUsuario = payload.name;
        const primeiroNomeUsuarioLogado = nomeUsuario.trim().split(" ")[0];
        usuarioLogado(primeiroNomeUsuarioLogado, permission);
    } else {
        const btnUsuario = document.querySelector("#pagina__inicial");
        const btnUsuarioLogado = document.querySelector("#usuario__logado");
        btnUsuario.style.display = "flex";
        btnUsuarioLogado.style.display = "none";
    }
}

export default function usuarioLogado(nome, permission) {
    const btnUsuario = document.querySelector("#pagina__inicial");
    const btnUsuarioLogado = document.querySelector("#usuario__logado");
    const btnUsuarioLogadoTexto = btnUsuarioLogado.querySelector("p");
    btnUsuario.style.display = "none";
    btnUsuarioLogadoTexto.textContent = `Olá, ${nome}!`
    btnUsuarioLogado.style.display = "flex";
    if(permission == "admin") {
        btnProdutos.style.display = "block";
        btnUsuarios.style.display = "block";
    }
}

checkUserLog();