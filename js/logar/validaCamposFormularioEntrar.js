import usuarioLogado from "./checkUserLog.js";
import resetarModal from "../reset/resetarModal.js";
import gerarMensagemSucesso from "../mensagemFeedback/mensagemStatusSucesso.js";
import authLogin from "../auth/authLogin.js";
import decodeTokenPayload from "../auth/decodeToken.js";

const formularioEntrar = document.querySelector(".formulario__entrar");
const camposFormulario = formularioEntrar.querySelectorAll("[required]");
const btnLogar = document.querySelector(".botao__logar");
const mensagemErroUsuario = document.querySelector(".mensagem-erro__logar");

btnLogar.addEventListener("click", () => {
    camposFormulario.forEach((campo) => verificaCampoFormulario(campo));
});

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => { 
        verificaCampoFormulario(campo)
        mensagemErroUsuario.textContent = "";
    });
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

formularioEntrar.addEventListener("submit", async (event) => {
    try{
        await authLogin(event);
        const payload = decodeTokenPayload();
        const permission = payload.permission;
        const nomeUsuario = payload.name;
        const primeiroNomeUsuarioLogado = nomeUsuario.trim().split(" ")[0];
        resetarModal();
        gerarMensagemSucesso("entrar");
        usuarioLogado(primeiroNomeUsuarioLogado, permission);
        if(window.location.search.includes("logout")) window.location.search = location.protocol + "//" + location.host + "/index.html";
    } catch(error) {
        alert(error);
        resetarModal();
    }
});

const mensagens = {
    cpf__logar: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
    },
    senha__logar: {
        valueMissing: 'O campo não pode estar vazio.',
    },
}

function verificaCampoFormulario(campo) {
    let mensagem = "";
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro")
    if(campo.validity.valueMissing) {
        mensagem = mensagens[campo.id].valueMissing;
    }

    mensagemErro.textContent = mensagem;
}

