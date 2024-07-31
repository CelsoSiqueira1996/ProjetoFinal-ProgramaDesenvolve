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
const fieldIdUpdateUser = document.querySelector(".atualizar-usuario #id-usuario");
const updateFields = document.querySelectorAll(".atualizar-usuario [data-formulario]");
const searchFields = document.querySelectorAll(".procurar-usuario [disabled]");
const fieldIdSearchUser = document.querySelector(".procurar-usuario #id-usuario");

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

fieldIdSearchUser.addEventListener("click", () => clearPlaceholderFields(searchFields));
fieldIdUpdateUser.addEventListener("click", () => clearPlaceholderFields(updateFields))

fieldIdUpdateUser.addEventListener("blur", async () => {
    const id = fieldIdUpdateUser.value;
    try{
        await searchUser.searchUserId(id, updateFields);
    } catch(error) {
        clearPlaceholderFields(updateFields);
        alert(error);
    }
})

btnRadios.forEach((btn) => {
    btn.addEventListener("change", () => {
        clearPlaceholderFields(updateFields);
        clearPlaceholderFields(searchFields);
        resetForms();
    });
})

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampoFormulario(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

formularioProcurarUsuario.addEventListener("submit", async (event) => {
    try{
        await searchUser.searchUserAdmin(event, searchFields);
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
        clearPlaceholderFields(updateFields);
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
    email: {
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    "id-usuario": {
        valueMissing: "O campo id não pode estar vazio."
    },
    permission : {
        patternMismatch: "Por favor, preencha uma permissão válida (admin/user).",
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

function clearPlaceholderFields(campos) {
    campos.forEach((campo) => {
        campo.removeAttribute("placeholder");
        if(campo.hasAttribute("disabled")) campo.parentNode.style.display = "none";
    });
}
