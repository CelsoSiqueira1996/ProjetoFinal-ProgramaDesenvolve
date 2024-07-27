import resetarModal from "./reset/resetarModal.js";

const modal = document.querySelector(".modal");
const loginUsuario = document.querySelector("#pagina__inicial");
const registrarUsuario = document.querySelector(".formulario__texto__novo-usuario");
const formularioNovoUsuario = document.querySelector(".formulario__registrar");
const formularioLogin = document.querySelector(".formulario__entrar");
const logarUsuario = document.querySelector(".formulario__texto__login");
const btnFecharModal = document.querySelector(".fechar");
const mensagensErro = document.querySelectorAll(".mensagem-erro");
const campoConfirmarSenha = document.querySelector(".campo__confirmar-senha");

function apagarMensagensErro() {
    mensagensErro.forEach((mensagem) => {
        mensagem.textContent = "";
    })
}

function resetarFormulario(formulario) {
    formulario.reset();
}

function esconderElemento(elemento) {
    elemento.style.display = "none";
}

function aparecerElemento(elemento) {
    elemento.style.display = "block";
}

loginUsuario.addEventListener("click", () => {
    aparecerElemento(modal);
    esconderElemento(formularioNovoUsuario);
    aparecerElemento(formularioLogin);
});

window.addEventListener("click", (evento) => {
    if(evento.target == modal) {
        resetarModal();
    }
});

registrarUsuario.addEventListener("click", () => {
    esconderElemento(formularioLogin);
    esconderElemento(campoConfirmarSenha);
    resetarFormulario(formularioLogin);
    apagarMensagensErro();
    aparecerElemento(formularioNovoUsuario);
});

logarUsuario.addEventListener("click", () => {
    resetarFormulario(formularioNovoUsuario);
    apagarMensagensErro();
    esconderElemento(campoConfirmarSenha);
    esconderElemento(formularioNovoUsuario);
    aparecerElemento(formularioLogin);
});

registrarUsuario.addEventListener("mouseover", () => {
    registrarUsuario.setAttribute(
        "style",
        "text-decoration: underline; cursor: pointer; color: green" 
    );
});

registrarUsuario.addEventListener("mouseout", () => {
    registrarUsuario.removeAttribute("style");
});

logarUsuario.addEventListener("mouseover", () => {
    logarUsuario.setAttribute(
        "style",
        "text-decoration: underline; cursor: pointer; color: green" 
    );
});

logarUsuario.addEventListener("mouseout", () => {
    logarUsuario.removeAttribute("style");
});

btnFecharModal.addEventListener('click', () => {
    resetarModal()
});