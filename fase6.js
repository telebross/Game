import {
    gameover6
} from "./gameover6.js";
import {
    fase7
} from "./fase7.js";

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

//anjo
var anjo;
var deslocamento;

var fase6 = new Phaser.Scene("fase6");

fase6.preload = function () {
    //carregando imagens em geral
    this.load.image("parede", "assets/parede.png");
    this.load.image("ground", "assets/plataforma.png");
    this.load.image("bloco", "assets/bloco.png");
    this.load.image("blocolongo", "assets/bloco2.png");
    this.load.image("porta", "assets/portaverde.png");
    this.load.image("letreiro6", "assets/fases/fase6/fase6.png");
    this.load.image("anjo", "assets/fases/fase6/anjo.png");
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
    this.load.spritesheet("monofone", "assets/fases/fase6/monofone.png", {
        frameWidth: 53,
        frameHeight: 40
    });
    //coletavel2
    this.load.spritesheet("senoide", "assets/fases/fase6/ondasenoidal.png", {
        frameWidth: 50,
        frameHeight: 50
    });


    //animação inimigo
    this.load.spritesheet("buzzer", "assets/fases/fase6/buzzer.png", {
        frameWidth: 30,
        frameHeight: 18
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

fase6.create = function () {
    // Teclado alfanumérico
    cursors = this.input.keyboard.createCursorKeys();

    //parte de movimentação de cameras
    this.cameras.main.setBounds(0, 0, 3200, 600);
    this.physics.world.setBounds(0, 0, 3200, 600);

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
        .create(400, 200, "letreiro6")
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
    // obstáculo1
    platforms
        .create(200, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(355, 508, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(355, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(405, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3

    //escadinha
    platforms
        .create(1000, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1 D
    platforms
        .create(800, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2 E
    platforms
        .create(1000, 350, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3 D

    //coluna1
    platforms
        .create(1400, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(1400, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(1400, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(1400, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel4
    //coluna2
    platforms
        .create(1600, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(1600, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(1600, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel4

    //escadinha2
    platforms
        .create(2000, 508, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(2050, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2

    //linha
    platforms
        .create(2296, 350, "blocolongo") //nível 2 eixo Y
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms
        .create(2500, 350, "blocolongo") //nível 2 eixo Y 
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();
    platforms
        .create(2704, 350, "blocolongo") //nível 2 eixo Y 
        .setScale(2) //distancia entre os blocos eixo X 204
        .refreshBody();

    //------------------------------------------------

    // adicionando player ao jogo
    player = this.physics.add.sprite(100, 450, "idle");

    //adicionando anjo ao jogo
    anjo = this.add.image(100, 100, "anjo");

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
            end: 15
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
        key: "animebuzzer",
        frames: this.anims.generateFrameNumbers(
            "buzzer", {
                start: 0,
                end: 3
            }
        ),
        frameRate: 5,
        repeat: -1
    });

    //animação coletável1
    this.anims.create({
        key: "animesenoide",
        frames: this.anims.generateFrameNumbers(
            "senoide", {
                start: 0,
                end: 8
            }
        ),
        frameRate: 8,
        repeat: -1
    });
    //animação coletável2
    this.anims.create({
        key: "animemonofone",
        frames: this.anims.generateFrameNumbers(
            "monofone", {
                start: 0,
                end: 4
            }
        ),
        frameRate: 2,
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
        key: "monofone",
        repeat: 1,
        setXY: {
            x: 800,
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
        key: "senoide",
        repeat: 2,
        setXY: {
            x: 1400, //como adicionar mais de um ícone
            y: 100,

            stepX: 100
        }
    });
    //coletável3
    binarios2 = this.physics.add.group({
        key: "monofone",
        repeat: 2,
        setXY: {
            x: 2050,
            y: 0,
            stepX: 300
        }
    });
    /*binarios2.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável4
    pl2 = this.physics.add.group({
        key: "senoide",
        repeat: 1,
        setXY: {
            x: 1100, //como adicionar mais de um ícone
            y: 510,

            stepX: 1100
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
        coletavel2,
        null,
        this
    );
    //coletavel3
    this.physics.add.overlap(
        player,
        binarios2,
        coletavel3,
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
    boneco1 = inimigo.create(1200, 510, "buzzer");
    boneco1.setBounce(1);
    boneco1.setCollideWorldBounds(true);
    boneco1.setVelocityX(200);
    boneco1.allowGravity = false;
    boneco1.setScale(2);
    //boneco1.setCircle(23);

    //adicionando inimigo2
    boneco2 = inimigo.create(1500, 0, "buzzer");
    boneco2.setBounce(1);
    boneco2.setCollideWorldBounds(true);
    boneco2.setVelocityY(101);
    boneco2.allowGravity = false;
    boneco2.setScale(2);
    // boneco2.setCircle(23);

    //adicionando inimigo3
    boneco3 = inimigo.create(2400, 200, "buzzer");
    boneco3.setBounce(0);
    boneco3.setCollideWorldBounds(true);
    boneco3.setVelocityX(100);
    boneco3.allowGravity = false;
    boneco3.setScale(2);
    //boneco3.setCircle(23);

    //adicionando inimigo4
    boneco4 = inimigo.create(2500, 500, "buzzer");
    boneco4.setBounce(0);
    boneco4.setCollideWorldBounds(true);
    boneco4.setVelocityX(100);
    boneco4.allowGravity = false;
    boneco4.setScale(2);
    //boneco4.setCircle(23);

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
        deslocamento = 4.5;
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

fase6.update = function () {
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


    //movimentação do personagem 1 no teclado de mesa
    /*else if (cursors.left.isDown) {
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
    boneco1.anims.play("animebuzzer", true);
    /* if (boneco1.body.position.x - 1199 > 200) {
         boneco1.setVelocityX(-200);
         boneco1.setFlipX(false);
         boneco1.anims.play("animebuzzer", true);
     } else if (boneco1.body.position.x - 1199 < -200) {
         boneco1.setVelocityX(200);
         boneco1.setFlipX(true);
         boneco1.anims.play("animebuzzer", true);
     }*/
    //animação do boneco2
    boneco2.anims.play("animebuzzer", true);

    //movimentação boneco3
    if (boneco3.body.position.x - 2499 > 200) {
        boneco3.setVelocityX(-290);
        boneco3.setFlipX(false);
        boneco3.anims.play("animebuzzer", true);
    } else if (boneco3.body.position.x - 2499 < -200) {
        boneco3.setVelocityX(290);
        boneco3.setFlipX(true);
        boneco3.anims.play("animebuzzer", true);
    }

    //movimentação boneco4
    if (boneco4.body.position.x - 2499 > 200) {
        boneco4.setVelocityX(-290);
        boneco4.setFlipX(false);
        boneco4.anims.play("animebuzzer", true);
    } else if (boneco4.body.position.x - 2499 < -200) {
        boneco4.setVelocityX(290);
        boneco4.setFlipX(true);
        boneco4.anims.play("animebuzzer", true);
    }

    //--------------------------------------------------

    //animação coletável1
    binarios.children.iterate(function (child) {

        child.anims.play("animemonofone", true);
    });

    //animação coletável2
    pl.children.iterate(function (child) {

        child.anims.play("animesenoide", true);
    });

    //animação coletável3
    binarios2.children.iterate(function (child) {

        child.anims.play("animemonofone", true);
    });
    //animação coletável4
    pl2.children.iterate(function (child) {

        child.anims.play("animesenoide", true);
    });

    anjo.x = player.body.x;
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
    this.scene.start(gameover6);
}

//função de mudança de fases
function mudarfase(player, portas) {

    player.disableBody(true, true);

    player.setTint(0xff0000);
    fundodojogo.stop();
    gameOver = true;
    scoreJogador1 = 0;
    this.scene.start(fase7);
}

//exportando esta fase
export {
    fase6
};