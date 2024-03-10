const progressBar = document.getElementById('progress-bar');
const guessField = document.getElementById('guessField');
const message = document.getElementById('message');
const scoreboard = document.getElementById('scoreboard');
let progress = 0;
let randomNumber = generateRandomNumber();
let guesses = [];

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function checkGuess() {
    const guess = parseInt(guessField.value);
    guesses.push(guess);
    if (guess === randomNumber) {
        message.innerHTML = `Congratulations! You guessed the correct number: ${randomNumber} in ${guesses.length} guesses.`;
        message.style.color = 'green';
        if (progress < 100) {
            progress += 10;
            updateProgressBar();
        }
        addScoreboardEntry(guesses);
        guesses = [];
        randomNumber = generateRandomNumber();
    } else if (guess < randomNumber) {
        message.innerHTML = 'Try a higher number.';
        message.style.color = 'red';
    } else {
        message.innerHTML = 'Try a lower number.';
        message.style.color = 'red';
    }
}

function updateProgressBar() {
    progressBar.style.width = `${progress}%`;
}

function restartGame() {
    progress = 0;
    updateProgressBar();
    guessField.value = '';
    message.innerHTML = '';
    guesses = [];
    randomNumber = generateRandomNumber();
}

let totalPoints = 0;


function addScoreboardEntry(guessesArray, correctNumber) {
    const attempts = guessesArray.length;
    let points = 0;

    if (guessesArray[0] === correctNumber) {
        points = 10;
    } else if (attempts <= 5 && attempts > 1) {
        points = 5;
    } else if (attempts < 10 && attempts > 1) {
        points = 1;
    } else {
        points = -15;
    }

    totalPoints += points;

    const scoreboard = document.getElementById('scoreboard');
    const existingScore = document.getElementById('total-points');

    if (existingScore) {
        existingScore.textContent = `Total Points: ${totalPoints} (${points > 0 ? '+' : ''}${points})`;
    } else {
        const entry = document.createElement('div');
        entry.id = 'total-points';
        entry.textContent = `Total Points: ${totalPoints} (${points > 0 ? '+' : ''}${points})`;
        scoreboard.appendChild(entry);
    }
}


