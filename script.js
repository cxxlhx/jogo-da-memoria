const items = ['💻', '🌐', '🚀', '⚡', '🔒', '📱', '🎮', '💡'];
let cards = [...items, ...items];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let moves = 0;
let matches = 0;

const gameBoard = document.getElementById('game-board');
const movesElement = document.getElementById('moves');
const matchesElement = document.getElementById('matches');
const restartBtn = document.getElementById('restart-btn');
const winMessage = document.getElementById('win-message');
const finalMovesElement = document.getElementById('final-moves');
const playAgainBtn = document.getElementById('play-again-btn');

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cards]);

    shuffledCards.forEach((item) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.value = item;

        card.innerHTML = `
            <div class="card-face card-front"></div>
            <div class="card-face card-back">${item}</div>
        `;

        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    incrementMoves();
    checkForMatch();
}

function incrementMoves() {
    moves++;
    movesElement.textContent = moves;
}

function checkForMatch() {
    const isMatch = firstCard.dataset.value === secondCard.dataset.value;

    if (isMatch) {
        disableCards();
    } else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    matches++;
    matchesElement.textContent = matches;

    resetBoard();

    if (matches === items.length) {
        setTimeout(showWinMessage, 500);
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    [lockBoard] = [false];
}

function showWinMessage() {
    finalMovesElement.textContent = moves;
    winMessage.classList.remove('hidden');
}

function restartGame() {
    moves = 0;
    matches = 0;
    movesElement.textContent = moves;
    matchesElement.textContent = matches;
    winMessage.classList.add('hidden');
    resetBoard();
    createBoard();
}

restartBtn.addEventListener('click', restartGame);
playAgainBtn.addEventListener('click', restartGame);

// Inicializa o jogo ao carregar a página
createBoard();