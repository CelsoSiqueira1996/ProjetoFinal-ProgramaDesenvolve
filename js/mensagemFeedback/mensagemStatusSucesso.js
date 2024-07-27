const divMensagemSucesso = document.querySelector(".mensagem__feedback-sucesso");
const mensagemSucesso = document.querySelector(".mensagem-sucesso");

export default function gerarMensagemSucesso(etiqueta) {
    const mensagemSucessoTexto = document.createElement("p");
    mensagemSucessoTexto.classList.add("mensagem-sucesso__texto");

    switch (etiqueta) {
        case "entrar":
            mensagemSucessoTexto.textContent = "Login realizado com sucesso!";
        break;
        case "cadastrar":
            mensagemSucessoTexto.textContent = "Cadastro realizado com sucesso!";
        break;
        case "sair":
            mensagemSucessoTexto.textContent = "Logout realizado com sucesso!";
        break;
        default:
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