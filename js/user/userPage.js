import "../logar/checkUserLog.js";
import disconnetUser from "../logar/desconectarUsuario.js";
import { modalCarregamento } from "../modalCarregamento.js";
import { deleteUser } from "./crud/user-delete.js";
import { searchUser } from "./crud/user-search.js";
import { updateUser } from "./crud/user-update.js";

const formularioAtualizarUsuario = document.querySelector(".atualizar-usuario");
const btnAtualizarUsuario = document.querySelector(".botao__atualizar-usuario");
const btnDeletarUsuario = document.querySelector(".botao__deletar-usuario");
const camposFormulario = document.querySelectorAll("[data-formulario]");
const path = window.location.href;
const idUser = path.split("?")[1];

btnAtualizarUsuario.addEventListener("click", () => {
    camposFormulario.forEach((campo) => verificaCampoFormulario(campo))
});

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampoFormulario(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

formularioAtualizarUsuario.addEventListener("submit", async (event) => {
    try{
        modalCarregamento.mostrarModalCarregamento();
        await updateUser.updateUserId(event, idUser, camposFormulario);
        formularioAtualizarUsuario.reset();
        modalCarregamento.esconderModalCarregamento();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);
    }
});

btnDeletarUsuario.addEventListener("click", async () => {
    try{
        modalCarregamento.mostrarModalCarregamento();
        await deleteUser.deleteUserId(idUser);
        modalCarregamento.esconderModalCarregamento();
        await disconnetUser();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);
    }
});

const erros = [
    "typeMismatch",
    "tooShort",
    "patternMismatch",
];

const mensagens = {
    email: {
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    cellphone: {
        patternMismatch: "Por favor, preencha um número de celular válido: (XX)XXXXX-XXXX."
    }
}

function verificaCampoFormulario(campo) {
    let mensagem = "";
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    erros.forEach((erro) => {
        if(campo.validity[erro]) {
            mensagem = mensagens[campo.id][erro];
        }
    })

    mensagemErro.textContent = mensagem;
}

await searchUser.searchUserId(idUser, camposFormulario);