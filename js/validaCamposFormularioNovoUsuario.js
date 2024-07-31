import ehMaiorDeIdade from "./validaIdade.js";
import ehSenhaValida from "./validaSenha.js";
import conferirSenhas from "./verificaSenha.js";
import ehUmCpfValido from "./validaCpf.js";
import resetarModal from "./reset/resetarModal.js";
import gerarMensagemSucesso from "./mensagemFeedback/mensagemStatusSucesso.js";
import createUser from "./user/crud/user-create.js";

const formularioNovoUsuario = document.querySelector(".formulario__registrar");
const camposFormulario = formularioNovoUsuario.querySelectorAll("[required]");
const campoSenhaCadastrar = document.querySelector("#senha");
const btnCadastrar = document.querySelector(".botao__cadastrar-usuario");

btnCadastrar.addEventListener("click", () => {
    camposFormulario.forEach((campo) => verificaCampoFormulario(campo));
});

camposFormulario.forEach((campo) => {
    campo.addEventListener("blur", () => verificaCampoFormulario(campo));
    campo.addEventListener("invalid", (evento) => evento.preventDefault());
});

campoSenhaCadastrar.addEventListener("focus", () => {
    const mensagemErro = campoSenhaCadastrar.parentNode.querySelector(".mensagem-erro");
    if(!mensagemErro.innerHTML || mensagemErro.textContent == "O campo não pode estar vazio."){
        mensagemErro.innerHTML = `
        <p class="muito-curta">Senha deve conter no mínimo 8 caracteres.</p>
        <p class="letra-maiuscula">Senha deve conter ao menos uma letra maiúscula.</p>
        <p class="letra-minuscula">Senha deve conter ao menos uma letra minúscula.</p>
        <p class="numero">Senha deve conter no menos um número.</p>
        <p class="caractere-especial">Senha deve conter ao menos um caractere</p>
        <p class="muito-longa">Senha deve conter no máximo 20 caracteres.</p>
        `
    }
});

campoSenhaCadastrar.addEventListener("input", () => verificaCampoFormulario(campoSenhaCadastrar));

formularioNovoUsuario.addEventListener("submit", async (event) => {
    try{
        await createUser(event);
        resetarModal();
        gerarMensagemSucesso("cadastrar");
    } catch(error) {
        alert(error);
        resetarModal();
    }
});

const erros = [
    "customError",
    "valueMissing",
    "typeMismatch",
    "tooShort",
    "patternMismatch"
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um e-mail válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caracteres suficientes."
    },
    "data-nascimento": {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior de 18 anos para se cadastrar.'
    },
    "confirmar-senha": {
        valueMissing: 'O campo não pode estar vazio.',
        customError: 'As senhas informadas diferem entre si.'
    },
}

function verificaCampoFormulario(campo) {
    let mensagem = "";
    campo.setCustomValidity("");
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");

    if(campo.id == "cpf" && campo.value.length >= 11) {
        ehUmCpfValido(campo);
    } else if(campo.id == "data-nascimento" && campo.value != "") {
        ehMaiorDeIdade(campo);
    } else if(campo.id == "senha"){
        ehSenhaValida(campo);
        return;
    } else if (campo.id == "confirmar-senha") {
        conferirSenhas(campo);
    }

    if(mensagem == "") {
        erros.forEach((erro) => {
            if(campo.validity[erro]) {
                mensagem = mensagens[campo.id][erro];
            }
        });
    }

    mensagemErro.textContent = mensagem;
}

