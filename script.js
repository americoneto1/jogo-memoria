function shuffleCards(cards) {
  return cards.sort(() => .5 - Math.random());
}

function startGame() {
  const cards = ['😃', '😘', '😜', '😱', '✌', '🚀', '😍', '😡', '🛀'];

  shuffleCards([...cards, ...cards]).forEach(item => {
    const card = document.createElement('div');
    card.setAttribute('data-index', item);
    card.innerHTML = item;
    card.addEventListener('click', flipCard);
    document.querySelector('#jogo').appendChild(card);
  });
}

function hasAWinner() {
  const correctCards = document.querySelectorAll('#jogo .correct').length;
  const allCards = document.querySelectorAll('#jogo > div').length;

  return correctCards === allCards;
}

function checkCards(card1, card2) {
  if (card1.dataset.index === card2.dataset.index) {
    card1.classList.add('correct');
    card1.removeEventListener('click', flipCard);
    card2.classList.add('correct');
    card2.removeEventListener('click', flipCard);
  }
  card1.classList.remove('opened');
  card2.classList.remove('opened');
}

function flipCard(event) {
  event.target.classList.add('opened');

  const openedCards = document.querySelectorAll('#jogo .opened');

  if (openedCards.length === 2) {
    setTimeout(() => {
      checkCards(openedCards[0], openedCards[1]);

      if (hasAWinner()) {
        document.querySelector('.ganhador').classList.add('show');
      }
    }, 500);
  }
}

startGame();