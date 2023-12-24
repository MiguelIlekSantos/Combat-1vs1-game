window.addEventListener("resize", () => {
    location.reload();
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
const HPNumberOne = document.getElementById("numberValueOne");
const HPNumberBarOne = document.getElementById("progressBarOne");
const HPNumberTwo = document.getElementById("numberValueTwo");
const HPNumberBarTwo = document.getElementById("progressBarTwo");
const windowRestart = document.getElementById("window-restart");
const playAgainBtn = document.getElementById("play-again");

playAgainBtn.addEventListener("click", () => {
    location.reload();
})


var HP_PlayerOne = 10000;
var HP_PlayerTwo = 10000;

const tecladoOne = {
    direita:false,
    esquerda:false,
    cima:false,
    baixo:false,
    attack:false
}
const tecladoTwo = {
    direita:false,
    esquerda:false,
    cima:false,
    baixo:false,
    attack:false
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const JogadorOne = new Jogador(ctx,tecladoTwo,window);
const JogadorTwo = new Jogador(ctx,tecladoOne,window);

JogadorTwo.positionX = window.innerWidth - 150;


window.addEventListener("keydown", (event) => {
    if (event.keyCode == 37) { //esquerda
        tecladoOne.esquerda = true;
    } else if (event.keyCode == 39) { //direita
        tecladoOne.direita = true;
    }
    if (event.keyCode == 38) { //cima
        tecladoOne.cima = true;
    } else if (event.keyCode == 40) { // baixo
        tecladoOne.baixo = true;
    }
    if (event.keyCode == 65) { //esquerda
        tecladoTwo.esquerda = true;
    } else if (event.keyCode == 68) { //direita
        tecladoTwo.direita = true;
    }
    if (event.keyCode == 87) { //cima
        tecladoTwo.cima = true;
    } else if (event.keyCode == 83) { // baixo
        tecladoTwo.baixo = true;
    }
    if(event.keyCode == 70){     // tecla F
        tecladoTwo.attack = true;
    }
    if(event.keyCode == 75){     // tecla K
        tecladoOne.attack = true;
    }

});

window.addEventListener("keyup", (event) => {
    if (event.keyCode == 37) { //esquerda
        tecladoOne.esquerda = false;
    } else if (event.keyCode == 39) { //direita
        tecladoOne.direita = false;
    }
    if (event.keyCode == 38) { //cima
        tecladoOne.cima = false;
    } else if (event.keyCode == 40) { // baixo
        tecladoOne.baixo = false;
    }
    if (event.keyCode == 65) { //esquerda
        tecladoTwo.esquerda = false;
    } else if (event.keyCode == 68) { //direita
        tecladoTwo.direita = false;
    }
    if (event.keyCode == 87) { //cima
        tecladoTwo.cima = false;
    } else if (event.keyCode == 83) { // baixo
        tecladoTwo.baixo = false;
    }
    if(event.keyCode == 70){    // tecla F
        tecladoTwo.attack = false;
    }
    if(event.keyCode == 75){
        tecladoOne.attack = false;  // tecla K
    }
});


function verifyPlayersLocationAndDamage() {
    if(JogadorOne.positionXSword <= JogadorTwo.positionX + 50 && JogadorOne.positionXSword >= JogadorTwo.positionX - 50 && JogadorOne.positionYSword <= JogadorTwo.positionY + 100 && JogadorOne.positionYSword >= JogadorTwo.positionY - 100 && JogadorOne.teclado.attack){
        HP_PlayerTwo -= 50;
    }
    if(JogadorTwo.positionXSword <= JogadorOne.positionX + 50 && JogadorTwo.positionXSword >= JogadorOne.positionX - 50 && JogadorTwo.positionYSword <= JogadorOne.positionY + 100 && JogadorTwo.positionYSword >= JogadorOne.positionY - 100 && JogadorTwo.teclado.attack){
        HP_PlayerOne -= 50;
    }

    if(JogadorOne.positionX <= JogadorTwo.positionX + 50 && JogadorOne.positionX >= JogadorTwo.positionX - 50 && JogadorOne.positionY <= JogadorTwo.positionY + 100 && JogadorOne.positionY >= JogadorTwo.positionY - 100){
        if(JogadorOne.positionX > JogadorTwo.positionX){
            JogadorOne.positionX+=JogadorOne.velo
            JogadorOne.positionY+=JogadorOne.velo
            JogadorTwo.positionX-=JogadorOne.velo
            JogadorTwo.positionY-=JogadorOne.velo
        }else if(JogadorOne.positionX < JogadorTwo.positionX){
            JogadorOne.positionX-=JogadorOne.velo
            JogadorOne.positionY-=JogadorOne.velo
            JogadorTwo.positionX+=JogadorOne.velo
            JogadorTwo.positionY+=JogadorOne.velo
        }if(JogadorOne.positionY > JogadorTwo.positionY){
            JogadorOne.positionX+=JogadorOne.velo
            JogadorOne.positionY+=JogadorOne.velo
            JogadorTwo.positionX-=JogadorOne.velo
            JogadorTwo.positionY-=JogadorOne.velo
        }else if(JogadorOne.positionY < JogadorTwo.positionY){
            JogadorOne.positionX-=JogadorOne.velo
            JogadorOne.positionY-=JogadorOne.velo
            JogadorTwo.positionX+=JogadorOne.velo
            JogadorTwo.positionY+=JogadorOne.velo
        }
    }
}


const game = () => {
    HPNumberOne.innerHTML = HP_PlayerOne;
    HPNumberTwo.innerHTML = HP_PlayerTwo;
    HPNumberBarOne.value = HP_PlayerOne;
    HPNumberBarTwo.value = HP_PlayerTwo;
    if(HP_PlayerOne == 0 || HP_PlayerTwo == 0){
        windowRestart.style.display = "flex";
        window.removeEventListener("keydown");
        window.removeEventListener("keyup");
    }

    ctx.clearRect(0,0,canvas.width,canvas.height);

    verifyPlayersLocationAndDamage();

    JogadorOne.desenhar();
    JogadorTwo.desenhar();
    requestAnimationFrame(game);

}


game();






