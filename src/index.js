const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 600);
const CANVAS_HEIGHT = (canvas.height = 600);
const spriteWidth = 575;
const spriteHeight = 523;
let frameX = 0;
let frameY = 5;
let gameFrame = 0;
const staggeredFrames = 5;
let playerState = "idle";
const dropdown = document.getElementById("animations");
dropdown.addEventListener("change", (e) => {
  playerState = e.target.value;
});

const spriteAnimations = [];
const animationStates = [
  { name: "idle", frames: 7 },
  { name: "jump", frames: 7 },
  { name: "fall", frames: 7 },
  { name: "run", frames: 9 },
  { name: "dizzy", frames: 11 },
  { name: "sit", frames: 5 },
  { name: "roll", frames: 7 },
  { name: "bite", frames: 7 },
  { name: "ko", frames: 12 },
  { name: "getHit", frames: 4 }
];

animationStates.forEach((state, index) => {
  let frames = {
    loc: []
  };

  for (let j = 0; j < state.frames; j++) {
    let locationX = j * spriteWidth;
    let locationY = index * spriteHeight;
    frames.loc.push({ x: locationX, y: locationY });
  }

  spriteAnimations[state.name] = frames;
});

const playerImage = new Image();
playerImage.src = "https://www.frankslaboratory.co.uk/downloads/shadow_dog.png";

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  // ctx.fillRect(x, y, 100, 100);
  // ctx.drawImage(playerImage, sx, sy, sw, sh, dx, dy, dw, dh)
  let position =
    Math.floor(gameFrame / staggeredFrames) %
    spriteAnimations[playerState].loc.length;
  frameX = spriteWidth * position;
  frameY = spriteAnimations[playerState].loc[position].y;
  ctx.drawImage(
    playerImage,
    frameX,
    frameY,
    spriteWidth,
    spriteHeight,
    0,
    0,
    CANVAS_WIDTH,
    CANVAS_HEIGHT
  );
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();
