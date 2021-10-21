let bricks = [];
const rows = 6;
const bricksPerRow = 8;
const brickWidth = 400 / bricksPerRow - 2;
let score = 0;

function setup() {
  createCanvas(400, 600);
  //Create paddle sprite
  paddle = createSprite(width / 2, height - 50, 80, 10);
  paddle.shapeColor = "white";

  //Create ball sprite
  ball = createSprite(width / 2, height - 65, 20, 20);
  ball.shapeColor = "red";

  gameState = "serve";

  bricks = createBricks();
}

function draw() {
  background("black");

  edges = createEdgeSprites();
  paddle.x = mouseX;

  if (gameState === "serve") {
    fill("Green");
    textSize(20);
    text("Press Space to Start", 100, 280);
  }

  if (keyDown("space") && gameState == "serve") {
    ball.velocityX = 5;
    ball.velocityY = -5;
    gameState = "play";
  }

  //make the ball bounce off the top and side walls
  if (
    ball.isTouching(edges[0]) ||
    ball.isTouching(edges[1]) ||
    ball.isTouching(edges[2])
  ) {
    ball.bounceOff(edges[0]);
    ball.bounceOff(edges[1]);
    ball.bounceOff(edges[2]);
  }

  if (ball.isTouching(paddle)) {
    ball.bounceOff(paddle);
  }

  destroyBricks();

  //Game Over
  if (ball.y > 550) {
    gameState = "over";
  }

  if (gameState === "over") {
    fill("red");
    textSize(20);
    text("Game Over!", 130, 280);
    fill(255);
    text("Score:" + score, 130, 330);
  }

  drawSprites();
}

function createBricks() {
  for (let row = 0; row < rows; row++) {
    for (let i = 0; i < bricksPerRow; i++) {
      let xPos = brickWidth * i + brickWidth / 2 + 8;
      let yPos = 25 * row + 30;
      let brick = createSprite(xPos, yPos, brickWidth - 5, 25 - 5);
      let red = Math.round(random(50, 255));
      let green = Math.round(random(50, 255));
      let blue = Math.round(random(50, 255));

      brick.shapeColor = rgb(red, green, blue);
      bricks.push(brick);
    }
  }
  return bricks;
}

function destroyBricks() {
  for (let i = bricks.length - 1; i >= 0; i--) {
    const brick = bricks[i];
    if (ball.isTouching(brick)) {
      ball.bounceOff(brick);
      brick.destroy();
      ball.bounceOff(brick);
      score += 1;
    }
  }
}
