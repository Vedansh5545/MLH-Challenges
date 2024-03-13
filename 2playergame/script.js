const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const tileCount = 20;
const tileSize = canvas.width / tileCount;

class Snake {
    constructor() {
        this.body = [{ x: 10, y: 10 }];
        this.direction = { x: 0, y: 0 };
        this.score = 0;
        this.trials = 1;
    }

    move() {
        const head = { x: this.body[0].x + this.direction.x, y: this.body[0].y + this.direction.y };
        this.body.unshift(head);

        if (this.body.length > this.score + 1) {
            this.body.pop();
        }
    }

    changeDirection(x, y) {
        this.direction = { x, y };
    }

    checkCollision() {
        if (this.body[0].x < 0 || this.body[0].x >= tileCount || this.body[0].y < 0 || this.body[0].y >= tileCount) {
            return true;
        }

        for (let i = 1; i < this.body.length; i++) {
            if (this.body[0].x === this.body[i].x && this.body[0].y === this.body[i].y) {
                return true;
            }
        }

        return false;
    }

    eatFood(food) {
        if (this.body[0].x === food.x && this.body[0].y === food.y) {
            this.score += 1;
            return true;
        }
        return false;
    }
}

let player1 = new Snake();
let player2 = new Snake();
let currentPlayer = player1;

function generateFood() {
    return {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

let food = generateFood();

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw active player's snake
    if (currentPlayer === player1) {
        ctx.fillStyle = "#ffcc00"; // Player 1 color
        player1.body.forEach((segment, index) => {
            ctx.beginPath();
            ctx.arc((segment.x + 0.5) * tileSize, (segment.y + 0.5) * tileSize, tileSize / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    } else {
        ctx.fillStyle = "#ff8800"; // Player 2 color
        player2.body.forEach((segment, index) => {
            ctx.beginPath();
            ctx.arc((segment.x + 0.5) * tileSize, (segment.y + 0.5) * tileSize, tileSize / 2, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Draw food
    ctx.fillStyle = "#ff4444";
    ctx.beginPath();
    ctx.arc((food.x + 0.5) * tileSize, (food.y + 0.5) * tileSize, tileSize / 2, 0, Math.PI * 2);
    ctx.fill();

    // Update scoreboard
    document.getElementById("player1-score").innerText = player1.score;
    document.getElementById("player2-score").innerText = player2.score;
}

function update() {
    currentPlayer.move();

    if (currentPlayer.checkCollision()) {
        currentPlayer.trials -= 1;
        if (currentPlayer.trials === 0) {
            // Game over for current player
            if (currentPlayer === player1) {
                currentPlayer = player2;
            } else {
                // Game over for both players
                displayWinner();
            }
        }
    }

    if (currentPlayer.eatFood(food)) {
        food = generateFood();
    }

    draw();
}

function displayWinner() {
    const winner = player1.score > player2.score ? "Player 1" : "Player 2";
    const winnerElement = document.createElement("div");
    winnerElement.innerText = `${winner} wins!`;
    winnerElement.classList.add("winner-animation");
    document.body.appendChild(winnerElement);

    // Remove winner name after a delay
    setTimeout(() => {
        winnerElement.remove();
    }, 3000);
}

function resetGame() {
    player1 = new Snake();
    player2 = new Snake();
    currentPlayer = player1;
    food = generateFood();
}

document.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && currentPlayer.direction.y !== 1) {
        currentPlayer.changeDirection(0, -1);
    } else if (e.key === "ArrowDown" && currentPlayer.direction.y !== -1) {
        currentPlayer.changeDirection(0, 1);
    } else if (e.key === "ArrowLeft" && currentPlayer.direction.x !== 1) {
        currentPlayer.changeDirection(-1, 0);
    } else if (e.key === "ArrowRight" && currentPlayer.direction.x !== -1) {
        currentPlayer.changeDirection(1, 0);
    }
});

setInterval(update, 100);

// Reset button
const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", () => {
    resetGame();
    draw();
});


