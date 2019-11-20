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


//mudança de cena
var gameOver = false;
var proximafase = false;
var portas;

//adicionando sons
var fundodojogo;
var coleta;

//criação de letreiro
var letreiro;

var fase6 = new Phaser.Scene("fase6");

fase6.preload = function () {
    //carregando imagens em geral
    this.load.image("parede", "assets/parede.png");
    this.load.image("ground", "assets/plataforma.png");
    this.load.image("bloco", "assets/bloco.png");
    this.load.image("blocolongo", "assets/bloco2.png");
    this.load.image("porta", "assets/portaverde.png");
    this.load.image("letreiro6", "assets/fases/fase6/fase6.png");

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
        frameWidth: 55,
        frameHeight: 45
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
    // primeira linha
    /*
        platforms
            .create(904, 445, "blocolongo") //nível 1  eixo Y 127
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1108, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1312, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1516, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1720, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1924, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2128, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2332, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2536, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2740, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2944, 445, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();

        //----------------------------------------------------
        //segunda linha
        platforms
            .create(904, 318, "blocolongo") //nível 2 eixo Y
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1108, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1312, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1516, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1720, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1924, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2128, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2332, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2536, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2740, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2944, 318, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();

        //-------------------------------------------------
        //terceira linha
        platforms
            .create(904, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1108, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1312, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1516, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1720, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(1924, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2128, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2332, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2536, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2740, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        platforms
            .create(2944, 191, "blocolongo") //nível 2 eixo Y 
            .setScale(2) //distancia entre os blocos eixo X 204
            .refreshBody();
        //-------------------------------------------

        //escadinha

        platforms
            .create(600, 508, "bloco")
            .setScale(2)
            .refreshBody(); //nivel 1 D
        platforms
            .create(400, 444, "bloco")
            .setScale(2)
            .refreshBody(); //nivel 2 E
        platforms
            .create(600, 350, "bloco")
            .setScale(2)
            .refreshBody(); //nivel 3 D
        platforms
            .create(400, 245, "bloco")
            .setScale(2)
            .refreshBody(); //nivel 4 E
        platforms
            .create(600, 160, "bloco")
            .setScale(2)
            .refreshBody(); //nivel 3 D*/
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
        frameRate: 15,
        repeat: -1
    });

    this.anims.create({
        key: "turn",
        frames: this.anims.generateFrameNumbers("idle", {
            start: 0,
            end: 15
        }),
        frameRate: 20,
        repeat: -1
    });

    this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("run", {
            start: 0,
            end: 15
        }),
        frameRate: 20,
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
                end: 12
            }
        ),
        frameRate: 2,
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
        repeat: 3,
        setXY: {
            x: 1000,
            y: 325,
            stepX: 500
        }
    });



    /*binarios.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável2
    pl = this.physics.add.group({
        key: "senoide",
        repeat: 1,
        setXY: {
            x: 1100, //como adicionar mais de um ícone
            y: 210,

            stepX: 600
        }
    });
    //coletável3
    binarios2 = this.physics.add.group({
        key: "monofone",
        repeat: 1,
        setXY: {
            x: 1000,
            y: 0,
            stepX: 500
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

            stepX: 1000
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
    boneco1 = inimigo.create(2000, 510, "buzzer");
    boneco1.setBounce(0);
    boneco1.setCollideWorldBounds(true);
    boneco1.setVelocityX(100);
    boneco1.allowGravity = false;
    boneco1.setScale(2);
    //boneco1.setCircle(23);

    //adicionando inimigo2
    boneco2 = inimigo.create(500, 0, "buzzer");
    boneco2.setBounce(1);
    boneco2.setCollideWorldBounds(true);
    boneco2.setVelocityY(10);
    boneco2.allowGravity = false;
    boneco2.setScale(2);
    // boneco2.setCircle(23);

    //adicionando inimigo3
    boneco3 = inimigo.create(2900, 200, "buzzer");
    boneco3.setBounce(0);
    boneco3.setCollideWorldBounds(true);
    boneco3.setVelocityY(0);
    boneco3.allowGravity = false;
    boneco3.setScale(2);
    //boneco3.setCircle(23);

    //adicionando inimigo4
    boneco4 = inimigo.create(1900, 300, "buzzer");
    boneco4.setBounce(0);
    boneco4.setCollideWorldBounds(true);
    boneco4.setVelocityX(100);
    boneco4.allowGravity = false;
    boneco4.setScale(2);
    //boneco4.setCircle(23);
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
    if (boneco1.body.position.x - 1999 > 200) {
        boneco1.setVelocityX(-200);
        boneco1.setFlipX(false);
        boneco1.anims.play("animebuzzer", true);
    } else if (boneco1.body.position.x - 1999 < -200) {
        boneco1.setVelocityX(200);
        boneco1.setFlipX(true);
        boneco1.anims.play("animebuzzer", true);
    }
    //animação do boneco2
    boneco2.anims.play("animebuzzer", true);

    //movimentação boneco3
    if (boneco3.body.position.x - 3000 > 10) {
        boneco3.setVelocityX(-300);
        boneco3.setFlipX(false);
        boneco3.anims.play("animebuzzer", true);
    } else if (boneco3.body.position.x - 3000 < -100) {
        boneco3.setVelocityX(300);
        boneco3.setFlipX(true);
        boneco3.anims.play("animebuzzer", true);
    }

    //movimentação boneco4
    if (boneco4.body.position.x - 2000 > 300) {
        boneco4.setVelocityX(-290);
        boneco4.setFlipX(false);
        boneco4.anims.play("animebuzzer", true);
    } else if (boneco4.body.position.x - 2000 < -1000) {
        boneco4.setVelocityX(200);
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