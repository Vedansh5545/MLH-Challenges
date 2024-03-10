const fruits = ['🍎', '🍊', '🍋', '🍉', '🍇', '🍓', '🍒', '🍑'];
let cards = [...fruits, ...fruits].sort(() => Math.random() - 0.5);
let flippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function createCardElement(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.innerHTML = `
        <div class="front">${cards[index]}</div>
        <div class="back"></div>
    `;
    card.addEventListener('click', flipCard);
    return card;
}

function renderCards() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    cards.forEach((_, index) => {
        const card = createCardElement(index);
        grid.appendChild(card);
    });
}

function checkForMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!flippedCard) {
        flippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function resetBoard() {
    [flippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    cards = [...fruits, ...fruits].sort(() => Math.random() - 0.5);
    renderCards();
    resetBoard();
}

document.getElementById('reset-button').addEventListener('click', resetGame);

renderCards();
