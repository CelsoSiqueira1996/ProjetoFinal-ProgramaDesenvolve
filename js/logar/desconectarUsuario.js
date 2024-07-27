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
        await authLogout();
        btnUsuarioLogado.querySelector("p").textContent = "";
        esconderElementoLog(btnUsuarioLogado);
        aparecerElementoLog(btnUsuario);
        sessionStorage.clear();
        if(window.location.pathname == '/pages/products/admin.html') location.pathname = "index.html";
        gerarMensagemSucesso("sair");
    } catch(error) {
        alert(error);
    }
});
