function handleCardClick(event){
  const card = event.currentTarget;
  if (card.classList.contains("flipped")){
      return;
  }
  if (card.classList.contains("matched")){
      return;
  }
  console.log({card});
  const cards = document.querySelectorAll(".card");
  console.log({cards});
  
  const flipped = document.querySelectorAll(".flipped"); 
  console.log({flipped});

  const pairFlipped = flipped.length === 2;

  
  // if we have two flipped cards already, flip them back
  if (pairFlipped){
      const [first, second] = flipped;
      if (first.innerHTML.trim() === second.innerHTML.trim()){
          first.classList.add("matched");
          second.classList.add("matched");
      }
      for (let card of flipped){
          card.classList.remove("flipped");
      }
  }
  card.classList.toggle("flipped");


  
        
}
function addCard(emoji){
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