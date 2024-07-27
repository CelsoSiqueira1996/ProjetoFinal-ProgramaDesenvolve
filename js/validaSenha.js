export default function ehSenhaValida(campo) {
    const senha = campo.value;
    const mensagemErro = campo.parentNode.querySelector(".mensagem-erro");
    const listaErros = [...mensagemErro.children];
    if(listaErros.length == 0) {
        mensagemErro.textContent = "O campo não pode estar vazio.";
    } else {
        listaErros.forEach((elemento) => {
            switch (elemento.className) {
                case "muito-curta":
                    elemento.style.color = (senha.length >= 8)? "#33dfaa" : "red";
                    break;
                case "letra-maiuscula":
                    elemento.style.color = (senha.match(/(?=.*[A-Z])/g))? "#33dfaa" : "red";
                break;
                case "letra-minuscula":
                    elemento.style.color = (senha.match(/(?=.*[a-z])/g))? "#33dfaa" : "red";
                break;
                case "caractere-especial":
                    elemento.style.color = (senha.match(/(?=.*\W)/g))? "#33dfaa" : "red";
                break;
                case "muito-longa":
                    elemento.style.color = (senha.length <= 20)? "#33dfaa" : "red";
                break; 
                case "numero":
                    elemento.style.color = (senha.match(/(?=.*\d)/g))? "#33dfaa" : "red";
                break;        
                default:
                    break;
            };
        });
        const campoConfirmarSenha = document.querySelector(".campo__confirmar-senha");
        if(campo.checkValidity()) {
            campoConfirmarSenha.style.display = "block";
        } else {
            campoConfirmarSenha.style.display = "none";
        }
    }

}
