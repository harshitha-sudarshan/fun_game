// Create a canvas element
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed'; // Fixed position
canvas.style.top = '0'; // Position from top
canvas.style.left = '0'; // Position from left
document.body.appendChild(canvas);

// Load images
const carImage = new Image();
carImage.src = 'redbull_car.jpg';
const canImage = new Image();
canImage.src = 'redbull_can.jpg';
const maxPowerupImage = new Image();
maxPowerupImage.src = 'max_powerup.png';
const raceTrackImage = new Image();
raceTrackImage.src = 'race_track.jpg';

// Background music
const backgroundMusic = new Audio('background_music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.5;

// Define game variables
let score = 0;
let playerX = canvas.width / 2;
let playerY = canvas.height - 100;
let canSpeed = 5;
let canX = Math.random() * (canvas.width - 50);
let canY = -50;
let powerupSpeed = 3;
let powerupX = Math.random() * (canvas.width - 30);
let powerupY = -500;
let elapsedTime = 0;
let gameRunning = true;

// Game loop
function gameLoop() {
    if (gameRunning) {
        update();
        draw();
        backgroundMusic.play(); // Start playing the background music
    }
    requestAnimationFrame(gameLoop);
}

// Update game state
function update() {
    elapsedTime += 1 / 60; // Increment elapsed time
    if (elapsedTime >= 60) { // End game after 60 seconds
        gameRunning = false;
    }

    // Move player with arrow keys
    if (keys.ArrowLeft && playerX > 0) {
        playerX -= 5;
    }
    if (keys.ArrowRight && playerX < canvas.width - 50) {
        playerX += 5;
    }

    // Stop the car at the corner when it reaches the edge of the canvas
    if (playerX <= 0) {
        playerX = 0;
    }
    if (playerX >= canvas.width - 50) {
        playerX = canvas.width - 50;
    }

    // Update can and powerup positions
    canY += canSpeed;
    if (canY > canvas.height) {
        canX = Math.random() * (canvas.width - 50);
        canY = -50;
    }
    powerupY += powerupSpeed;
    if (powerupY > canvas.height) {
        powerupX = Math.random() * (canvas.width - 30);
        powerupY = -500;
    }

    // Collision detection
    if (playerX < canX + 50 && playerX + 50 > canX && playerY < canY + 50 && playerY + 100 > canY) {
        score++;
        canX = Math.random() * (canvas.width - 50);
        canY = -50;
    }
    if (playerX < powerupX + 30 && playerX + 50 > powerupX && playerY < powerupY + 30 && playerY + 100 > powerupY) {
        score += 5;
        powerupX = Math.random() * (canvas.width - 30);
        powerupY = -500;
    }
}

// Draw game objects
function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw race track background
    ctx.drawImage(raceTrackImage, 0, 0, canvas.width, canvas.height);

    // Draw player car
    ctx.drawImage(carImage, playerX, playerY, 50, 100);

    // Draw can
    ctx.drawImage(canImage, canX, canY, 50, 50);

    // Draw powerup
    ctx.drawImage(maxPowerupImage, powerupX, powerupY, 30, 30);

    // Draw score
    ctx.fillStyle = 'white';
    ctx.font = '36px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width - 200, 50);

    // Draw timer
    ctx.fillText(`Time: ${Math.max(0, 60 - elapsedTime).toFixed(0)}`, canvas.width - 200, 100);

    // Draw final score and text after game is over
    if (!gameRunning) {
        // Draw a black rectangle covering the entire canvas
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw total score on the screen
        ctx.fillStyle = 'white';
        ctx.fillText('gsdcugsdyufc', canvas.width / 2 - 100, canvas.height / 2);
    }
}

// Event listeners for keyboard input
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keys[event.key] = false;
});

// Start the game loop
gameLoop();



