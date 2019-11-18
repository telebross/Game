import {
    fase7
} from "./fase7.js";


//definindo do morto
var player;

//definindo score
var scoreText;
//definindo plataformas
var platforms;

//definido o gameover
var gameOver = true;
//sons
var muerte;

//definindo logo da pendencia
var pendencia;

var gameover7 = new Phaser.Scene("gameover7");

gameover7.preload = function () {
    //carregando imagens do jogo
    this.load.image("parede", "assets/parede.png");
    this.load.image("ground", "assets/plataforma.png");
    this.load.image("bloco", "assets/bloco.png");
    this.load.image("blocolongo", "assets/bloco2.png");
    this.load.image("morto", "assets/ifiano/morto.png");
    this.load.image("porta", "assets/portaverde.png");
    this.load.image("reiniciar", "assets/reiniciar.png");

    //animação do personagem
    this.load.spritesheet("idle", "assets/ifiano/idle.png", {
        frameWidth: 38,
        frameHeight: 62
    });
    this.load.spritesheet("dead", "assets/ifiano/dead.png", {
        frameWidth: 75,
        frameHeight: 62
    });
    //fullscreen
    this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
        frameWidth: 64,
        frameHeight: 64
    });
    //animação pendencia
    this.load.spritesheet("pendencia", "assets/pendencia.png", {
        frameWidth: 60,
        frameHeight: 60
    })

    //carregando sons
    this.load.audio("muerte", "assets/sons/morte.mp3");
};

gameover7.create = function () {
    //imagem de fundo
    this.add.image(400, 300, "parede");
    this.add.image(1200, 300, "parede");

    //imagem de porta
    this.add.image(500, 510, "porta");

    //  nota
    this.scoreText = this.add.text(16, 16, "nota: 0", {
        fontSize: "32px",
        fill: "#000"
    });



    //animação pendencia
    this.anims.create({
        key: "animependencia",
        frames: this.anims.generateFrameNumbers(
            "pendencia", {
                start: 0,
                end: 4
            }
        ),
        frameRate: 5,
        repeat: -1
    });


    //adicionando objetos estáticos na tela
    platforms = this.physics.add.staticGroup();
    pendencia = this.physics.add.staticGroup();

    //criando letreiro
    pendencia
        .create(400, 150, "animependencia")
        .setScale(4)
        .refreshBody();


    //criação das plataformas
    //chão
    platforms
        .create(400, 700, "ground")
        .setScale(2)
        .refreshBody(); // chão
    platforms
        .create(1200, 700, "ground")
        .setScale(2)
        .refreshBody(); //chão
    platforms
        .create(600, 440, "bloco")
        .setScale(2)
        .refreshBody(); //nivel 1
    platforms
        .create(350, 310, "blocolongo")
        .setScale(2)
        .refreshBody(); //nivel 2
    //------------------------------------------

    //adicionando imagem do player morto
    player = this.physics.add.sprite(100, 450, "morto");

    //player bater com bordas
    player.setCollideWorldBounds(true);

    //player colidir com plataformas
    this.physics.add.collider(player, platforms);



    //criação da musica
    muerte = this.sound.add("muerte");
    muerte.play({
        loop: false,
        volume: 1
    });

    //fullscreen
    var button = this.add
        .image(800 - 16, 16, "fullscreen", 0)
        .setOrigin(1, 0)
        .setInteractive();

    var FKey = this.input.keyboard.addKey("F");

    FKey.on(
        "down",
        function () {
            if (this.scale.isFullscreen) {
                button.setFrame(1);
                this.scale.stopFullscreen();
            } else {
                button.setFrame(0);
                this.scale.startFullscreen();
            }

        },
        this
    );


    //botão para troca de cena
    var trocacena = this.add
        .image(550 - 64, 350, "reiniciar", 0)
        .setOrigin(1, 0)
        .setInteractive();
    trocacena.on(
        "pointerup",
        function () {
            //music.stop();
            player.anims.play("turn", false);
            gameOver = false;
            this.scene.start(fase7);
        },
        this
    );
};
//fim do create
//----------------------------------------------

gameover7.update = function () {
    //animação pendencia
    pendencia.children.iterate(function (child) {

        child.allowGravity = false;

        child.anims.play("animependencia", true);
    });

};

export {
    gameover7
};