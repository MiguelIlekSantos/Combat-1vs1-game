window.addEventListener("resize", () => {
    location.reload();
})

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');

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

const JogadorOne = new Jogador(ctx,tecladoOne,window);
const JogadorTwo = new Jogador(ctx,tecladoTwo,window);

JogadorTwo.positionX = 0;


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


function verifyIfPlayersAreInTheSameSpace() {
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
    ctx.clearRect(0,0,canvas.width,canvas.height);

    verifyIfPlayersAreInTheSameSpace();

    JogadorOne.desenhar();
    JogadorTwo.desenhar();
    requestAnimationFrame(game);

}


game();






