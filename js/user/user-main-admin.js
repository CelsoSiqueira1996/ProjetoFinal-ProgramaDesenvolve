import decodeTokenPayload from "../auth/decodeToken.js";
import "../logar/checkUserLog.js";
import disconnetUser from "../logar/desconectarUsuario.js";
import { deleteUser } from "./crud/user-delete.js";
import { searchUser } from "./crud/user-search.js";
import { updateUser } from "./crud/user-update.js";

const formularioDeletarUsuario = document.querySelector(".deletar-usuario");
const formularioAtualizarUsuario = document.querySelector(".atualizar-usuario");
const formularioProcurarUsuario = document.querySelector(".procurar-usuario");
const formularios = document.querySelectorAll(".formulario-user");
const btnCrud = document.querySelectorAll(".botao__crud-usuario");
const camposFormulario = document.querySelectorAll("[data-formulario]");
const btnRadios = document.querySelectorAll("[type=radio]");
const mensagensErro = document.querySelectorAll(".mensagem-erro");
const list = document.querySelector(".user__container");

btnCrud.forEach((btn) => {
    btn.addEventListener("click", () => {
        const escope = btn.parentNode.parentNode;
        camposFormulario.forEach((campo) => {
            if(escope == campo.parentNode.parentNode) {
                verificaCampoFormulario(campo);
            }
        })
    })
})

btnRadios.forEach((btn) => {
    btn.addEventListener("change", resetForms);
})

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampoFormulario(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

formularioProcurarUsuario.addEventListener("submit", async (event) => {
    try{
        await searchUser.searchUserAdmin(event);
    } catch(error) {
        alert(error);
    }
});

formularioDeletarUsuario.addEventListener("submit", async (event) => {
    try{
        await deleteUser.deleteUserAdmin(event);
        const payload = decodeTokenPayload();
        const idCurrentUser = payload.id;
        if(event.target.elements["id-usuario"].value == idCurrentUser) {
            await disconnetUser();
        }
        resetForms();
    } catch(error) {
        alert(error);
    }
});

formularioAtualizarUsuario.addEventListener("submit", async (event) => {
    try{
        await updateUser.updateUserAdmin(event);
        resetForms();
    } catch(error) {
        alert(error);
    }
});

const erros = [
    "typeMismatch",
    "tooShort",
    "patternMismatch",
    "valueMissing"
];

const mensagens = {
    nome: {
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    "id-usuario": {
        valueMissing: "O campo id não pode estar vazio."
    },
    permissao : {
        patternMismatch: "Por favor, preencha uma permissão válida (admin/user).",
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

function resetForms() {
    formularios.forEach((form) => {
        form.reset();
    });
    mensagensErro.forEach((mensagem) => {
        mensagem.textContent = "";
    });
    if(list.childElementCount > 0) {
        list.innerHTML = "";
    }
}