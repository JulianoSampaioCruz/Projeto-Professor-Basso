let palavra = "", letrasChutadas = [], erros = 0, maxErros = 6, tempo = 60, intervalo;
const palavras = ["javascript", "css", "html", "frontend", "desenvolvedor", "fabio", "basso", "engenharia", "software", "sistemas", "distribuidos"];

function iniciarJogo() {
    erros = 0;
    letrasChutadas = [];
    palavra = palavras[Math.floor(Math.random() * palavras.length)];
    document.getElementById("result").innerText = "";
    document.getElementById("mistakes").innerText = erros;
    document.getElementById("wordDisplay").innerText = "_ ".repeat(palavra.length).trim();
    document.getElementById("guess").disabled = false;
    document.querySelector(".input-section button").disabled = false;

    tempo = 60;
    document.getElementById("timer").innerText = tempo;
    clearInterval(intervalo);
    intervalo = setInterval(atualizarTempo, 1000);
}

function chutarLetra() {
    let letra = document.getElementById("guess").value.toLowerCase();
    document.getElementById("guess").value = "";

    if (!letra || letrasChutadas.includes(letra) || !/^[a-z]$/.test(letra)) return;

    letrasChutadas.push(letra);
    if (palavra.includes(letra)) {
        let exibicao = [...palavra].map(l => (letrasChutadas.includes(l) ? l : "_")).join(" ");
        document.getElementById("wordDisplay").innerText = exibicao;
        if (!exibicao.includes("_")) encerrarJogo("Você Ganhou!");
    } else {
        document.getElementById("mistakes").innerText = ++erros;
        if (erros >= maxErros) encerrarJogo(`Game Over! A palavra era "${palavra}".`);
    }
}

function atualizarTempo() {
    document.getElementById("timer").innerText = --tempo;
    if (tempo <= 0) encerrarJogo(`Tempo Esgotado! A palavra era "${palavra}".`);
}

function encerrarJogo(mensagem) {
    clearInterval(intervalo);
    document.getElementById("result").innerText = mensagem;
    document.getElementById("guess").disabled = true;
    document.querySelector(".input-section button").disabled = true;
}
