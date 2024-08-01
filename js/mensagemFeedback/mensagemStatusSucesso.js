const divMensagemSucesso = document.querySelector(".mensagem__feedback-sucesso");
const mensagemSucesso = document.querySelector(".mensagem-sucesso");

export default function gerarMensagemSucesso(mensagem) {
    const mensagemSucessoTexto = document.createElement("p");
    mensagemSucessoTexto.classList.add("mensagem-sucesso__texto");

    switch (mensagem) {
        case "entrar":
            mensagemSucessoTexto.textContent = "Login realizado com sucesso!";
        break;
        case "cadastrar":
            mensagemSucessoTexto.textContent = "Cadastro realizado com sucesso!";
        break;
        default:
            mensagemSucessoTexto.textContent = mensagem;
            break;
    }

    while(mensagemSucesso.childElementCount > 1 ) {
        mensagemSucesso.removeChild(mensagemSucesso.firstChild);
    }

    mensagemSucesso.insertBefore(mensagemSucessoTexto, mensagemSucesso.firstChild);
    divMensagemSucesso.classList.add("show");
    
    setTimeout(() => {
        divMensagemSucesso.classList.remove("show");
    }, 4000);

}