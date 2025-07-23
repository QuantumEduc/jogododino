const dino = document.getElementById("dino");
const obstaculo = document.getElementById("obstaculo");
let isJumping = false;
let speed = 20;
const acceleration = 10;
const interval = 30;
const gameAreaWidth = document.getElementById("gameArea").offsetWidth;

//função para pulo do dinossauro
function jump(){
    if (isJumping) return;
        isJumping = true;
        dino.style.animation = "jump 0.5s ease-out";
    setTimeout(() => {
        dino.style.animation = "";
        isJumping = false;
}, 500);
}

// Detecta tecla de espaço para o pulo
document.addEventListener("keydown", function(event) {
    if (event.code === "Space") {
        jump();
    }
});

//função para movimentar obstaculo
function moveObstaculo() {
    let obstaculoPos = obstaculo.offsetLeft; 
    obstaculo.style.left = obstaculoPos - speed + "px";
        if (obstaculoPos <= -20) {
            obstaculo.style.left = gameAreaWidth + "px";
        }
    checkCollision();
}

//função para verificar colisão
function checkCollision () {
    const dinoRect = dino.getBoundingClientRect();
    const obstaculoRect = obstaculo.getBoundingClientRect();

        if(
            dinoRect.right > obstaculoRect.left &&
            dinoRect.left < obstaculoRect.right &&
            dinoRect.bottom > obstaculoRect.top &&
            dinoRect.top < obstaculoRect.bottom
        ){
            alert("Você Perdeu");
            clearInterval(gameInterval);
            clearInterval(speedInterval);
        }
}

//função para aumentar velocidade do obstaculo
function increaseSpeed() {
    speed += acceleration;
}

const speedInterval = setInterval(increaseSpeed, 30000);

//iniciar loop do jogo
const gameInterval = setInterval(moveObstaculo, interval);
