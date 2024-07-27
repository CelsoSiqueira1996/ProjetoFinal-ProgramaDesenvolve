export default function conferirSenhas(campo) {
    const confirmarSenha = campo.value;
    const senha = document.querySelector("#senha").value;
    if(confirmarSenha != senha) {
        campo.setCustomValidity("Senhas diferem!");
    }
}