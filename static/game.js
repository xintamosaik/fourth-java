const state = {
  try: 0,
  lastCard: null,
}
function addCard(emoji){
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "front";
    front.innerHTML = "🎴";
    front.hidden = false;
    
    const back = document.createElement("div");
    back.className = "back";
    back.innerHTML = emoji;
    back.hidden = true;

    card.appendChild(front);
    card.appendChild(back);
    
    card.onclick = function(){

        state.try++;
        if (state.try === 1){
            state.lastCard = card;
        }

        if (state.try === 2){
            if (state.lastCard.lastChild.innerHTML === card.lastChild.innerHTML){
                state.try = 0;
                state.lastCard = null;
            
                card.classList.add("found");
                lastCard?.classList.add("found");
                return
            }
        }
        
        if (state.try == 3){
            state.try = 0;
            const cards = document.querySelectorAll(".card:not(.found)"); 
            for (let card of cards){
                card.firstChild.hidden = false;
                card.lastChild.hidden = true;
            }
        }
        front.hidden = front.hidden ? false : true;
        back.hidden = back.hidden ? false : true;
    }
    document.querySelector("#game").appendChild(card);
    
}

function addCards(){
    const emojis = ["🍑", "🍑", "🥑 ", "🥑", "🍓", "🍓", "🧄", "🧄", "🍄", "🍄", "🍆 ", "🍆 " ]
    const shuffled = emojis.sort(() => Math.random() - 0.5);
    for (let emoji of shuffled){
        addCard(emoji);
    }
}

addCards();