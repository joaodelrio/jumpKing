const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ambientSound = document.getElementById('ambientSound');
ambientSound.loop = true;
const warriorImage = document.getElementById('warriorImage');
const warriorImage2 = document.getElementById('warriorImage2');
const warriorImage3 = document.getElementById('warriorImage3');
const barrelImage = document.getElementById('barrelImage');
const explosionSound = document.getElementById('explosionSound'); 
const explosionImages = [document.getElementById('explosion1'), 
document.getElementById('explosion2'), 
document.getElementById('explosion3'), 
document.getElementById('explosion4'), 
document.getElementById('explosion5'), 
document.getElementById('explosion6'),
document.getElementById('explosion7')];
const banner = document.getElementById('banner');
explosionSound.volume = 0.3;  
const body = document.querySelector('body');
import { Background, Clouds, Ground, Hills, Bushes, Trees } from "./parallax.js";

// let explisonImages = {
//     "1": './image/explosion/explosion1.png',
//     "2": './image/explosion/explosion2.png',
//     "3": './image/explosion/explosion3.png',
//     "4": './image/explosion/explosion4.png',
//     "5": './image/explosion/explosion5.png',
//     "6": './image/explosion/explosion6.png',
//     "7": './image/explosion/explosion7.png'
// }

var lastFrameTime = 0;

// Classes do parallax
var bg = new Background();
var cloud = new Clouds();
var hills = new Hills();
var trees = new Trees();
var bushes = new Bushes();
var ground = new Ground();

// Variáveis do jogo
let dino = {
    x: 30,
    y: 300,
    width: 78,
    height: 91,
    dy: 0,
    jumpStrength: 12,
    gravity: 0.35,
    grounded: false,
    alive: true,
    image: warriorImage
};

class Explosion {
    constructor(){
        this.x = dino.x;
        this.y = dino.y-20;
        this.width = 90;
        this.height = 120;
        this.image = explosionImages[0];
        this.fase = 1;
    }
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    animation(){
        if(this.fase === 1){
            setTimeout(() => {
                this.image = explosionImages[1];
                this.fase = 2;
            }, 200);
        }
        if(this.fase === 2){
            setTimeout(() => {
                this.image = explosionImages[2];
                this.fase = 3;
            }, 200);
        }
        if(this.fase === 3){
            setTimeout(() => {
                this.image = explosionImages[3];
                this.fase = 4;
            }, 200);
        }
        if(this.fase === 4){
            setTimeout(() => {
                this.image = explosionImages[4];
                this.fase = 5;
            }, 200);
        }
        if(this.fase === 5){
            setTimeout(() => {
                this.image = explosionImages[5];
                this.fase = 6;
            }, 150);
        }
        if(this.fase === 6){
            setTimeout(() => {
                this.image = explosionImages[6];
                this.fase = 0;
            }, 150);
        }
        if(this.fase === 0){
            setTimeout(() => {
                this.image = explosionImages[0];
                this.fase = 1;
            }, 100);
        }
    }
}

var explosion = new Explosion();
let screenshot = null;
let obstacles = [];
let gameSpeed = 2.5;
let score = 0;
let start = false;
// Fácil: 600, Médio: 400, Difícil: 200
let distanceObstacles = [300, 450, 600];
let nextObstacleDistance = distanceObstacles[randomIntFromRange(0, 2)];

// Função para desenhar o dinossauro
function drawDino() {
    // ctx.fillStyle = dino.color;
    // ctx.fillRect(dino.x, dino.y, dino.width, dino.height);
    ctx.drawImage(dino.image, dino.x, dino.y, dino.width, dino.height);
}

