const images = {
	bg: './image/parallax/1bg.png',
	cloud: './image/parallax/2clouds.png',
	hills: './image/parallax/3hills.png',
	trees: './image/parallax/4trees.png',
	bushes: './image/parallax/5bushes.png',
	ground: './image/parallax/6ground.png',
};
var screenSize = {
	width: 1000,
	height: 400
};
var lastFrameTime = 0;
const canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

/**
* Classes
*/
class Background {
	constructor() {
		this.img = new Image();
		this.img.src = images.bg;
		this.img.onload = () => {
			this.draw(0);
		};
	}
	draw(delta) {
		ctx.drawImage(this.img, 0, 0, screenSize.width, screenSize.height);
	}
}

class Clouds {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 10;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.cloud;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / screenSize.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % screenSize.width;
		ctx.save();
		ctx.translate(-new_pos, 0);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * screenSize.width, 0, screenSize.width, screenSize.height);
        }
		ctx.restore();
	}
}

class Hills {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 20;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.hills;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / screenSize.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % screenSize.width;
		ctx.save();
		ctx.translate(-new_pos, 0);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * screenSize.width, 0, screenSize.width, screenSize.height);
        }
		ctx.restore();
	}
}

class Trees {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 30;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.trees;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / screenSize.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % screenSize.width;
		ctx.save();
		ctx.translate(-new_pos, 0);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * screenSize.width, 0, screenSize.width, screenSize.height);
        }
		ctx.restore();
	}
}

class Bushes {
	constructor() {
		this.totalSeconds = 0;
		this.speed = 30;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.bushes;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / screenSize.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % screenSize.width;
		ctx.save();
		ctx.translate(-new_pos, 0);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * screenSize.width, 0, screenSize.width, screenSize.height);
        }
		ctx.restore();
	}
}

class Ground {
	constructor() {
		this.totalSeconds = 20;
		this.speed = 50;
		this.img = new Image();
		this.slideImages = 1;
		this.img.src = images.ground;
		this.img.onload = () => {
			this.slideImages = Math.ceil(canvas.width / screenSize.width)+1;
			this.draw(0);
		};
	}
	draw(delta) {
		this.totalSeconds += delta;
		var new_pos = this.totalSeconds * this.speed % screenSize.width;
		ctx.save();
		ctx.translate(-new_pos, canvas.height-this.img.height);
		for (var i = 0; i < this.slideImages; i++) {
            ctx.drawImage(this.img, i * screenSize.width, 13);
        }
		ctx.restore();
	}
}

export class Parallax {
    constructor() {
        this.bg = new Background();
        this.cloud = new Clouds();
        this.hills = new Hills();
        this.trees = new Trees();
        this.bushes = new Bushes();
        this.ground = new Ground();
        this.lastFrameTime = 0;
    }

    draw() {
        var now = Date.now();
        var deltaSeconds = (now - this.lastFrameTime) / 200;
        this.lastFrameTime = now;
        this.bg.draw(deltaSeconds);
        this.cloud.draw(deltaSeconds);
        this.hills.draw(deltaSeconds);
        this.trees.draw(deltaSeconds);
        this.bushes.draw(deltaSeconds);
        this.ground.draw(deltaSeconds);
    }

    stop() {
        this.ground.totalSeconds = 0;
        this.cloud.totalSeconds = 0;
        this.hills.totalSeconds = 0;
        this.trees.totalSeconds = 0;
        this.bushes.totalSeconds = 0;
    }
}
