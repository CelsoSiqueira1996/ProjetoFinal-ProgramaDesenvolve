import deleteExpiredTokens from "../auth/deleteExpiredTokens.js";
import "../logar/checkUserLog.js";
import "../logar/desconectarUsuario.js";
import { modalCarregamento } from "../modalCarregamento.js";

const btnDeletarTokens = document.querySelector(".botao__deletar-token");

btnDeletarTokens.addEventListener("click", async () => {
    try {
        modalCarregamento.mostrarModalCarregamento();
        await deleteExpiredTokens();
        modalCarregamento.esconderModalCarregamento();
    } catch(error) {
        modalCarregamento.esconderModalCarregamento();
        alert(error);
    }
})










