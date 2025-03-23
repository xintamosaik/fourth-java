/**
 * Single player version of the game. It just checks the current cards and adds classes to them.
 * Every time 2 cards are flipped, it checks if they match:
 * - If the cards match, it adds the class "matched" to them.
 * - If the cards don't match, it removes the class "flipped" from them.
 * 
 * @param {Event} event 
 * @returns {void}
 */
function handleCardClick(event) {
  const card = event.currentTarget;

  if (card.classList.contains("flipped")) {
    return;
  }
  if (card.classList.contains("matched")) {
    return;
  }

  const flipped = document.querySelectorAll(".flipped");

  if (flipped.length === 2) {
    const [first, second] = flipped;
    if (first.innerHTML.trim() === second.innerHTML.trim()) {
      first.classList.add("matched");
      second.classList.add("matched");
    }
    for (let card of flipped) {
      card.classList.remove("flipped");
    }
  }
  card.classList.toggle("flipped");
}

/**
 * Adds a card to the game. 
 * Cards contain both sides and a click event listener.
 * @param {String} emoji - The emoji to be added to the card. Javascript does not have char type, so we use string instead. 
 * @returns {HTMLDivElement} - The card element.
 */
function addCard(emoji) {
  const card = document.createElement("div");
  card.className = "card";

  const front = document.createElement("div");
  front.className = "front";
  front.innerHTML = "🎴";


  const back = document.createElement("div");
  back.className = "back";
  back.innerHTML = emoji;

  card.appendChild(front);
  card.appendChild(back);

  card.onclick = handleCardClick;
  return card;
}


/**
 * The emojis used in the memory game.
 */
const emojis = ["🍑", "🥑 ", "🍓", "🧄", "🍄", "🍆"]

/**
 * Doubles the emojis to create pairs.
 */
const doubled = emojis.concat(emojis);

/**
 * Shuffles the doubled emojis.
 */
const shuffled = doubled.sort(() => Math.random() - 0.5);
for (let emoji of shuffled) {
  window.game.appendChild(addCard(emoji));
}
