import {
    gameover3
} from "./gameover3.js";
import {
    fase4
} from "./fase4.js";

//criação do player 1
var player;
//var player2;

//criação de inimigos
var inimigo;
var boneco1;
var boneco2;
var boneco3;
var boneco4;


//plataformas/icones na tela
var scoreText;
var scoreText2;
var scoreJogador1 = 0;
var scoreJogador2 = 0;
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
var WKey;
var AKey;
var DKey;

//mudança de cena
var gameOver = false;
var proximafase = false;
var portas;

//adicionando sons
var fundodojogo;
var coleta;

//criando letreiro com escala
var letreiro;

var fase3 = new Phaser.Scene("fase3");

fase3.preload = function () {
    //carregando imagens em geral
    this.load.image("parede", "assets/parede.png");
    this.load.image("ground", "assets/plataforma.png");
    this.load.image("bloco", "assets/bloco.png");
    this.load.image("blocolongo", "assets/bloco2.png");
    this.load.image("porta", "assets/portaverde.png");
    this.load.image("letreiro3", "assets/fases/fase3/fase3.png");

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
    this.load.spritesheet("computador", "assets/fases/fase3/computador.png", {
        frameWidth: 21,
        frameHeight: 20
    });
    //coletavel2
    this.load.spritesheet("ip", "assets/fases/fase3/endereçosip.png", {
        frameWidth: 46,
        frameHeight: 52
    });


    //animação inimigo
    this.load.spritesheet("roteador", "assets/fases/fase3/roteador.png", {
        frameWidth: 30,
        frameHeight: 25
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

fase3.create = function () {
    // Teclado alfanumérico
    cursors = this.input.keyboard.createCursorKeys();
    WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

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


    // adicionando física as plataformas/letreiro
    platforms = this.physics.add.staticGroup();
    letreiro = this.physics.add.staticGroup();


    //posicionando letreiro
    letreiro
        .create(400, 200, "letreiro3")
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
        .create(559, 508, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(355, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(559, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(405, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3
    platforms
        .create(559, 380, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 3
    platforms
        .create(608, 316, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 4

    //obstáculo2
    platforms
        .create(1000, 316, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 4
    platforms
        .create(1300, 444, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(1600, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3


    //obstáculo3
    platforms
        .create(2300, 508, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(2145, 508, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(2300, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(2504, 444, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 2
    platforms
        .create(2350, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3
    platforms
        .create(2900, 380, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 3
    platforms
        .create(2450, 316, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 4


    //------------------------------------------------

    // adicionando player ao jogo
    player = this.physics.add.sprite(100, 450, "idle");
    //player2 = this.physics.add.sprite(150, 450, 'idle');

    //parte do player1 com cameras
    this.cameras.main.startFollow(
        player,
        true,
        0.05,
        0.05
    );
    //parte do player 2 com câmeras
    //this.cameras.main.startFollow(player2, true, 0.05, 0.05);

    //colição do player com as bordas do mapa
    player.setCollideWorldBounds(true);
    //player2.setCollideWorldBounds(true);

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
        key: "animeroteador",
        frames: this.anims.generateFrameNumbers(
            "roteador", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });

    //animação coletável1
    this.anims.create({
        key: "animeip",
        frames: this.anims.generateFrameNumbers(
            "ip", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });
    //animação coletável2
    this.anims.create({
        key: "animecomputador",
        frames: this.anims.generateFrameNumbers(
            "computador", {
                start: 0,
                end: 1
            }
        ),
        frameRate: 1,
        repeat: -1
    });

    //------------------------------------------

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
        key: "computador",
        repeat: 2,
        setXY: {
            x: 200,
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
        key: "ip",
        repeat: 2,
        setXY: {
            x: 1000, //como adicionar mais de um ícone
            y: 210,

            stepX: 300
        }
    });
    //coletável3
    binarios2 = this.physics.add.group({
        key: "computador",
        repeat: 1,
        setXY: {
            x: 2250,
            y: 345,
            stepX: 200
        }
    });
    /*binarios2.children.iterate(function (child) {
      //  Give each star a slightly different bounce
      child.setCircle(25);
    });*/

    //coletável4
    pl2 = this.physics.add.group({
        key: "ip",
        repeat: 1,
        setXY: {
            x: 900, //como adicionar mais de um ícone
            y: 510,

            stepX: 500
        }
    });
    //----------------------------------------------------------


    //criando fisica da porta/inimigo
    portas = this.physics.add.group();
    inimigo = this.physics.add.group();
    //-------------------------------------------------------------------
    // placar do jogo
    scoreText = this.add.text(16, 16, "nota: 0", {
        fontSize: "32px",
        fill: "#000"
    });
    scoreText.setScrollFactor(0);

    //  The score2 player2
    /*scoreText2 = this.add.text(16, 40, 'score2: 0', {
        fontSize: '32px',
        fill: '#000'
    });
    scoreText2.setScrollFactor(0);*/

    //-----------------------------------------------------------------

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
    //this.physics.add.collider(player2, platforms); //segundo jogador
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
    //-----------------------------------------
    //coletáveis player2
    //coletavel1
    /* this.physics.add.overlap(
         player2,
         binarios,
         coletavel1,
         null,
         this
     );
     //coletavel2
     this.physics.add.overlap(
         player2,
         pl,
         coletavel2,
         null,
         this
     );
     //coletavel3 
     this.physics.add.overlap(
         player2,
         binarios2,
         coletavel3,
         null,
         this
     );
     //coletavel4  
     this.physics.add.overlap(
         player2,
         pl2,
         coletavel3,
         null,
         this
     );*/
    //------------------------------------------
    //função mudar de fase
    this.physics.add.collider(
        player,
        portas,
        mudarfase,
        null,
        this
    );
    //função mudar de fase player2
    /* this.physics.add.collider(
         player2,
         portas,
         mudarfase,
         null,
         this
     );*/
    //---------------------------------------------------
    //função de morte
    this.physics.add.collider(
        player,
        inimigo,
        hitBomb,
        null,
        this
    );
    //função de morte player2
    /* this.physics.add.collider(
         player2,
         inimigo,
         hitBomb,
         null,
         this
     );*/

    //---------------------------------------------------

    //adicionando inimigo1
    boneco1 = inimigo.create(950, 510, "roteador");
    boneco1.setBounce(0);
    boneco1.setCollideWorldBounds(true);
    boneco1.setVelocity(300);
    boneco1.allowGravity = false;
    boneco1.setCircle(13);

    //adicionando inimigo2
    boneco2 = inimigo.create(1600, 0, "roteador");
    boneco2.setBounce(1);
    boneco2.setCollideWorldBounds(true);
    boneco2.setVelocityY(100);
    boneco2.allowGravity = false;
    boneco2.setCircle(13);

    //adicionando inimigo3
    boneco3 = inimigo.create(2600, 500, "roteador");
    boneco3.setBounce(0);
    boneco3.setCollideWorldBounds(true);
    boneco3.setVelocityY(300);
    boneco3.allowGravity = false;
    boneco3.setCircle(13);

    //adicionando inimigo4
    boneco4 = inimigo.create(500, 0, "roteador");
    boneco4.setBounce(1);
    boneco4.setCollideWorldBounds(true);
    boneco4.setVelocityX(0);
    boneco4.allowGravity = true;
    boneco4.setCircle(13);
};
//fim da função create
//--------------------------------------------

fase3.update = function () {

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

    //movimentação personagem 2

    /*if (AKey.isDown) {
        player2.setVelocityX(-300);

        player2.anims.play('left', true);
    } else if (DKey.isDown) {
        player2.setVelocityX(300);

        player2.anims.play('right', true);
    } else

    {
        player2.setVelocityX(0);

        player2.anims.play('turn');
    }
    if (WKey.isDown && player2.body.touching.down) {
        player2.setVelocityY(-330);
    }*/

    //-----------------------------------------------

    //movimentação boneco1
    if (boneco1.body.position.x - 1000 > 500) {
        boneco1.setVelocityX(-300);
        boneco1.setFlipX(false);
        boneco1.setCircle(15)
        boneco1.anims.play("animeroteador", true);
    } else if (boneco1.body.position.x - 1000 < -100) {
        boneco1.setVelocityX(300);
        boneco1.setFlipX(true);
        boneco1.setCircle(15)
        boneco1.anims.play("animeroteador", true);
    }
    //animação do boneco2
    boneco2.anims.play("animeroteador", true);

    //movimentação boneco3
    if (boneco3.body.position.x - 2700 > 100) {
        boneco3.setVelocityX(-300);
        boneco3.setFlipX(false);
        boneco3.setCircle(15)
        boneco3.anims.play("animeroteador", true);
    } else if (boneco3.body.position.x - 2700 < -100) {
        boneco3.setVelocityX(300);
        boneco3.setFlipX(true);
        boneco3.setCircle(15)
        boneco3.anims.play("animeroteador", true);
    }

    //movimentação boneco4
    /* if (boneco4.body.position.x - 2000 > 300) {
         boneco4.setVelocityX(-290);
         boneco4.setFlipX(false);

         boneco4.anims.play("animeroteador", true);
     } else if (boneco4.body.position.x - 2000 < -1000) {
         boneco4.setVelocityX(200);
         boneco4.setFlipX(true);

         boneco4.anims.play("animeroteador", true);
     }*/

    //-------------------------------------------------

    //animação coletável1
    binarios.children.iterate(function (child) {

        child.anims.play("animecomputador", true);
        child.setScale(2)
    });

    //animação coletável2
    pl.children.iterate(function (child) {

        child.anims.play("animeip", true);
    });

    //animação coletável3
    binarios2.children.iterate(function (child) {

        child.anims.play("animecomputador", true);
        child.setScale(2)
    });

    //animação coletável4
    pl2.children.iterate(function (child) {

        child.anims.play("animeip", true);
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


    //colocando som na coleta
    coleta.play();
}

//-----------------------------------------
//ícone 2 de coleta
function coletavel2(player, p) {
    p.disableBody(true, true);

    //  adicionano +1 a nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (pl.countActive(true) === 0) {
        // adicionando novos coletáveis
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


    //colocando som na coleta
    coleta.play();
}

function coletavel3(player, b) {
    b.disableBody(true, true);

    //  adicionano +1 a nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (binarios2.countActive(true) === 0) {
        // adicionando novos coletáveis
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


    //colocando som na coleta
    coleta.play();
}

function coletavel4(player, l) {
    l.disableBody(true, true);

    //  adicionano +1 a nota
    scoreJogador1 += 1;
    scoreText.setText("nota: " + scoreJogador1);

    if (pl2.countActive(true) === 0) {
        // adicionando novos coletáveis
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

    //colocando som na coleta
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
    this.scene.start(gameover3);
}

//função de mudança de fase
function mudarfase(player, portas) {

    player.disableBody(true, true);

    player.setTint(0xff0000);
    fundodojogo.stop();
    gameOver = true;
    scoreJogador1 = 0;
    this.scene.start(fase4);
}

//exportando esta fase
export {
    fase3
};