import authLogout from "../auth/authLogout.js";
import gerarMensagemSucesso from "../mensagemFeedback/mensagemStatusSucesso.js";

const btnUsuario = document.querySelector("#pagina__inicial");
const btnUsuarioLogado = document.querySelector("#usuario__logado");
const btnListaUsuarioLogado = document.querySelector(".botoes__usuario-logado");
const btnSair = document.querySelector(".botao__sair");

function esconderElementoLog(elemento) {
    elemento.style.display = "none";
}

function aparecerElementoLog(elemento) {
    elemento.style.display = "flex";
}

btnUsuarioLogado.addEventListener("click", () => {
    btnListaUsuarioLogado.style.display = (btnListaUsuarioLogado.style.display == "flex")? "none" : "flex";
});

btnUsuarioLogado.addEventListener("blur", () => {
    btnListaUsuarioLogado.style.display = "none";
});

btnSair.addEventListener("click", async () => {
    try{
        await disconnetUser();
    } catch(error) {
        alert(error);
    }
});

export default async function disconnetUser() {
    await authLogout();
    btnUsuarioLogado.querySelector("p").textContent = "";
    esconderElementoLog(btnUsuarioLogado);
    aparecerElementoLog(btnUsuario);
    sessionStorage.clear();
    window.location.href = location.protocol + "//" + location.host + "/index.html?logout";
}

if(window.location.search.includes("logout")) gerarMensagemSucesso("sair");