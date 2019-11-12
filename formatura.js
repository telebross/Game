import {
  fase2
} from "./fase2.js";
import {
  start
} from "./start.js";
import {
  endgame
} from "./endgame.js";

//criação do player 1
var player;

//plataformas/icones na tela
var scoreText;
var platforms;

var bombs;

//parte de coletáveis
var stars;
//var telefones;
//var antena;
//var animes;

var cursors;

//adicionando sons
var formatura;

var formatura = new Phaser.Scene("formatura");

formatura.preload = function () {
  //carregando imagens em geral
  this.load.image("parede", "assets/parede.png");
  this.load.image("ground", "assets/plataforma.png");
  this.load.image("bloco", "assets/bloco.png");
  this.load.image("blocolongo", "assets/bloco2.png");
  this.load.image("diploma", "assets/diploma.png");
  this.load.image("star", "assets/dude.png");
  this.load.image("telefone", "assets/fases/fase1/telefone.png");
  this.load.image("bomb", "assets/bomb.png");
  this.load.image("boi", "assets/boiformatura.png");
  this.load.image("porta", "assets/portaverde.png");
  this.load.image("recomeçar", "assets/Recomeçar.png");

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
  this.load.spritesheet("dead", "assets/ifiano/dead.png", {
    frameWidth: 77,
    frameHeight: 62
  });

  //animação coletáveis
  this.load.spritesheet("dude", "assets/fases/fase1/antena.png", {
    frameWidth: 60,
    frameHeight: 59
  });

  //fullscreen
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  //animação da porta
  this.load.spritesheet("saida", "assets/saida.png", {
    frameWidth: 60,
    frameHeight: 85
  });

  //animações dos inimigos
  /*this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48
    });*/

  //audios do jogo
  this.load.audio("formatura", "assets/sons/formatura.mp3");
};

formatura.create = function () {
  this.physics.world.setBounds(0, 0, 800, 600);

  //  colocando a imagem de fundo
  this.add.image(400, 300, "parede");

  //adionando imagem de porta
  this.add.image(400, 510, "porta");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  criando física das plataformas
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
  platforms
    .create(400, 700, "ground")
    .setScale(2)
    .refreshBody(); // chão

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "idle");
  //player2 = this.physics.add.sprite(150, 450, 'idle');

  //  Player physics properties. Give the little guy a slight bounce.
  player.setCollideWorldBounds(true);

  //player2.setCollideWorldBounds(true);

  //  Our player animations, turning, walking left and walking right.
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("runleft", {
      start: 0,
      end: 15
    }),
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

  this.anims.create({
    key: "dead",
    frames: this.anims.generateFrameNumbers("dead", {
      start: 0,
      end: 16
    }),
    frameRate: 10,
    repeat: 0
  });

  //animação de coletável
  this.anims.create({
    key: "dude",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 9
    }),
    frameRate: 20,
    repeat: -1
  });

  //animação da porta
  this.anims.create({
    key: "saida",
    frames: this.anims.generateFrameNumbers("saida", {
      start: 0,
      end: 4
    }),
    frameRate: 1,
    repeat: 0
  });

  //adicionando musica de fundo

  formatura = this.sound.add("formatura");
  formatura.play({
    loop: true,
    volume: 1
  });

  //  Input Eventscursors
  cursors = this.input.keyboard.createCursorKeys();

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  stars = this.physics.add.group({
    key: "boi",
    repeat: 0,
    setXY: {
      x: 600,
      y: 0,
      stepX: 30
    }
  });

  stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);
  });

  //adicionando coletável como a estrela
  /* telefones = this.physics.add.group({
    key: "boi",
    repeat: 1,
    setXY: {
      x: 400,
      y: 0,
      stepX: 70
    }
  });

  telefones.children.iterate(function(child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });*/

  bombs = this.physics.add.group();

  //  The score1
  scoreText = this.add.text(16, 16, "score1: 0", {
    fontSize: "32px",
    fill: "#000"
  });
  scoreText.setScrollFactor(0);

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

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);

  this.physics.add.collider(stars, platforms);
  // this.physics.add.collider(telefones, platforms); //coletável com plataforma
  this.physics.add.collider(bombs, platforms);
  //this.physics.add.collider(portas, platforms);
  //this.physics.add.collider(inimigo, platforms);
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  //this.physics.add.overlap(player, stars, collectStar, null, this);
  //this.physics.add.overlap(player, telefones, abrirporta, null, this);
  //this.physics.add.overlap(player, telefones, coletar, null, this); //coletar coletáveis

  //adicionando inimigo

  var trocacena = this.add
    .image(500 - 64, 400, "recomeçar", 0)
    .setOrigin(1, 0)
    .setInteractive();
  trocacena.on(
    "pointerup",
    function () {
      formatura.stop();
      this.scene.start(endgame);
    },
    this
  );
};

formatura.update = function () {
  //movimentação do personagem 1
  if (cursors.left.isDown) {
    player.setVelocityX(-160);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play("right", true);
  } else if (cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
    player.setVelocityX(0);
    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-330);
  }
};

export {
  formatura
};