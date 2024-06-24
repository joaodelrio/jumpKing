//Canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
//Images
const banner = document.getElementById('banner');
// Sounds
const explosionSound = document.getElementById('explosionSound');
explosionSound.volume = 0.3;  
const ambientSound = document.getElementById('ambientSound');
ambientSound.loop = true;
const jumpSound = document.getElementById('jumpSound')


import { Parallax } from "./parallax.js";
import { Knight, Explosion, Obstacle, Collision} from "./gameClasses.js";


//Variaveis do jogo
let screenshot = null;
let obstacles = [];
let gameSpeed = 2.5;
let score = 0;
let isStart = false;
let distanceObstacles = [300, 450, 600];
let nextObstacleDistance = distanceObstacles[randomIntFromRange(0, 2)];
ambientSound.play();

// Classes do jogo
var knight = new Knight();
var explosion = new Explosion(knight.x, knight.y);
var parallaxBG = new Parallax();

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.draw(ctx);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.x -= gameSpeed;
    });

    if (obstacles.length === 0 || obstacles[obstacles.length - 1].x < canvas.width - nextObstacleDistance) {
        let obstacle = new Obstacle(canvas.width,325,50,70);
        obstacles.push(obstacle);
        nextObstacleDistance = distanceObstacles[randomIntFromRange(0, 2)];
    }

    if (obstacles[0].x + obstacles[0].width < 0) {
        obstacles.shift();
        score++;
    }
}

function startText() {
    ctx.font = '70px Tiny5';
    ctx.lineWidth = 2;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#636364";
    const x = canvas.width / 2 - 185;
    const y = canvas.height / 2 - 70;
    ctx.strokeText("JUMP KING", x, y);
    ctx.fillText("JUMP KING", x, y);
    parallaxBG.stop();
    start(x,y);
}

function loseText() {
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
    

    reset(x,y);
}

function reset(x,y) {
    if (!knight.alive) {
        jumpSound.volume = 0
        document.addEventListener('keydown', (e) => {
            setTimeout(() => {
                if (e.code === 'Space' || e.code === 'ArrowUp') {
                    document.location.reload();
                }
            }, 500);
        });
    }
    pressSpace(x,y);
}

function start(x,y) {
    if (knight.alive) {
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' || e.code === 'ArrowUp') {
                isStart = true;
            }
        });
    }
    pressSpace(x,y);
}

function pressSpace(x,y){
    ctx.font = "30px Tiny5";
    ctx.lineWidth = 1;
    ctx.strokeStyle = "white";
    ctx.fillStyle = "#636364";
    ctx.strokeText("Press Space", x+100, y+30);
    ctx.fillText("Press Space", x+100, y+30);
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

var currentScore = 0;
function gameSpeedDifficulty(){
    // a cada 5 pontos aumenta a dificuldade
    if(score % 10 == 0 && score !== 0){
        if(currentScore != score){
            gameSpeed += 0.5;
        }
        currentScore = score;
    }

}

// Variável para detectar se o jogador está tentando pular
let isJumping = false;
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        isJumping = true;  
        jumpSound.play(); 
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        isJumping = false;
    }
});


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parallaxBG.draw();
    knight.draw(ctx);
    knight.animate(isStart);
    if(obstacles.length > 0){
        drawObstacles(ctx);
    }
    updateScore();
}

function update() {  
    gameSpeedDifficulty();
    knight.update(canvas, isJumping);   
    updateObstacles();
    Collision.updateCollision(knight,obstacles);
}

// Função principal do jogo
function gameLoop() {
    draw();
    if(!isStart){
        startText();
    }
    else{
        update();
    }
    if(knight.alive){
        requestAnimationFrame(gameLoop);
    }
    else{
        loseText();
        takeScreenshot();
        loseSreen();
    }
}

function loseSreen(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    gameSpeed = 0;
    showScreenshot();
    explosion.draw(ctx);
    explosion.animation();
    // Coloca o print da tela atual
    requestAnimationFrame(loseSreen);
}

// Iniciar o loop do jogo
gameLoop();
