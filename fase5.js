import {
    gameover5
} from "./gameover5.js";
import {
    fase6
} from "./fase6.js";

//criação do player 1
var player;

//criação de inimigos
var inimigo;
var boneco1;
var boneco2;
var boneco3;
var boneco4;


//plataformas/icones na tela
var scoreText;
var scoreJogador1 = 0;
var platforms;

//parte de coletáveis
var binarios;
var binarios2;
var pl;
var pl2;
var indutor;


//movimtação de câmeras
var moveCam = false;

//movimentação personagens
var cursors;
var pointer;


//mudança de cena
var gameOver = false;
var proximafase = false;
var portas;

//adicionando sons
var fundodojogo;
var coleta;

//criação de letreiro
var letreiro;

var fase5 = new Phaser.Scene("fase5");

fase5.preload = function () {
    //carregando imagens em geral
    this.load.image("parede", "assets/parede.png");
    this.load.image("ground", "assets/plataforma.png");
    this.load.image("bloco", "assets/bloco.png");
    this.load.image("blocolongo", "assets/bloco2.png");
    this.load.image("porta", "assets/portaverde.png");
    this.load.image("letreiro5", "assets/fases/fase5/fase5.png");

    //animações dos personagem
    this.load.spritesheet("idle", "assets/ifiano/idle.png", {
        frameWidth: 38,
        frameHeight: 62
    });
    this.load.spritesheet("run", "assets/ifiano/run.png", {
        frameWidth: 43,
        frameHeight: 62
    });
    this.load.spritesheet("runleft", "assets/ifiano/runleft.png", {
        frameWidth: 43,
        frameHeight: 62
    });

    //animação da porta
    this.load.spritesheet("saida", "assets/saida.png", {
        frameWidth: 60,
        frameHeight: 85
    });


    //animação coletáveis
    //coletavel1
    this.load.spritesheet("capacitor", "assets/fases/fase5/capacitor.png", {
        frameWidth: 18,
        frameHeight: 18
    });
    //coletavel2
    this.load.spritesheet("indutor", "assets/fases/fase5/indutor.png", {
        frameWidth: 52,
        frameHeight: 20
    });


    //animação inimigo
    this.load.spritesheet("diodo", "assets/fases/fase5/diodo.png", {
        frameWidth: 32,
        frameHeight: 22
    });


    //fullscreen
    this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
        frameWidth: 64,
        frameHeight: 64
    });

    // d-pad
    this.load.spritesheet("esquerda", "assets/esquerda.png", {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.spritesheet("direita", "assets/direita.png", {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.spritesheet("cima", "assets/cima.png", {
        frameWidth: 64,
        frameHeight: 64
    });

    //audios do jogo
    this.load.audio("fundodojogo", "assets/sons/fundodojogo.mp3");
    this.load.audio("coleta", "assets/sons/coleta.mp3");
};

fase5.create = function () {
    // Teclado alfanumérico
    cursors = this.input.keyboard.createCursorKeys();

    //parte de movimentação de cameras
    this.cameras.main.setBounds(0, 0, 3200, 600);
    this.physics.world.setBounds(0, 0, 3200, 600);

    //parte de tela dupla no jogo local, ajutar alguns detalhes
    //this.cameras.main.setSize(800, 300);
    //this.cameras.add(0, 300, 800, 300);

    //  colocando a imagem de fundo
    this.add.image(400, 300, "parede");
    this.add.image(1200, 300, "parede");
    this.add.image(2000, 300, "parede");
    this.add.image(2800, 300, "parede");



    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    letreiro = this.physics.add.staticGroup();

    //posicionando letreiro
    letreiro
        .create(400, 200, "letreiro5")
        .setScale(8)
        .refreshBody();

    //  criando chão 

    platforms
        .create(400, 700, "ground")
        .setScale(2)
        .refreshBody(); // chão
    platforms
        .create(1200, 700, "ground")
        .setScale(2)
        .refreshBody(); //chão
    platforms
        .create(2000, 700, "ground")
        .setScale(2)
        .refreshBody(); //chão
    platforms
        .create(2800, 700, "ground")
        .setScale(2)
        .refreshBody(); //chão


    //criando plataformas
    //escadinha
    platforms
        .create(600, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1 
    platforms
        .create(400, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2 
    platforms
        .create(800, 350, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3 

    //primeira linha
    platforms
        .create(1104, 445, "blocolongo") //nível 1  eixo Y 127
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms
        .create(1308, 445, "blocolongo") //nível 2 eixo Y 
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms
        .create(1512, 445, "blocolongo") //nível 2 eixo Y 
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms

    //segunda linha
    platforms
        .create(1104, 245, "blocolongo") //nível 1  eixo Y 127
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms
        .create(1308, 245, "blocolongo") //nível 2 eixo Y 
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms
        .create(1512, 245, "blocolongo") //nível 2 eixo Y 
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();

    //coluna1
    platforms
        .create(1800, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(1800, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3
    platforms
        .create(1800, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1

    //coluna2
    platforms
        .create(2200, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(2200, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1

    //obstáculo3
    //parte2
    platforms
        .create(2700, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3
    platforms
        .create(2700, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(2700, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    //parte1
    platforms
        .create(2600, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(2600, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel2
    //parte3
    platforms
        .create(2800, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(2800, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(2800, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(2800, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel4
    //------------------------------------------------

    // adicionando player ao jogo
    player = this.physics.add.sprite(100, 450, "idle");

    //parte do player com cameras
    this.cameras.main.startFollow(
        player,
        true,
        0.05,
        0.05
    );

    //colição do player com as bordas do mapa
    player.setCollideWorldBounds(true);

    //  criando animação do personagem
    this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers(
            "runleft", {
                start: 0,
                end: 15
            }
        ),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({
        key: "turn",
        frames: this.anims.generateFrameNumbers("idle", {
            start: 0,
            end: 25
        }),
        frameRate: 25,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("run", {
            start: 0,
            end: 15
        }),
        frameRate: 25,
        repeat: -1
    });

    //animação de morte
    /*this.anims.create({
      key: "dead",
      frames: this.anims.generateFrameNumbers("dead", {
        start: 0,
        end: 16
      }),
      frameRate: 10,
      repeat: 0
    });*/



    //animação da porta
    this.anims.create({
        key: "saida",
        frames: this.anims.generateFrameNumbers(
            "saida", {
                start: 0,
                end: 4
            }
        ),
        frameRate: 1,
        repeat: 0
    });
    //animação do 'inimigo'
    this.anims.create({
        key: "animediodo",
        frames: this.anims.generateFrameNumbers(
            "diodo", {
                start: 0,
                end: 16
            }
        ),
        frameRate: 5,
        repeat: -1
    });

    //animação coletável1
    this.anims.create({
        key: "animeindutor",
        frames: this.anims.generateFrameNumbers(
            "indutor", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });
    //animação coletável2
    this.anims.create({
        key: "animecapacitor",
        frames: this.anims.generateFrameNumbers(
            "capacitor", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });

    //------------------------------------------------

    //adicionando sons

    // efeito de coleta
    coleta = this.sound.add("coleta");

    // musica de fundo

    fundodojogo = this.sound.add("fundodojogo");
    fundodojogo.play({
        loop: true,
        volume: 1
    });

    //---------------------------------------------------------

    //adicionando coletáveis ao jogo

    //coletavel1 
    binarios = this.physics.add.group({
        key: "capacitor",
        repeat: 2,
        setXY: {
            x: 400,
            y: 200,
            stepX: 200
        }
    });



    /*binarios.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável2
    pl = this.physics.add.group({
        key: "indutor",
        repeat: 1,
        setXY: {
            x: 1100, //como adicionar mais de um ícone
            y: 250,

            stepX: 400
        }
    });
    //coletável3
    binarios2 = this.physics.add.group({
        key: "capacitor",
        repeat: 1,
        setXY: {
            x: 1100,
            y: 100,
            stepX: 400
        }
    });
    /*binarios2.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável4
    pl2 = this.physics.add.group({
        key: "indutor",
        repeat: 1,
        setXY: {
            x: 1800, //como adicionar mais de um ícone
            y: 200,

            stepX: 400
        }
    });

    //coletável5
    indutor = this.physics.add.group({
        key: "indutor",
        repeat: 0,
        setXY: {
            x: 1700,
            y: 500,
            stepX: 4000
        }
    });
    //----------------------------------------------------------


    //criando fica da porta/inimigo
    portas = this.physics.add.group();
    inimigo = this.physics.add.group();

    // placar do jogo
    scoreText = this.add.text(16, 16, "nota: 0", {
        fontSize: "32px",
        fill: "#000"
    });
    scoreText.setScrollFactor(0);

    //--------------------------------------------------

    //fullscreen
    var button = this.add
        .image(800 - 16, 16, "fullscreen", 0)
        .setOrigin(1, 0)
        .setInteractive();

    button.on(
        "pointerup",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);

                this.scale.stopFullscreen();
            } else {
                button.setFrame(1);

                this.scale.startFullscreen();
            }
        },
        this
    );
    button.setScrollFactor(0);

    var FKey = this.input.keyboard.addKey("F");

    FKey.on(
        "down",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(0);
                this.scale.stopFullscreen();
            } else {
                button.setFrame(1);
                this.scale.startFullscreen();
            }
        },
        this
    );
    //--------------------------------------------------------------

    //colisões

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(pl, platforms); //coletável com plataforma
    this.physics.add.collider(pl2, platforms); //coletável com plataforma
    this.physics.add.collider(binarios, platforms); //coletável com plataforma
    this.physics.add.collider(binarios2, platforms); //coletável com plataformas
    this.physics.add.collider(indutor, platforms); //coletável com plataformas
    this.physics.add.collider(portas, platforms); //porta com chão
    this.physics.add.collider(inimigo, platforms); //nimigo com chão

    //*------------------------------------------------------*
    //coletavel1
    this.physics.add.overlap(
        player,
        binarios,
        coletavel1,
        null,
        this
    );
    //coletavel2
    this.physics.add.overlap(
        player,
        pl,
        coletavel1,
        null,
        this
    );
    //coletavel3
    this.physics.add.overlap(
        player,
        binarios2,
        coletavel2,
        null,
        this
    );
    //coletavel4  
    this.physics.add.overlap(
        player,
        pl2,
        coletavel3,
        null,
        this
    );
    //coletavel5
    this.physics.add.overlap(
        player,
        indutor,
        coletavel3,
        null,
        this
    );

    //-----------------------------------------------

    //função mudar de fase
    this.physics.add.collider(
        player,
        portas,
        mudarfase,
        null,
        this
    );
    //-------------------------------------------
    //função de morte
    this.physics.add.collider(
        player,
        inimigo,
        hitBomb,
        null,
        this
    );
    //-------------------------------------------
    //adicionando inimigo1
    boneco1 = inimigo.create(2200, 444, "diodo");
    boneco1.setBounce(1);
    boneco1.setCollideWorldBounds(true);
    boneco1.setVelocityX(150);
    boneco1.allowGravity = false;
    boneco1.setScale(2);
    //boneco1.setCircle(23);

    //adicionando inimigo2
    boneco2 = inimigo.create(2000, 0, "diodo");
    boneco2.setBounce(1);
    boneco2.setCollideWorldBounds(true);
    boneco2.setVelocityY(101);
    boneco2.allowGravity = false;
    boneco2.setScale(2);
    // boneco2.setCircle(23);

    //adicionando inimigo3
    boneco3 = inimigo.create(2900, 200, "diodo");
    boneco3.setBounce(0);
    boneco3.setCollideWorldBounds(true);
    boneco3.setVelocityY(0);
    boneco3.allowGravity = false;
    boneco3.setScale(2);
    //boneco3.setCircle(23);

    //adicionando inimigo4
    boneco4 = inimigo.create(1000, 500, "diodo");
    boneco4.setBounce(0);
    boneco4.setCollideWorldBounds(true);
    boneco4.setVelocityX(100);
    boneco4.allowGravity = false;
    boneco4.setScale(2);
    //boneco3.setCircle(23);

    //movimentação por botões
    // Controle direcional por toque na tela
    //
    // Para a esquerda: correr
    var esquerda = this.add
        .image(50, 570, "esquerda", 0)
        .setInteractive()
        .setScrollFactor(0);
    esquerda.on("pointerover", () => {
        esquerda.setFrame(1);
        player.setVelocityX(-300);
        player.anims.play("left", true);
    });
    esquerda.on("pointerout", () => {
        esquerda.setFrame(0);
        player.setVelocityX(0);
        player.anims.play("turn", true);
    });
    //
    // Para a direita: correr
    var direita = this.add
        .image(124, 570, "direita", 0)
        .setInteractive()
        .setScrollFactor(0);
    direita.on("pointerover", () => {
        direita.setFrame(1);
        player.setVelocityX(300);
        player.anims.play("right", true);
    });
    direita.on("pointerout", () => {
        direita.setFrame(0);
        player.setVelocityX(0);
        player.anims.play("turn", true);
    });
    //
    // Para cima: pular
    var cima = this.add
        .image(750, 570, "cima", 0)
        .setInteractive()
        .setScrollFactor(0);
    cima.on("pointerover", () => {
        cima.setFrame(1);
        if (player.body.touching.down) {
            player.setVelocityY(-330);
        }
    });
    cima.on("pointerout", () => {
        cima.setFrame(0);
    })
};
//fim da função create
//----------------------------------------------

fase5.update = function () {

    //criação da camera
    var cam = this.cameras.main;

    //movimentação de cameras
    if (moveCam) {
        if (cursors.left.isDown) {
            cam.scrollX -= 4;
        } else if (cursors.right.isDown) {
            cam.scrollX += 4;
        }
    }

    if (cursors.up.isDown) {
        cam.scrollY -= 4;
    } else if (cursors.down.isDown) {
        cam.scrollY += 4;
    }

    /*//movimentação do personagem 1 no de mesa
    else if (cursors.left.isDown) {
        player.setVelocityX(-300);
        player.anims.play("left", true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(300);

        player.anims.play("right", true);
    } else if (cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
        player.setVelocityX(0);
        player.anims.play("turn");
    }
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }*/

    //-----------------------------------------------------

    //movimentação boneco1
    boneco1.anims.play("animediodo", true);
    /* if (boneco1.body.position.x - 1999 > 200) {
         boneco1.setVelocityX(-200);
         boneco1.setFlipX(false);
         boneco1.anims.play("animediodo", true);
     } else if (boneco1.body.position.x - 1999 < -200) {
         boneco1.setVelocityX(200);
         boneco1.setFlipX(true);
         boneco1.anims.play("animediodo", true);
}*/
    //animação do boneco2
    boneco2.anims.play("animediodo", true);


    //movimentação boneco3
    if (boneco3.body.position.x - 3000 > 10) {
        boneco3.setVelocityX(-300);
        boneco3.setFlipX(false);
        boneco3.anims.play("animediodo", true);
    } else if (boneco3.body.position.x - 3000 < -100) {
        boneco3.setVelocityX(300);
        boneco3.setFlipX(true);
        boneco3.anims.play("animediodo", true);
    }

    //movimentação boneco4
    if (boneco4.body.position.x - 999 > 500) {
        boneco4.setVelocityX(-290);
        boneco4.setFlipX(false);
        boneco4.anims.play("animediodo", true);
    } else if (boneco4.body.position.x - 999 < -300) {
        boneco4.setVelocityX(200);
        boneco4.setFlipX(true);
        boneco4.anims.play("animediodo", true);
    }

    //--------------------------------------------------

    //animação coletável1
    binarios.children.iterate(function (child) {

        child.anims.play("animecapacitor", true);
        child.setScale(2)
    });

    //animação coletável2
    pl.children.iterate(function (child) {

        child.anims.play("animeindutor", true);
    });

    //animação coletável3
    binarios2.children.iterate(function (child) {

        child.anims.play("animecapacitor", true);
        child.setScale(2)
    });
    //animação coletável4
    pl2.children.iterate(function (child) {

        child.anims.play("animeindutor", true);
    });
    //animação coletável5
    indutor.children.iterate(function (child) {

        child.anims.play("animeindutor", true);

    });

};


//fim do update

//-----------------------------------------------------------------

//icone1 de coleta
function coletavel1(player, binario) {
    binario.disableBody(true, true);

    //  adicionando +1 á nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (binarios.countActive(true) === 0) {
        //  novos coletáveis para coletar
        binarios.children.iterate(function (child) {
            child.enableBody(true, -300, 0, true, true);

        });

        /*var x =
          player.x < 400
            ? Phaser.Math.Between(400, 800)
            : Phaser.Math.Between(0, 400);*/

        var porta = portas.create(4000, 500, "saida");
        //this.physics.pause();
        //porta.setBounce(1);
        porta.setCollideWorldBounds(true);
        // porta.setVelocity(Phaser.Math.Between(-200, 200), 20);
        porta.allowGravity = true;
    }

    /*var porta = portas.create(500, 500, "saida");
    porta.setCollideWorldBounds(true);
    porta.allowGravity = true;*/

    coleta.play();
}

//-----------------------------------------
//ícone 2 de coleta
function coletavel2(player, p) {
    p.disableBody(true, true);

    //  adicionando +1 á nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (pl.countActive(true) === 0) {
        //  novos coletáveis para coletar
        pl.children.iterate(function (child) {
            child.enableBody(true, -300, 0, true, true);

        });

        //var x = (player.x < 400) // ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        /*var porta = portas.create(100, 500, "saida");
        //this.physics.pause();
        //porta.setBounce(1);
        porta.setCollideWorldBounds(true);
        // porta.setVelocity(Phaser.Math.Between(-200, 200), 20);
        porta.allowGravity = true;*/
    }
    /*var porta = portas.create(3000, 500, "saida");
    porta.setCollideWorldBounds(true);
    porta.allowGravity = true;*/

    coleta.play();
}

function coletavel3(player, b) {
    b.disableBody(true, true);

    //  adicionando +1 á nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (binarios2.countActive(true) === 0) {
        //  novos coletáveis para coletar
        binarios2.children.iterate(function (child) {
            child.enableBody(true, -300, 0, true, true);

        });

        //var x = (player.x < 400) // ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        /*var porta = portas.create(100, 500, "saida");
        //this.physics.pause();
        //porta.setBounce(1);
        porta.setCollideWorldBounds(true);
        // porta.setVelocity(Phaser.Math.Between(-200, 200), 20);
        porta.allowGravity = true;*/
    }
    /*var porta = portas.create(3000, 500, "saida");
    porta.setCollideWorldBounds(true);
    porta.allowGravity = true;*/

    coleta.play();
}

function coletavel4(player, l) {
    l.disableBody(true, true);

    //  adicionando +1 á nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (pl2.countActive(true) === 0) {
        //  novos coletáveis para coletar
        pl2.children.iterate(function (child) {
            child.enableBody(true, -300, 0, true, true);

        });

        //var x = (player.x < 400) // ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

        /*var porta = portas.create(100, 500, "saida");
        //this.physics.pause();
        //porta.setBounce(1);
        porta.setCollideWorldBounds(true);
        // porta.setVelocity(Phaser.Math.Between(-200, 200), 20);
        porta.allowGravity = true;*/
    }
    /*var porta = portas.create(3000, 500, "saida");
    porta.setCollideWorldBounds(true);
    porta.allowGravity = true;*/

    coleta.play();
}
//-----------------------------------------------------------

//função de morte
function hitBomb(player, bomb) {


    player.setTint(0xff0000);
    this.physics.pause();
    fundodojogo.stop();
    gameOver = true;
    scoreJogador1 = 0;
    this.scene.start(gameover5);
}

//função de mudança de fases
function mudarfase(player, portas) {

    player.disableBody(true, true);

    player.setTint(0xff0000);
    fundodojogo.stop();
    gameOver = true;
    scoreJogador1 = 0;
    this.scene.start(fase6);
}

//exportando esta fase
export {
    fase5
};