// Função para desenhar obstáculos
function drawObstacles() {
    obstacles.forEach(obstacle => {
        ctx.drawImage(barrelImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

// Função para desenhar o parallax
function drawParallax() {
    var now = Date.now();
    var deltaSeconds = (now - lastFrameTime) / 200;
    lastFrameTime = now;
    bg.draw(deltaSeconds);
    cloud.draw(deltaSeconds);
    hills.draw(deltaSeconds);
    trees.draw(deltaSeconds);
    bushes.draw(deltaSeconds);
    ground.draw(deltaSeconds);
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Função para atualizar obstáculos
function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= gameSpeed;
    });

    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - nextObstacleDistance) {
        let obstacle = {
            x: canvas.width,
            y: 325,
            width: 50,
            height: 70
        };
        obstacles.push(obstacle);
        nextObstacleDistance = distanceObstacles[randomIntFromRange(0, 2)];
    }

    if (obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();
        score++;
    }
}

// Função para verificar a distancia entre dois pontos
function detectCollision(x1, y1, x2, y2){
    // Formula para calcular a distancia entre dois pontos
    const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const isColliding = distance < 55;
    return isColliding;
}

// Função para atualizar a colisão
function updateCollision() {
    obstacles.forEach(obstacle => {
        if (
            detectCollision(dino.x, dino.y, obstacle.x, obstacle.y)
        ) {
            // Colisão detectada
            dino.alive = false;
            final();       
        }
    });
} 

function begin() {
    ctx.font = '70px Tiny5';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#636364";
    const x = canvas.width / 2 - 185;
    const y = canvas.height / 2 - 70;
    ctx.strokeText("JUMP KING", x, y);
    ctx.fillText("JUMP KING", x, y);
    ground.totalSeconds = 0;
    cloud.totalSeconds = 0;
    hills.totalSeconds = 0;
    trees.totalSeconds = 0;
    bushes.totalSeconds = 0;
    play(x,y);
}

function final() {
    ambientSound.pause();
    explosionSound.play();
    ctx.font = '70px Tiny5';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#636364";
    const x = canvas.width / 2 - 185;
    const y = canvas.height / 2 - 70;
    ctx.strokeText("GAME OVER", x, y);
    ctx.fillText("GAME OVER", x, y);
    

    play(x,y,true);
}

function play(x,y,reset=false) {
    if (!dino.alive && reset) {
        document.addEventListener('keydown', (e) => {
            setTimeout(() => {
                if (e.code === 'Space' || e.code === 'ArrowUp') {
                    document.location.reload();
                }
            }, 500);
        });
    }
    if (dino.alive && !reset) {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                start = true;
            }
        });
    }
    ctx.font = "30px Tiny5";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#636364";
    ctx.strokeText("Press Space", x+100, y+30);
    ctx.fillText("Press Space", x+100, y+30);
}

// Função para animar o dinossauro
function animateDino(){
    // Cavaleiro andando
    if(start){
        if(dino.image === warriorImage){
            setTimeout(() => {
                dino.image = warriorImage3;
            },200);
        } else {
            setTimeout(() => {
                dino.image = warriorImage
            },200);
        }
    }
    // Cavaleiro parado
    else{
        if(dino.image === warriorImage){
            setTimeout(() => {
                dino.image = warriorImage2;
            },300);
        } else {
            setTimeout(() => {
                dino.image = warriorImage
            },300);
        }
    }
}

// Função para atualizar o dinossauro
function updateDino() {
    // Dino pulando
    if (dino.grounded && dino.dy === 0 && isJumping) {
        dino.dy = -dino.jumpStrength;
        dino.grounded = false;
    }
    dino.dy += dino.gravity;
    dino.y += dino.dy;

    // Dino no chão
    if (dino.y + dino.height > canvas.height - 10) {
        dino.y = canvas.height - 1 - dino.height;
        dino.dy = 0;
        dino.grounded = true;
    }
}

function updateScore(){
    ctx.font = "40px Tiny5";
    ctx.fillStyle = "black";
    ctx.drawImage(banner, canvas.width-100, 0, 100, 100);
    if(score < 10){
        ctx.fillText("0" + score, canvas.width-67, 62);
    } else {
        ctx.fillText(score, canvas.width-67, 62);
    }
    
}

function takeScreenshot() {
    screenshot = canvas.toDataURL('image/png');
}

function showScreenshot() {
    if (screenshot) {
        let img = new Image();
        img.src = screenshot;
        img.onload = function() {
            ctx.drawImage(img, 0, 0);
        }
        ctx.drawImage(img, 0, 0);
    }
}

var oldScore = 0;
function gameDifficulty(){
    // a cada 5 pontos aumenta a dificuldade
    if(score % 10 == 0 && score !== 0){
        if(oldScore != score){
            gameSpeed += 0.5;
        }
        oldScore = score;
        console.log(gameSpeed)
    }

}

// Variável para detectar se o jogador está tentando pular
let isJumping = false;
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        isJumping = true;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        isJumping = false;
    }
});

// Função para desenhar o jogo
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawParallax();
    drawDino();
    drawObstacles();
    updateScore();
    animateDino();
}

// Função para atualizar o jogo
function update() {  
    gameDifficulty();
    updateDino();
    
    updateObstacles();
    updateCollision();
}

// Função principal do jogo
function gameLoop() {
    draw();
    if(start){
        update();
    }
    else{
        begin();
    }

    if(dino.alive){
        requestAnimationFrame(gameLoop);
    }
    else{
        //Tira print da tela atual
        takeScreenshot();
        dinoDies();
    }
}

function dinoDies(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameSpeed = 0;
    showScreenshot();
    explosion.draw();
    explosion.animation();
    // Coloca o print da tela atual
    
    requestAnimationFrame(dinoDies);
}


// Iniciar o loop do jogo
gameLoop();
