function addCard(emoji){
    const card = document.createElement("div");
    card.className = "card";

    const front = document.createElement("div");
    front.className = "front";
    front.innerHTML = "🃏";
    front.hidden = false;
    
    const back = document.createElement("div");
    back.className = "back";
    back.innerHTML = emoji;
    back.hidden = true;

    card.appendChild(front);
    card.appendChild(back);
    
    card.onclick = function(){
        front.hidden = front.hidden ? false : true;
        back.hidden = back.hidden ? false : true;
    }
    document.querySelector("#game").appendChild(card);
    
}

function addCards(){
    const emojis = ["🍑", "🍑", "🥦", "🥦", "🍓", "🍓", "🧄", "🧄", "🍄", "🍄", "🍆 ", "🍆 " ]
    const shuffled = emojis.sort(() => Math.random() - 0.5);
    for (let emoji of shuffled){
        addCard(emoji);
    }
}

addCards();