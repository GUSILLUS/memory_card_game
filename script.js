const cards = document.querySelectorAll(".card"),
timeTag = document.querySelector(".time b"),
flipsTag = document.querySelector(".flips b"),
refreshBtn = document.querySelector(".details button"),
cardsContainer = document.querySelector(".cards");

let maxTime = 45;
let timeLeft = maxTime;
let flips = 0;
let matched = 0;
let cardOne, cardTwo, timer;
let disableDeck = false;
let isPlaying = false;

function initTimer() {
  if(timeLeft <= 0) {
    lose();

    return clearInterval(timer);
  }
  timeLeft--;
  timeTag.textContent = timeLeft;
}

function flipCard({target: clickedCard}) {
  if (!isPlaying) {
    isPlaying = true;
    timer = setInterval(initTimer, 1000);
  }

  if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
    flips++;
    flipsTag.textContent = flips;
    clickedCard.classList.add("flip");
    if(!cardOne) {
      return cardOne = clickedCard;
    }
    cardTwo = clickedCard;
    disableDeck = true;
    let cardOneImg = cardOne.querySelector(".back-view img").src,
      cardTwoImg = cardTwo.querySelector(".back-view img").src;
      matchCards(cardOneImg, cardTwoImg);
  }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        if(matched === 8 && timeLeft > 0) {
            win();
            return clearInterval(timer);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {

  if (document.querySelector('.message')) {
    document.querySelector('.message').remove();
    cardsContainer.classList.toggle('blur');
  }

  timeLeft = maxTime;
  flips = matched = 0;
  cardOne = cardTwo = "";

  clearInterval(timer);
  timeTag.textContent = timeLeft;
  flipsTag.textContent = flips;

  disableDeck = isPlaying = false;

  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
  arr.sort(() => Math.random() > 0.5 ? 1 : -1);
  cards.forEach((card, i) => {
    card.classList.remove("flip");
    let imgTag = card.querySelector(".back-view img");
    imgTag.src = `images/image_${arr[i]}.png`;
    card.addEventListener("click", flipCard);
  });
}

shuffleCard();

refreshBtn.addEventListener("click", shuffleCard)
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});

function win() {
  const message = document.createElement('div');

  message.classList.add('message')
  message.innerHTML = `
    <img class="message_img" src="images/win.png" alt="message-img">
    <p class="message_text">Victory has been claimed!<br> The battle is won!</p>
    <img class="message_img" src="images/win_1.png" alt="message-img">
  `;

  cardsContainer.classList.toggle('blur');

  document.body.append(message);
}

function lose() {
  const message = document.createElement('div');

  message.classList.add('message')
  message.innerHTML = `
    <img class="message_img" src="images/lose.png" alt="message-img">
    <p class="message_text">Alas! Our defeat is certain.<br>The battle is lost.</p>
    <img class="message_img" src="images/lose_1.png" alt="message-img">
  `;

  cardsContainer.classList.toggle('blur');

  document.body.append(message);
}
