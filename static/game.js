/**
 * Single player version of the memory game.
 * When two cards are flipped, it checks for a match:
 * - If they match, they get .matched
 * - If they don't match, both lose the .flipped class
 */

/**
 * Flip the clicked card and, if there are two flipped,
 * check if they match, then reset them.
 *
 * @param {Event} event
 */
function handleCardClick(event) {
  const card = event.currentTarget;

  if (card.classList.contains("flipped") || card.classList.contains("matched")) {
    return;
  }

  const flipped = document.querySelectorAll(".flipped");

  // If there are already two flipped, check & reset them before flipping another
  if (flipped.length === 2) {
    const [first, second] = flipped;
    if (first.innerHTML.trim() === second.innerHTML.trim()) {
      first.classList.add("matched");
      second.classList.add("matched");
    }
    flipped.forEach((e) => e.classList.remove("flipped"));
  }

  // Now flip the current card
  card.classList.toggle("flipped");
}

/**
 * Creates a single card element with front/back faces and click logic.
 * @param {string} emoji
 * @returns {HTMLDivElement}
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

  card.addEventListener("click", handleCardClick);
  return card;
}

// The emojis used in the memory game
const emojis = ["🍑", "🥑", "🍓", "🧄", "🍄", "🍆"];

// Duplicate each emoji so there's a pair
const doubled = emojis.concat(emojis);

// Shuffle the array randomly
const shuffled = doubled.sort(() => Math.random() - 0.5);

// Attach cards to the #game container
for (let emoji of shuffled) {
  window.game.appendChild(addCard(emoji));
}
