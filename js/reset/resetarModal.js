const modal = document.querySelector(".modal");
const mensagensErro = document.querySelectorAll(".mensagem-erro");
const campoConfirmarSenha = document.querySelector(".campo__confirmar-senha");
const formularioNovoUsuario = document.querySelector(".formulario__registrar");
const formularioLogin = document.querySelector(".formulario__entrar");

export default function resetarModal() {
    formularioLogin.reset();
    formularioNovoUsuario.reset();
    mensagensErro.forEach((mensagem) => {
        mensagem.textContent = "";
    });
    campoConfirmarSenha.style.display = "none";
    modal.style.display = "none";
}