
const placeSize=10;
const rows=30;
const cols=30;

var xSnake=placeSize*15;
var ySnake=placeSize*15;

var snakePieces=[];

var xDir=0;
var yDir=0;

var xFood;
var yFood;

var pts=1;

var lvl=100;
var countpts=0;

var gameOver=false;
var interval;
var allowKeys;


window.onload = windowRun();

function play(){

    if (gameOver){
        return
    }

    board.fillStyle="white";
    board.fillRect(0,0,cvs.height,cvs.width);

    board.fillStyle="red";
    board.fillRect(xFood,yFood,placeSize,placeSize);

    if (xFood==xSnake && yFood==ySnake){
        
        snakePieces.push([xFood,yFood]);
        newFood();

        countpts=snakePieces.length;
        pts=pts+countpts;
        let credits=document.getElementById("credits");
        credits.innerHTML=`Points:${pts}`;


    }

    for (let i = snakePieces.length-1; i > 0; i--) {
        snakePieces[i] = snakePieces[i-1];
    }
    if (snakePieces.length) {
        snakePieces[0] = [xSnake, ySnake];
    }

    board.fillStyle="black";
    xSnake=xSnake+(xDir*10);
    ySnake=ySnake+(yDir*10);
    board.fillRect(xSnake,ySnake,placeSize,placeSize);
    for (let i = 0; i < snakePieces.length; i++) {
        board.fillRect(snakePieces[i][0], snakePieces[i][1], placeSize, placeSize);
    }

    if (xSnake < 0 || xSnake >= cols*placeSize || ySnake < 0 || ySnake >= rows*placeSize) {
        gameOver = true;
        

        ggameOver();
    }

    for (let i = 0; i < snakePieces.length; i++) {
        if (xSnake == snakePieces[i][0] && ySnake == snakePieces[i][1]) {
            gameOver = true;
            
            ggameOver();
        }
    }




}


function newFood(){

    xFood=Math.floor(Math.random()*30)*10;
    yFood=Math.floor(Math.random()*30)*10;

}


function moveSnake(e) {

    if (e.code == "ArrowUp" && yDir!=1) {
        xDir = 0;
        yDir = -1;
    }
    else if (e.code == "ArrowDown" && yDir!=-1) {
        xDir = 0;
        yDir = 1;
    }
    else if (e.code == "ArrowLeft" && xDir!=1) {
        xDir = -1;
        yDir = 0;
    }
    else if (e.code == "ArrowRight" && xDir!=-1) {
        xDir = 1;
        yDir = 0;
    }
}

function windowRun(){

    cvs=document.getElementById("board");
    board=cvs.getContext("2d");
    cvs.height=rows*placeSize;
    cvs.width=cols*placeSize;

    newFood();
    document.addEventListener("keyup",moveSnake);
    runSnake(100);

}

function runSnake(ms){

    interval=setInterval(play,ms);
    allowKeys=true;

}

function ggameOver(){

    clearInterval(interval);
    allowKeys=false;

    let msg=document.getElementById("contCanvas");
    msg.innerHTML=`<p class="gameOverFx">GAME OVER</p><h3 class="letStyle">Your score was: ${pts}</h3><button id="playAgain" class="buttonStyle2">PLAY AGAIN</button>`

    let again=document.getElementById("playAgain").addEventListener("click",initSnake);


    document.getElementById("gameStats").setAttribute("hidden","hidden");


}


function initSnake(){

xSnake=placeSize*15;
ySnake=placeSize*15;
snakePieces=[];
xDir=0;
yDir=0;
pts=1;
lvl=100;
countpts=0;
gameOver=false;

    document.getElementById("gameStats").removeAttribute("hidden");

    let canv=document.getElementById("contCanvas");
    canv.innerHTML=`<canvas id="board"></canvas>`

    let credits=document.getElementById("credits");
        credits.innerHTML=`Points: 0`;


    windowRun();



    

}