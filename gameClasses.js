const knightImage = document.getElementById('knightImage');
const knightImage2 = document.getElementById('knightImage2');
const knightImage3 = document.getElementById('knightImage3');
const barrelImage = document.getElementById('barrelImage');
const explosionImages = [document.getElementById('explosion1'), 
    document.getElementById('explosion2'), 
    document.getElementById('explosion3'), 
    document.getElementById('explosion4'), 
    document.getElementById('explosion5'), 
    document.getElementById('explosion6'),
    document.getElementById('explosion7')];

//Classes do jogo
export class Knight { 
    constructor() {
        this.x = 30;
        this.y = 300;
        this.width = 78;
        this.height = 91;
        this.dy = 0;
        this.jumpStrength = 12;
        this.gravity = 0.35;
        this.grounded = false;
        this.alive = true;
        this.image = knightImage;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    animate(start){
        // Cavaleiro andando
        if(start){
            if(this.image === knightImage){
                setTimeout(() => {
                    this.image = knightImage3;
                },200);
            } else {
                setTimeout(() => {
                    this.image = knightImage
                },200);
            }
        }
        // Cavaleiro parado
        else{
            if(this.image === knightImage){
                setTimeout(() => {
                    this.image = knightImage2;
                },300);
            } else {
                setTimeout(() => {
                    this.image = knightImage
                },300);
            }
        }
    }
    update(canvas, isJumping){
        // cavaleiro pulando
        if (this.grounded && this.dy === 0 && isJumping) {
            this.dy = -this.jumpStrength;
            this.grounded = false;
        }
        this.dy += this.gravity;
        this.y += this.dy;

        // cavaleiro no chão
        if (this.y + this.height > canvas.height - 10) {
            this.y = canvas.height - 1 - this.height;
            this.dy = 0;
            this.grounded = true;
        }
    }
}

export class Explosion {
    constructor(knightX,knightY){
        this.x = knightX;
        this.y = knightY-20;
        this.width = 90;
        this.height = 120;
        this.image = explosionImages[0];
        this.fase = 1;
    }
    draw(ctx){
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

export class Obstacle {
    constructor(x,y,width,height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = barrelImage;
    }
    draw(ctx){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Collision {
    constructor(){

    }
    static detectCollisionBtwObjects(x1, y1, x2, y2) {
        const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        return distance < 55;
    }

    static updateCollision(knight, obstacles) {
        obstacles.forEach(obstacle => {
            if (this.detectCollisionBtwObjects(knight.x, knight.y, obstacle.x, obstacle.y)) {
                knight.alive = false;
            }
        });
    }
}