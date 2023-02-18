const cardNum=["A","2","3","4","5","6","7","8","9","10","J","Q","K"];
const cardTyp=["TREBOL","DIAMANTES","CORAZONES","PICAS"];
var playerCoins=1000;
var value;
let deck=[];
let playerHand=[];
let iaHand=[];
let playerSum;
let iaSum;
let cardHidden;
let actualBet=0;

let player=sessionStorage.getItem(`playerName`);
player=player.toUpperCase();
document.getElementById("name2").innerHTML=`${player}`;



construirDeck();
barajarDeck();


document.getElementById("coin-1").addEventListener(`click`,function(){placeBet("coin-1")});
document.getElementById("coin-5").addEventListener(`click`,function(){placeBet("coin-5")});
document.getElementById("coin-10").addEventListener(`click`,function(){placeBet("coin-10")});
document.getElementById("coin-50").addEventListener(`click`,function(){placeBet("coin-50")});
document.getElementById("coin-100").addEventListener(`click`,function(){placeBet("coin-100")});
document.getElementById("coin-500").addEventListener(`click`,function(){placeBet("coin-500")});

document.getElementById("restart").addEventListener(`click`,initTable);

document.getElementById("bet").addEventListener(`click`,() =>{

    if (actualBet>0){

    startRound();
    refreshPoints();

    if (checkBlackJack(playerHand)===true) {

        drawHiddenCard();

        if (checkBlackJack(iaHand)===false){

            showWin();
            payBlackJack();
            document.getElementById("restart").removeAttribute("hidden");
            document.getElementById("bet").setAttribute("hidden","hidden");

        } else {
            showDraw();
            document.getElementById("restart").removeAttribute("hidden");
            document.getElementById("bet").setAttribute("hidden","hidden");
            payDraw();
        
        }

    } else {

            document.getElementById("bet").setAttribute("hidden","hidden");
            document.getElementById("hit").removeAttribute("hidden");
            document.getElementById("stand").removeAttribute("hidden");
            document.getElementById("bets").style.display="none";

    }

    }

});

document.getElementById("hit").addEventListener(`click`,() =>{

    hitCard(playerHand,"cardsPlayer","playerCard");
    refreshPoints();

    if (!isUnder21(playerHand)) {

        drawHiddenCard();

        document.getElementById("restart").removeAttribute("hidden");
        document.getElementById("hit").setAttribute("hidden","hidden");
        document.getElementById("stand").setAttribute("hidden","hidden");
        showLose();

    }


});

document.getElementById("stand").addEventListener(`click`,() =>{

    drawHiddenCard();

    document.getElementById("restart").removeAttribute("hidden");
    document.getElementById("hit").setAttribute("hidden","hidden");
    document.getElementById("stand").setAttribute("hidden","hidden");

    var endTurn=false;

    while (endTurn===false){

        if (iaSum<=16) {

            hitCard(iaHand,"cardsIa","iaCard");

        } else if ((iaSum>16) && (iaSum<=21)){

            endTurn=true;
            checkWinner()

        } else {

            showWin();
            endTurn=true;
            payWin();
        }

    }



})

function construirDeck(){

    for (let i=0; i<4; i++){
        for (let j=0; j<13; j++){
            deck.push(cardNum[j] + "-" + cardTyp[i]);
        }
    }
}

function barajarDeck(){
    for (let i=0; i<52; i++){
        
        let sh=Math.trunc(Math.random()*52);
        let backup=deck[i];
        deck[i]=deck[sh];
        deck[sh]=backup;
    }
}

function placeBet(valueId){

    let img;
    value=valueId;
    

    switch (value) {
        case "coin-1": value=1; img='<img id="coin-1" src="../sources/img/COINS/coin-1.png" width="32px">';
        break;
        case "coin-5": value=5; img=`<img id="coin-5" src="../sources/img/COINS/coin-5.png" width="32px">`;
        break;
        case "coin-10": value=10; img=`<img id="coin-10" src="../sources/img/COINS/coin-10.png" width="32px">`;
        break;
        case "coin-50": value=50; img=`<img id="coin-50" src="../sources/img/COINS/coin-50.png" width="32px"></img>`;
        break;
        case "coin-100": value=100; img=` <img id="coin-100" src="../sources/img/COINS/coin-100.png" width="32px">`;
        break;
        case "coin-500": value=500; img=`<img id="coin-500" src="../sources/img/COINS/coin-500.png" width="32px" alt=""></img>`;
        break;
    }

    if (Number(value)<=playerCoins){

        actualBet=actualBet+value;
        playerCoins=playerCoins-value;

        const newCoin=document.createElement("div");
        newCoin.innerHTML=img;
        const addCoin=document.getElementById("betHolder");
        addCoin.appendChild(newCoin);

        let coins = document.getElementById("startCoins");
        coins.innerHTML=playerCoins;



       }

}


function drawCard(card,where,dato){
    
    let newCard=document.createElement("div");
    const dir=`../sources/img/cards/${card}.png`;
    let cardImg=document.createElement("img");
    cardImg.src=dir;
    const placeId=document.getElementById(`${where}`);
    newCard.appendChild(cardImg);
    newCard.setAttribute("id",`${dato}`);
    placeId.appendChild(newCard);

}

