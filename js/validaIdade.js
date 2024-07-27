export default function ehMaiorDeIdade(campo) {
    const dataNascimento = new Date(campo.value);
    const dataAtual = new Date();
    const dataMaisDezoito = new Date(dataNascimento.getUTCFullYear() + 18, dataNascimento.getUTCMonth(), dataNascimento.getUTCDate());
    if(dataMaisDezoito > dataAtual) {
        campo.setCustomValidity("Menor de idade!");
    }
}