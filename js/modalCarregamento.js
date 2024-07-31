function mostrarModalCarregamento() {
    const body = document.querySelector("body");
    const modalCarregamento = document.createElement("div");
    modalCarregamento.classList.add("modal-carregamento");
    modalCarregamento.innerHTML = `
        <section class="modal__conteudo-carregamento">
            <div class="c-loader"></div>
        </section>
    `
}

function esconderModalCarregamento() {
    const body = document.querySelector("body");
    const modalCarregamento = document.querySelector("modal-carregamento");
    body.removeChild(modalCarregamento);
}

export const modalCarregamento = {
    mostrarModalCarregamento,
    esconderModalCarregamento
}