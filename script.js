const FRONT = "card_front";
const BACK = "card_back";
const CARD = "card";
const ICON = "icon";


    startGame();

    function startGame() {
        
        initializeCards(game.createCardsFromTechs());

    }

        function initializeCards(cards) {

            let gameBoard = document.getElementById("gameBoard");
            gameBoard.innerHTML = '';
            game.cards.forEach(card =>{

                let cardElement = document.createElement('div');
                cardElement.id = card.id;
                cardElement.classList.add(CARD);
                cardElement.dataset.icon = cards.icon;

                createCardContent(card, cardElement);
                
                cardElement.addEventListener('click', flipCard)
                gameBoard.appendChild(cardElement);


            })
        }


    function createCardContent(card, cardElement){

        createCardFace(FRONT, card, cardElement)
        createCardFace(BACK, card, cardElement)

    }


    function createCardFace(face, card, element){

        let cardElementFace = document.createElement('div');
        cardElementFace.classList.add(face);

        if(face === FRONT){
            let iconElement = document.createElement('img');
            iconElement.classList.add(ICON);
            iconElement.src = "./assets/" + card.icon + ".jpg";
            cardElementFace.appendChild(iconElement)

        }else {
            let iconElement = document.createElement('img');
            iconElement.classList.add(ICON);
            iconElement.src = "./assets/nuvem.png";
            cardElementFace.appendChild(iconElement)
        }

        element.appendChild(cardElementFace);
    }

function flipCard(){

    if (game.setCard(this.id)) {

    this.classList.add("flip");
    if(game.secondCard) {
    if(game.checkMath()){
        game.clearCards();
        if(game.checkGameOver()) {

            let gameOverLayer = document.getElementById("gameOver")
            gameOverLayer.style.display = 'flex';

        }

    }else{
        setTimeout(() => {
        let firstCardView = document.getElementById(game.firstCard.id);
        let secondCardView = document.getElementById(game.secondCard.id);

        firstCardView.classList.remove('flip');
        secondCardView.classList.remove('flip');
        game.unflipCards();
        }, 800);

    }    
    }

    }

}

function restart() {
    
    startGame();
    let gameOverLayer = document.getElementById("gameOver")
            gameOverLayer.style.display = 'none';

}
