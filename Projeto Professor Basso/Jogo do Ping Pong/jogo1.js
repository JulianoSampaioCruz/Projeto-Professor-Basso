// Seleciona os elementos
const tela = document.getElementById('tela');
const raqueteEsquerda = document.getElementById('raquete-esquerda');
const raqueteDireita = document.getElementById('raquete-direita');
const bola = document.getElementById('bola');
const botaoIniciar = document.getElementById('botao-iniciar');
const botaoDificuldade = document.getElementById('botao-dificuldade'); // Novo botão de dificuldade

// Variáveis de jogo
let posicaoRaqueteEsquerda = 160;
let posicaoRaqueteDireita = 160;
let posicaoBolaX = 390;
let posicaoBolaY = 190;
let velocidadeBolaX = 2;
let velocidadeBolaY = 2;
let velocidadeRaquete = 5;
let jogoIniciado = false;

// Função para iniciar o jogo e mover a bola em direção aleatória
function iniciarJogo() {
  if (!jogoIniciado) {
    // Define uma direção aleatória para a bola
    velocidadeBolaX = Math.random() < 0.5 ? velocidadeBolaX : -velocidadeBolaX;
    velocidadeBolaY = Math.random() < 0.5 ? velocidadeBolaY : -velocidadeBolaY;
    jogoIniciado = true;
    botaoIniciar.style.display = 'none'; // Esconde o botão após iniciar o jogo
  }
}

// Função para aumentar a dificuldade
function aumentarDificuldade() {
  velocidadeBolaX *= 2; // Dobra a velocidade da bola no eixo X
  velocidadeBolaY *= 2; // Dobra a velocidade da bola no eixo Y
  velocidadeRaquete *= 2; // Dobra a velocidade das raquetes
  console.log("Dificuldade aumentada! Velocidade da bola e das raquetes dobrada.");
}

// Evento de clique no botão "Iniciar"
botaoIniciar.addEventListener('click', iniciarJogo);

// Evento de clique no botão "Dificuldade"
botaoDificuldade.addEventListener('click', aumentarDificuldade);

// Controle das raquetes com o teclado
document.addEventListener('keydown', (evento) => {
  switch(evento.key) {
    case 'w': // Tecla "W" para mover a raquete esquerda para cima
      if (posicaoRaqueteEsquerda > 0) posicaoRaqueteEsquerda -= velocidadeRaquete;
      break;
    case 's': // Tecla "S" para mover a raquete esquerda para baixo
      if (posicaoRaqueteEsquerda < 320) posicaoRaqueteEsquerda += velocidadeRaquete;
      break;
    case 'ArrowUp': // Tecla "Seta para cima" para mover a raquete direita para cima
      if (posicaoRaqueteDireita > 0) posicaoRaqueteDireita -= velocidadeRaquete;
      break;
    case 'ArrowDown': // Tecla "Seta para baixo" para mover a raquete direita para baixo
      if (posicaoRaqueteDireita < 320) posicaoRaqueteDireita += velocidadeRaquete;
      break;
  }
});

// Atualiza a posição da bola e verifica colisões
function atualizarJogo() {
  if (jogoIniciado) {
    // Move a bola
    posicaoBolaX += velocidadeBolaX;
    posicaoBolaY += velocidadeBolaY;

    // Colisão com as bordas superior e inferior
    if (posicaoBolaY <= 0 || posicaoBolaY >= 380) {
      velocidadeBolaY *= -1;
    }

    // Colisão com as raquetes
    if (
      posicaoBolaX <= 30 &&
      posicaoBolaY >= posicaoRaqueteEsquerda &&
      posicaoBolaY <= posicaoRaqueteEsquerda + 80
    ) {
      velocidadeBolaX *= -1;
    }
    
    if (
      posicaoBolaX >= 750 &&
      posicaoBolaY >= posicaoRaqueteDireita &&
      posicaoBolaY <= posicaoRaqueteDireita + 80
    ) {
      velocidadeBolaX *= -1;
    }

    // Verifica se a bola saiu da tela (reinicia o jogo)
    if (posicaoBolaX < 0 || posicaoBolaX > 780) {
      // Reinicia as posições e velocidade da bola
      posicaoBolaX = 390;
      posicaoBolaY = 190;
      velocidadeBolaX = 2;
      velocidadeBolaY = 2;
      velocidadeRaquete = 5;
      jogoIniciado = false;
      botaoIniciar.style.display = 'block'; // Exibe o botão para reiniciar
    }
  }

  // Atualiza as posições dos elementos na tela
  raqueteEsquerda.style.top = posicaoRaqueteEsquerda + 'px';
  raqueteDireita.style.top = posicaoRaqueteDireita + 'px';
  bola.style.left = posicaoBolaX + 'px';
  bola.style.top = posicaoBolaY + 'px';

  requestAnimationFrame(atualizarJogo);
}

// Inicia o loop do jogo
atualizarJogo();