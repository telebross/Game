import {
    gameover7
} from "./gameover7.js";
import {
    fase8
} from "./fase8.js";

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

//frases do baú
var falabau;

var fase7 = new Phaser.Scene("fase7");

fase7.preload = function () {
    //carregando imagens em geral
    this.load.image("parede", "assets/parede.png");
    this.load.image("ground", "assets/plataforma.png");
    this.load.image("bloco", "assets/bloco.png");
    this.load.image("blocolongo", "assets/bloco2.png");
    this.load.image("porta", "assets/portaverde.png");
    this.load.image("letreiro7", "assets/fases/fase7/fase7.png");

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
    this.load.spritesheet("transistor", "assets/fases/fase7/transistor2.png", {
        frameWidth: 50,
        frameHeight: 61
    });
    //coletavel2
    this.load.spritesheet("fibra", "assets/fases/fase7/fibra.png", {
        frameWidth: 60,
        frameHeight: 67
    });
    //coletavel3
    this.load.spritesheet("cabo", "assets/fases/fase7/caboderede.png", {
        frameWidth: 30,
        frameHeight: 30
    });


    //animação inimigo1
    this.load.spritesheet("antena", "assets/fases/fase7/antena2.png", {
        frameWidth: 60,
        frameHeight: 48
    });
    //animação inimigo2
    this.load.spritesheet("bau", "assets/fases/fase7/bau.png", {
        frameWidth: 31,
        frameHeight: 21
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

    //animação falabau
    this.load.spritesheet("falabau", "assets/fases/fase7/falasbau.png", {
        frameWidth: 80,
        frameHeight: 80
    });

    //audios do jogo
    this.load.audio("fundodojogo", "assets/sons/fundodojogo.mp3");
    this.load.audio("coleta", "assets/sons/coleta.mp3");
};

fase7.create = function () {
    // Teclado alfanumérico
    cursors = this.input.keyboard.createCursorKeys();
    // Touch
    pointer = this.input.addPointer(1);

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

    //---------------------------------------------------
    //criando fala do baú

    //animação falabau
    this.anims.create({
        key: "animefalabau",
        frames: this.anims.generateFrameNumbers(
            "falabau", {
                start: 0,
                end: 30
            }
        ),
        frameRate: 4,
        repeat: -1
    });


    //criando física estática do falas do baú
    falabau = this.physics.add.staticGroup();

    //posicionando letreiro
    falabau
        .create(3000, 100, "animefalabau")
        .setScale(4)
        .refreshBody();

    //-------------------------------------------------

    //criando física estática das plataformas
    platforms = this.physics.add.staticGroup();

    //criando física estática do letreiro
    letreiro = this.physics.add.staticGroup();

    //posicionando letreiro
    letreiro
        .create(400, 100, "letreiro7")
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
    //escada1
    platforms
        .create(300, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(600, 420, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2

    //obstáculo1
    platforms
        .create(900, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(1055, 508, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(1259, 508, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(900, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(1055, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(1259, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(900, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(900, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel4
    platforms
        .create(1259, 316, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel4
    //escada 2
    platforms
        .create(1800, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(2100, 420, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(1800, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(2100, 228, "bloco")
        .setScale(2)
        .refreshBody(); //nivel4

    //ultimo obstaculo
    //parte1
    platforms
        .create(2350, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel1
    platforms
        .create(2350, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel2
    platforms
        .create(2400, 380, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(2400, 316, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel4
    platforms
        .create(2400, 252, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel5
    platforms
        .create(2400, 188, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel6
    //parte2
    platforms
        .create(2725, 380, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(2929, 380, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(3133, 380, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel3
    platforms
        .create(2725, 316, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel4
    platforms
        .create(2880, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel4
    platforms
        .create(2725, 252, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel5
    platforms
        .create(2675, 188, "bloco")
        .setScale(2)
        .refreshBody(); //nivel6




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
    //animação do 'inimigo'1
    this.anims.create({
        key: "animeantena",
        frames: this.anims.generateFrameNumbers(
            "antena", {
                start: 0,
                end: 4
            }
        ),
        frameRate: 3,
        repeat: -1
    });

    //animação do 'inimigo'2
    this.anims.create({
        key: "animebau",
        frames: this.anims.generateFrameNumbers(
            "bau", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 3,
        repeat: -1
    });

    //animação coletável1
    this.anims.create({
        key: "animetransistor",
        frames: this.anims.generateFrameNumbers(
            "transistor", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });
    //animação coletável2
    this.anims.create({
        key: "animefibra",
        frames: this.anims.generateFrameNumbers(
            "fibra", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });
    //animação coletável3
    this.anims.create({
        key: "animecabo",
        frames: this.anims.generateFrameNumbers(
            "cabo", {
                start: 0,
                end: 2
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
        key: "transistor",
        repeat: 2,
        setXY: {
            x: 300,
            y: 200,
            stepX: 300
        }
    });



    /*binarios.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável2
    pl = this.physics.add.group({
        key: "fibra",
        repeat: 1,
        setXY: {
            x: 1055, //como adicionar mais de um ícone
            y: 200,

            stepX: 250
        }
    });
    //coletável3
    binarios2 = this.physics.add.group({
        key: "rede",
        repeat: 2,
        setXY: {
            x: 1600,
            y: 510,
            stepX: 650
        }
    });
    /*binarios2.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável4
    pl2 = this.physics.add.group({
        key: "rede",
        repeat: 1,
        setXY: {
            x: 2650, //como adicionar mais de um ícone
            y: 0,

            stepX: 500
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

    //falas do bau
    /* falabau = this.add.text(2900, 100, "batatina!", {
         fontSize: "32px",
         fill: "#000"
     });
     falabau = this.add.text(2800, 150, "continha de buteco", {
         fontSize: "32px",
         fill: "#000"
     });
     falabau = this.add.text(2900, 50, "naveia?", {
         fontSize: "32px",
         fill: "#000"
     });*/



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
    boneco1 = inimigo.create(600, 520, "antena");
    boneco1.setBounce(1);
    boneco1.setCollideWorldBounds(true);
    boneco1.setVelocityX(100);
    boneco1.allowGravity = false;
    //boneco1.setCircle(23);

    //adicionando inimigo2
    boneco2 = inimigo.create(1950, 0, "antena");
    boneco2.setBounce(1);
    boneco2.setCollideWorldBounds(true);
    boneco2.setVelocityY(100);
    boneco2.allowGravity = false;
    // boneco2.setCircle(23);

    //adicionando inimigo3
    boneco3 = inimigo.create(3000, 316, "bau");
    boneco3.setBounce(1);
    boneco3.setCollideWorldBounds(true);
    boneco3.setVelocityX(100);
    boneco3.allowGravity = false;
    boneco3.setScale(2)
    //boneco3.setCircle(23);

    //adicionando inimigo4
    boneco4 = inimigo.create(2800, 510, "bau");
    boneco4.setBounce(0);
    boneco4.setCollideWorldBounds(true);
    boneco4.setVelocityX(100);
    boneco4.allowGravity = false;
    boneco4.setScale(2)
    //boneco3.setCircle(23);

    //movimentação por botões
    // Controle direcional por toque na tela
    //
    // Para a esquerda: correr
    /*var esquerda = this.add
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
    })*/
};
//fim da função create
//----------------------------------------------

fase7.update = function () {

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


    //movimentação do personagem 1
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
    }

    //-----------------------------------------------------

    //movimentação boneco1
    boneco1.anims.play("animeantena", true);
    /* if (boneco1.body.position.x - 599 > 200) {
         boneco1.setVelocityX(-200);
         boneco1.setFlipX(false);
         boneco1.anims.play("animeantena", true);
     } else if (boneco1.body.position.x - 599 < -200) {
         boneco1.setVelocityX(200);
         boneco1.setFlipX(true);
         boneco1.anims.play("animeantena", true);
}*/
    //animação do boneco2
    boneco2.anims.play("animeantena", true);

    //movimentação boneco3
    boneco3.anims.play("animebau", true);
    /* if (boneco3.body.position.x - 3000 > 10) {
         boneco3.setVelocityX(-300);
         boneco3.setFlipX(false);
         boneco3.anims.play("animebau", true);
     } else if (boneco3.body.position.x - 3000 < -100) {
         boneco3.setVelocityX(300);
         boneco3.setFlipX(true);
         boneco3.anims.play("animebau", true);
     }*/

    //movimentação boneco4
    if (boneco4.body.position.x - 2801 > 200) {
        boneco4.setVelocityX(-230);
        boneco4.setFlipX(false);
        boneco4.anims.play("animebau", true);
    } else if (boneco4.body.position.x - 2801 < -300) {
        boneco4.setVelocityX(230);
        boneco4.setFlipX(true);
        boneco4.anims.play("animebau", true);
    }

    //--------------------------------------------------

    //animação coletável1
    binarios.children.iterate(function (child) {

        child.anims.play("animetransistor", true);
    });

    //animação coletável2
    pl.children.iterate(function (child) {

        child.anims.play("animefibra", true);
    });

    //animação coletável3
    binarios2.children.iterate(function (child) {

        child.anims.play("animecabo", true);
        child.setScale(2);

    });
    //animação coletável4
    pl2.children.iterate(function (child) {

        child.anims.play("animecabo", true);
        child.setScale(2)
    });
    //animação falabau
    falabau.children.iterate(function (child) {

        child.allowGravity = false;

        child.anims.play("animefalabau", true);
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
        /*binarios2.children.iterate(function (child) {
            child.enableBody(true, -300, 0, true, true);

        });*/

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
    this.scene.start(gameover7);
}

//função de mudança de fases
function mudarfase(player, portas) {

    player.disableBody(true, true);

    player.setTint(0xff0000);
    fundodojogo.stop();
    gameOver = true;
    scoreJogador1 = 0;
    this.scene.start(fase8);
}

//exportando esta fase
export {
    fase7
};