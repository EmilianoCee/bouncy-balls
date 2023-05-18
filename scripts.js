const canvas = document.querySelector(`canvas`);
const ctx = canvas.getContext(`2d`);

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min + 1)) + min;
    return num;
};

function Ball(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
};

Ball.prototype.draw = function() {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
};

Ball.prototype.update = function() {
    if ((this.x + this.size) >= width) {
      this.velX = -(this.velX);
    }
  
    if ((this.x - this.size) <= 0) {
      this.velX = -(this.velX);
    }
  
    if ((this.y + this.size) >= height) {
      this.velY = -(this.velY);
    }
  
    if ((this.y - this.size) <= 0) {
      this.velY = -(this.velY);
    }
  
    this.x += this.velX;
    this.y += this.velY;
  }

let balls = [];

while(balls.length < 2) {
    let size = random(25, 35);
    let ball = new Ball(
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-2, 2),
        random(-2, 2),
        `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`,
        size
    );

    balls.push(ball);
}

Ball.prototype.collisionDetect = function() {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j] )) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`;
            }
        }
    }
}

function loop() {
    ctx.fillStyle = `rgba(0, 0, 0, 0.25)`;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    requestAnimationFrame(loop);
}
loop();

canvas.addEventListener(`click`, function(e) {
    console.log(balls[1].x);
    console.log(balls[1].y);
    // console.log(balls[1].size)

    let nBall = new Ball(
        e.pageX,
        e.pageY,
        random(-5, 5),
        random(-5, 5),
        `rgb(${random(0,255)}, ${random(0,255)}, ${random(0,255)})`,
        random(25, 35)
    );
    balls.push(nBall);

    for (let k = 0; k < balls.length; k++) {
        if ((balls[k].x === e.pageX) && (balls[k].y === e.pageY)) {
            console.log(`clicked`)
            // balls[k].size *= 2;
        }
    }
})

window.addEventListener(`resize`, function() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
})