function drawHiddenCard(){

    let del = document.getElementById("hiddenCard");
    del.parentNode.removeChild(del);
    iaHand.push(cardHidden);
    drawCard(iaHand[1],"cardsIa","iaCard");
    refreshPoints();
}

function startRound(){

    playerHand.push(deck.shift());
    iaHand.push(deck.shift());
    playerHand.push(deck.shift());
    cardHidden=deck.shift();

    drawCard(playerHand[0],"cardsPlayer","playerCard");
    drawCard(iaHand[0],"cardsIa","iaCard");
    drawCard(playerHand[1],"cardsPlayer","playerCard");
    drawCard("BACKCARD","cardsIa","hiddenCard");


}

function hitCard(player,handId,cardId){

    let long=player.length;
    player.push(deck.shift());

    drawCard(player[long],`${handId}`,`${cardId}`);
    refreshPoints();
    
}

function handPts(whoIsPlaying){

    let length=whoIsPlaying.length;
    let sum=0;
    let count=0;

    for (let i = 0; i < length; i++) {
    
        let num=cardValue(whoIsPlaying[i]);
        sum=sum+num;

        if (11==cardValue(whoIsPlaying[i])){

            count=count+1;
        }

    }

    while ((sum>21) && (count>0)){

        sum=sum-10;
        count=count-1;
        
    }

    return sum; 
}


function cardValue(card){ //Es necesario pasarle la primer posicion de la cadena Card.

    var letter=card.charAt(0);

    switch (letter){
        
        case "A":
            return 11;
        break
    
        case "J":
            return 10;
        break 
    
        case "Q":
            return 10;
        break
    
        case "K":
            return 10;
        break

        case "1":
            return 10;
    
        default:
            return Number(letter);
        
    }
}


function checkBlackJack(hand){

    let card1=cardValue(hand[0].charAt(0));
    let card2=cardValue(hand[1].charAt(0));

    if ((card1+card2)===21){

        return true;

    } else return false;


}


function refreshPoints(){
    iaSum=handPts(iaHand);
    playerSum=handPts(playerHand);
    document.getElementById("iaHandPts").innerHTML=iaSum;
    document.getElementById("playerHandPts").innerHTML=playerSum;
}

function isUnder21(hand){

    var pts=handPts(hand);

    if (pts <= 21) {

        return true;
    } else return false;
}

function checkWinner(){

    if (iaSum<playerSum){
        showWin();
        payWin();

    }else if (iaSum>playerSum){

        
        showLose();

    } else {

        showDraw();
        payDraw();
    }
}

function payWin(){

    playerCoins=playerCoins+(actualBet*2);
    let coins = document.getElementById("startCoins");
    coins.innerHTML=playerCoins;
}

function payBlackJack(){
    playerCoins=playerCoins+(actualBet*(3/2))
    let coins = document.getElementById("startCoins");
    coins.innerHTML=playerCoins;
}

function payDraw(){
    playerCoins=playerCoins+actualBet;
    let coins = document.getElementById("startCoins");
    coins.innerHTML=playerCoins;
}

function initTable(){

    for (i=0; i<playerHand.length; i++){

    let delCards = document.getElementById("playerCard");
    delCards.parentNode.removeChild(delCards);
        
    }
    
    for (i=0; i<iaHand.length; i++){

        let delCards = document.getElementById("iaCard");
        delCards.parentNode.removeChild(delCards);
            
        }

    let del = document.getElementById("betHolder");
    del.innerHTML="";

    deck=[];
    playerHand=[];
    iaHand=[];
    playerSum=0;
    iaSum=0;
    cardHidden=[];
    actualBet=0;
    construirDeck();
    barajarDeck();
    document.getElementById("bet").removeAttribute("hidden");
    document.getElementById("restart").setAttribute("hidden","hidden");

    refreshPoints();
    document.getElementById("bets").style.display="flex";

}


function showWin(){

    let div=document.getElementById("betHolder");
    div.innerHTML="<h3>YOU WIN!</h2>";

}

function showLose(){

    let div=document.getElementById("betHolder");
    div.innerHTML="<h3>YOU LOSE!</h2>";
    gameOver();
    

}

function showDraw(){

    let div=document.getElementById("betHolder");
    div.innerHTML="<h3>TIE!</h2>";
    

}

function gameOver(){

    if (playerCoins<1){

    document.getElementById("restart").setAttribute("hidden","hidden");
    let div=document.getElementById("betHolder");
    div.innerHTML="<h3>YOU RUN OUT OF COINS!</h2>";
    

    setTimeout(screan,3000);
    setTimeout(res,3500);

    function res(){
        document.getElementById("restart").removeAttribute("hidden");

    }

    }

    function screan(){

    div=document.querySelector('body');
    div.innerHTML='<p class="gameOverFx">GAME OVER</p>';
    div.className+=" bodyGameOver";

    }

}

function restartGame(){

}