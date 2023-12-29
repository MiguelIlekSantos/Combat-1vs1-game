class Jogador {

    constructor(ctx, teclado, window, canvas) {
        this.ctx = ctx;
        this.teclado = teclado;
        this.DisplayImage;

        this.jogador = new Image();
        this.jogador.src = 'img/Sprites.png';
        this.jogador.addEventListener("load", () => {
            this.recortWidth = this.jogador.width / 3;
            this.recortHeight = this.jogador.height / 4;
            this.desenhar();
        })

        
        this.jogadorNoSword = new Image();
        this.jogadorNoSword.src = 'img/Sprites-no-sword.png';
        this.jogadorNoSword.addEventListener("load", () => {
            this.recortWidth = this.jogadorNoSword.width / 3;
            this.recortHeight = this.jogadorNoSword.height / 4;
            this.desenhar();
        })

        this.originRecortX = 0;
        this.originRecortY = 0;
        this.velo = 10;
        this.imageWidth = 100;
        this.imageHeight = 100;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.positionX = 0;
        this.positionY = this.canvasHeight * 0.55;
        
        this.sword = new Image();
        this.sword.src = 'img/Sword.png';
        this.sword.addEventListener("load", () => {
            this.recortHeightSword = this.sword.height / 4;
            this.recortWidthSword = this.sword.width;
            this.desenhar();
        })
        this.originRecortXSword = 0;
        this.originRecortYSword = 0;
        this.positionXSword = 0;
        this.positionYSword = 0;
        this.swordDirection = 0;


    }

    XrecortManager() {
        if (this.originRecortX == 0) {
            this.originRecortX = 645;
        } else if (this.originRecortX == 645) {
            this.originRecortX = 1285;
        } else {
            this.originRecortX = 0;
        }
    }

    atk(value) {
        switch (value) {
            case 1:
                this.originRecortYSword = 0;
                this.positionXSword = this.positionX - 60;
                this.positionYSword = this.positionY + 20;
                this.DisplayImage = this.jogadorNoSword;
                break;
            case 2:
                this.originRecortYSword = this.recortHeightSword * 2
                this.positionXSword = this.positionX + 60;
                this.positionYSword = this.positionY + 20;
                this.DisplayImage = this.jogadorNoSword;
                break;
            case 3:
                this.originRecortYSword = this.recortHeightSword * 3
                this.positionYSword = this.positionY - 60;
                this.positionXSword = this.positionX;
                this.DisplayImage = this.jogadorNoSword;
                break;
            case 4:
                this.originRecortYSword = this.recortHeightSword
                this.positionYSword = this.positionY + 60;
                this.positionXSword = this.positionX;
                this.DisplayImage = this.jogadorNoSword;
                break;
        }

        ctx.drawImage(
            this.sword,
            this.originRecortXSword,
            this.originRecortYSword,
            this.recortWidthSword,
            this.recortHeightSword,
            this.positionXSword,
            this.positionYSword,
            this.imageWidth,
            this.imageHeight
        );
    }


    gerenciar() {
        if (this.teclado.esquerda) {
            this.originRecortY = this.recortHeight * 2;
            this.positionX -= this.velo;
            this.XrecortManager();
            this.swordDirection = 1;
        }
        if (this.teclado.direita) {
            this.originRecortY = this.recortHeight * 1;
            this.positionX += this.velo;
            this.XrecortManager();
            this.swordDirection = 2;
        }
        if (this.teclado.cima) {
            this.originRecortY = this.recortHeight * 3;
            this.positionY -= this.velo;
            this.XrecortManager();
            this.swordDirection = 3;
        }
        if (this.teclado.baixo) {
            this.originRecortY = 0;
            this.positionY += this.velo;
            this.XrecortManager();
            this.swordDirection = 4;
        }

        if (this.positionX < -30) {
            this.positionX += this.velo;
        } else if (this.positionX > this.canvasWidth - this.imageWidth + 30) {
            this.positionX = this.canvasWidth - this.imageWidth + 30;
        }
        if (this.positionY < -20) {
            this.positionY += this.velo;
        } else if (this.positionY > this.canvasHeight * 0.55) {
            this.positionY = this.canvasHeight * 0.55;
        }

    }

    desenhar() {
        
        if (this.teclado.attack) {
            this.atk(this.swordDirection);
        }else{
            this.DisplayImage = this.jogador
        }

        this.gerenciar();

        ctx.drawImage(
            this.DisplayImage,
            this.originRecortX,
            this.originRecortY,
            this.recortWidth,
            this.recortHeight,
            this.positionX,
            this.positionY,
            this.imageWidth,
            this.imageHeight
        );
    }

}