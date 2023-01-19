//Bienvenida al juego.

let player = prompt("Ingresa tu nombre");
alert(`Hola ${player}, te damos la bienvenida a Piedra, Papel o Tijera.\n\n Pulsa Enter para avanzar`);

//Explicar instrucciones.

alert(`Por cada ronda ganada el jugador sumara 1 punto.\nEl primero en alcanzar 3 puntos, ganara la partida.\n\n Pulsa Enter para avanzar `);

//Jugador elige piedra, papel o tijera.

let correctChoice = false;
let playerChoice;
let playerPts;
let iaPts;
let newGame=1;

while (newGame=="1"){
    
    playerPts=0;
    iaPts=0;

    while ((playerPts<3) && (iaPts<3)){

        correctChoice=false;

        while (correctChoice === false) {

            playerChoice = prompt(`Escribe "Piedra", "Papel" o "Tijera" para elegir tu proxima jugada!`);

            playerChoice=playerChoice.toUpperCase();

            if (playerChoice !== "PIEDRA" && playerChoice !== "PAPEL" && playerChoice !== "TIJERA"){
                alert(`No elegiste una opcion valida! Por favor vuelve a ingresar tu jugada!`);
            }
            else { correctChoice = true;
                alert(`Elegiste ${playerChoice}!\n\n Pulsa Enter para avanzar`) }

        }


        //Adversario elige aleatoriamente Piedra, papel o Tijera.

        function RandomNum1to9(){

            let num = Math.random();
            num = num * (9.9 - 1) + 1;
            num = Math.trunc(num);

            return num;

        }

        let randomNum = RandomNum1to9();
        let iaChoice;

        if (randomNum==1 || randomNum==4 || randomNum==7) {
            iaChoice="PIEDRA";
        } else if (randomNum==2 || randomNum==5 || randomNum==8) {
            iaChoice="PAPEL";
        } else if (randomNum==3 || randomNum==6 || randomNum==9) {
            iaChoice="TIJERA";
        }

        //Mostramos mensaje Adversario eligiendo su jugada- Pulsar tecla para continuar.

        alert(`El rival esta eligiendo su jugada!\n\n Pulsa Enter para avanzar`);


        //Comparamos las elecciones y decidimos el resultado.

        if ((playerChoice==="PIEDRA" && iaChoice==="TIJERA") || (playerChoice==="PAPEL" && iaChoice==="PIEDRA") || (playerChoice==="TIJERA" && iaChoice==="PAPEL")){

            ++playerPts;
            showWinner(player);

        } else if ((iaChoice==="PIEDRA" && playerChoice==="TIJERA") || (iaChoice==="PAPEL" && playerChoice==="PIEDRA") || (iaChoice==="TIJERA" && playerChoice==="PAPEL")){

            ++iaPts;
            showWinner("Rival");

        } else showDraw();




        //Mostramos el resultado en pantalla.

        function showWinner(winner) {
            
            alert(`${player}-${playerChoice} vs ${iaChoice}-Rival\n\n${winner} ha ganado esta ronda!\n\nPuntuacion parcial:\n${player}: ${playerPts}\nRival: ${iaPts} `)
            
        }

        function showDraw(){

            alert(`${player}-${playerChoice} vs ${iaChoice}-Rival\n\nTenemos un empate!\n\nPuntuacion parcial:\n${player}: ${playerPts}\nRival: ${iaPts} `)

        }


    }



//Pedir que seleccione si quiere jugar denuevo o jugar a otro juego.

    newGame=0;

    while (newGame!=="1" && newGame !=="2"){

        newGame = prompt(`¿Te gustaria jugar otra partida?\n\n1-Para jugar una nueva partida\n2-Para salir del juego`);

        if (newGame!=="1" && newGame !=="2"){

            alert(`No has elegido una opcion valida! Por favor vuelve a escribir tu seleccion!`)

        }

    }

}