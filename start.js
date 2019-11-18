import {
  fase1
} from "./fase1.js";


var start = new Phaser.Scene("start");

var player;
var stars;
var bombs;
var platforms;
var resistor;
var capacitor;
var indutor;
var score = 0;
var gameOver = true;
var scoreText;
var music;

//criando título
var titulo;

start.preload = function () {
  this.load.image("parede", "assets/parede.png");
  this.load.image("ground", "assets/plataforma.png");
  this.load.image("bloco", "assets/bloco.png");
  this.load.image("blocolongo", "assets/bloco2.png");
  this.load.image("porta", "assets/portaverde.png");
  this.load.image("parede", "assets/parede.png");
  this.load.image("resistor1", "assets/fases/fase4/resistor.png");
  this.load.image("iniciar", "assets/iniciar.png");
  this.load.image("capacitor1", "assets/fases/fase5/capacitor.png");
  this.load.image("indutor1", "assets/fases/fase5/indutor.png");
  this.load.spritesheet("idle", "assets/ifiano/idle.png", {
    frameWidth: 38,
    frameHeight: 62
  });
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  //título
  this.load.spritesheet("telebross", "assets/telebross.png", {
    frameWidth: 481,
    frameHeight: 291
  });

  this.load.audio("music", "assets/sons/telainicial.mp3");
};
start.create = function () {

  //  A simple background for our game
  this.add.image(400, 300, "parede");
  this.add.image(700, 510, "porta");


  //adicionando qualquer texto ao jogo
  /*this.GameOverText = this.add.text(25, 200, 'click here play game', { //(x,y, 'texto',)
    fontSize: '64px', //tamanho do texto
    fill: '#000' //cor do texto(procurar no piskel cor desejada)

  });
  this.GameOverText.visible = true // se o texto será visível
*/
  //adicionando física das plataformas
  platforms = this.physics.add.staticGroup();
  titulo = this.physics.add.staticGroup();

  titulo
    .create(350, 150, "telebross")
    .setScale(2)
    .refreshBody(); //titulo

  //  criando plataformas do jogo
  //chão
  platforms
    .create(400, 700, "ground")
    .setScale(2)
    .refreshBody(); // chão
  platforms
    .create(1200, 700, "ground")
    .setScale(2)
    .refreshBody(); //chão

  //primeiro nível de plataforma
  platforms
    .create(600, 455, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 1

  //segundo nível de plataforma
  platforms
    .create(350, 320, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 2

  //criação do player
  player = this.physics.add.sprite(100, 450, "idle");

  //player não bater nas bordas
  player.setCollideWorldBounds(true);

  //adicionando musica
  /*var music = this.sound.add('music');
  music.play();*/

  //adiconando objetos a tela
  capacitor = this.physics.add.group({
    key: "capacitor1",
    repeat: 2,
    setXY: {
      x: 100,
      y: 0,
      stepX: 100

    }
  });
  //parte que os resistores quicam
  capacitor.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    /*child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);*/
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-100, 100), 40);
    child.allowGravity = false;
  });

  //adiconando objetos a tela
  resistor = this.physics.add.group({
    key: "resistor1",
    repeat: 2,
    setXY: {
      x: 0,
      y: 20,
      stepX: 200
      // stepY: 70,
    }
  });
  //parte que os resistores quicam
  resistor.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    /*child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);*/
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-100, 100), 40);
    child.allowGravity = false;
  });

  //adiconando objetos a tela
  indutor = this.physics.add.group({
    key: "indutor1",
    repeat: 2,
    setXY: {
      x: 50,
      y: 0,
      stepX: 150
      // stepY: 70,
    }
  });
  //parte que os resistores quicam
  indutor.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    /*child.setBounceY(Phaser.Math.FloatBetween(1, 1));
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.setCollideWorldBounds(true);*/
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-100, 100), 40);
    child.allowGravity = false;
  });

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

  //fullscreen com tecla F
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

  //criação de bombas
  bombs = this.physics.add.group();

  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(resistor, platforms);
  this.physics.add.collider(capacitor, platforms);
  this.physics.add.collider(indutor, platforms);

  //adicionando musica
  var music = this.sound.add("music");

  music.play({
    loop: true,
    volume: 0.3
  });

  var trocacena = this.add
    .image(500 - 64, 400, "iniciar", 0)
    .setOrigin(1, 0)
    .setInteractive();
  trocacena.on(
    "pointerup",
    function () {
      music.stop();
      this.scene.start(fase1);
    },
    this
  );
};

export {
  start
};