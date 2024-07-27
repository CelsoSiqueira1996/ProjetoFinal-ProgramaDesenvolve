const barraPesquisa = document.querySelector(".banner__pesquisa");
const btnPesquisa = document.querySelector(".btn__pesquisa");

barraPesquisa.addEventListener("keydown", (event) => {
    if(event.code === "NumpadEnter" || event.code === "Enter") {
        const filter = barraPesquisa.value;
        if(!filter) {
            return;
        }
        barraPesquisa.value = "";
        window.location = location.protocol + "//" + location.host + `/pages/products/search.html?q=${filter}`;
    }
});


btnPesquisa.addEventListener("click", () => {
    const filter = barraPesquisa.value;
    if(!filter) {
        return;
    }
    barraPesquisa.value = "";
    window.location = location.protocol + "//" + location.host + `/pages/products/search.html?q=${filter}`;
});


