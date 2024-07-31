import createProduct from "./crud/products-create.js";
import deleteProduct from "./crud/products-delete.js";
import { searchProducts } from "./crud/products-search.js";
import updateProduct from "./crud/products-update.js";
import "../logar/checkUserLog.js";
import "../logar/desconectarUsuario.js";
import { modalCarregamento } from "../modalCarregamento.js";

const formularioAdicionarProduto = document.querySelector(".adicionar-produtos");
const formularioDeletarProduto = document.querySelector(".deletar-produtos");
const formularioAtualizarProduto = document.querySelector(".atualizar-produtos");
const formularioProcurarProduto = document.querySelector(".procurar-produtos");
const formularios = document.querySelectorAll(".formulario-products");
const btnCrud = document.querySelectorAll(".botao__crud-produtos");
const camposFormulario = document.querySelectorAll("[data-formulario]");
const btnRadios = document.querySelectorAll("[type=radio]");
const mensagensErro = document.querySelectorAll(".mensagem-erro");
const list = document.querySelector(".products__container");

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

formularioAdicionarProduto.addEventListener("submit", async (event) => {
    try{
        modalCarregamento.mostrarModalCarregamento();
        await createProduct(event);
        resetForms();
        modalCarregamento.esconderModalCarregamento();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);

    }
});

formularioProcurarProduto.addEventListener("submit", async (event) => {
    try{
        modalCarregamento.mostrarModalCarregamento();
        await searchProducts.searchProductById(event);
        modalCarregamento.esconderModalCarregamento();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);
    }
});

formularioDeletarProduto.addEventListener("submit", async (event) => {
    try{
        modalCarregamento.mostrarModalCarregamento();
        await deleteProduct(event);
        resetForms();
        modalCarregamento.esconderModalCarregamento();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);
    }
});

formularioAtualizarProduto.addEventListener("submit", async (event) => {
    try{
        modalCarregamento.mostrarModalCarregamento();
        await updateProduct(event);
        resetForms();
        modalCarregamento.esconderModalCarregamento();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);
    }
});

const erros = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch"
];

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio."
    },
    descricao: {
        valueMissing: "O campo de descrição não pode estar vazio."
    },
    "url-imagem": {
        valueMissing: "O campo de url não pode estar vazio.",
        typeMismatch: "Insira uma url válida."
    },
    categoria: {
        valueMissing: "O campo de categoria não pode estar vazio.",
        patternMismatch: "As categorias devem ser separadas por ;"
    },
    preco: {
        valueMissing: "O campo de preço não pode estar vazio.",
        patternMismatch: "O preço deve seguir o seguinte padrão: 0.00"
    },
    "id-produto": {
        valueMissing: "O campo id não pode estar vazio."
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