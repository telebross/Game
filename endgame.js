import {
  start
} from "./start.js";

var endgame = new Phaser.Scene("endgame");

//criação do personagem
var player;

var stars;

//plataformas
var platforms;

//ícones pulando na tela
var resistor;
var capacitor;
var indutor;

//criando música
var music;

//letreiro de formado
var formado;

endgame.preload = function () {
  this.load.image("parede", "assets/parede.png");
  this.load.image("ground", "assets/plataforma.png");
  this.load.image("bloco", "assets/bloco.png");
  this.load.image("blocolongo", "assets/bloco2.png");
  this.load.image("star", "assets/star.png");
  this.load.image("porta", "assets/portaverde.png");
  this.load.image("parede", "assets/parede.png");
  this.load.image("resistor", "assets/fases/fase4/resistor.png");
  this.load.image("recomeçar", "assets/recomeçar.png");
  this.load.image("inicio", "assets/inicio.png");
  // this.load.image('telebross', 'assets/telebross.png');
  this.load.image("capacitor", "assets/fases/fase5/capacitor.png");
  this.load.image("indutor", "assets/fases/fase5/indutor.png");
  this.load.spritesheet("idle", "assets/ifiano/idle.png", {
    frameWidth: 38,
    frameHeight: 62
  });
  //movimentação do botão fullscreen
  this.load.spritesheet("fullscreen", "assets/fullscreen.png", {
    frameWidth: 64,
    frameHeight: 64
  });

  //movimentação do letreiro de formado
  this.load.spritesheet("formado", "assets/formado.png", {
    frameWidth: 60,
    frameHeight: 60
  });

  this.load.audio("music", "assets/sons/telainicial.mp3");
};
//fim do upload
//--------------------------------------------------------------------

endgame.create = function () {

  //animação formado
  this.anims.create({
    key: "animeformado",
    frames: this.anims.generateFrameNumbers(
      "formado", {
        start: 0,
        end: 5
      }
    ),
    frameRate: 5,
    repeat: -1
  });

  // coloando imgaens na tela
  this.add.image(400, 300, "parede");
  this.add.image(500, 510, "porta");




  //adicionando física das plataformas/formado
  platforms = this.physics.add.staticGroup();
  formado = this.physics.add.staticGroup();

  formado
    .create(400, 150, "animeformado")
    .setScale(4)
    .refreshBody();



  //posicionando plataformas

  //criando chão
  platforms
    .create(400, 700, "ground")
    .setScale(2)
    .refreshBody(); // chão
  platforms
    .create(1200, 700, "ground")
    .setScale(2)
    .refreshBody(); //chão
  //bloco nivel1
  platforms
    .create(600, 455, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 1
  //bloco nível 2
  platforms
    .create(350, 320, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 2

  //criação do player
  player = this.physics.add.sprite(100, 450, "idle");

  //player bater nas bordas
  player.setCollideWorldBounds(true);



  //adiconando objetos a tela
  capacitor = this.physics.add.group({
    key: "capacitor",
    repeat: 2,
    setXY: {
      x: 12,
      y: 50,
      stepX: 70
      // stepY: 70,
    }
  });
  //parte que os capacitor quicam
  capacitor.children.iterate(function (child) {
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.allowGravity = false;
    child.setScale(2)
  });

  //adiconando objetos a tela
  resistor = this.physics.add.group({
    key: "resistor",
    repeat: 2,
    setXY: {
      x: 48,
      y: 20,
      stepX: 70
      // stepY: 70,
    }
  });
  //parte que os resistores quicam
  resistor.children.iterate(function (child) {
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
    child.allowGravity = false;
  });

  //adiconando objetos a tela
  indutor = this.physics.add.group({
    key: "indutor",
    repeat: 2,
    setXY: {
      x: 64,
      y: 0,
      stepX: 70
      // stepY: 70,
    }
  });
  //parte que os indutor quicam
  indutor.children.iterate(function (child) {
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(-200, 200), 20);
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

  //colisão com plataformas
  this.physics.add.collider(player, platforms);
  this.physics.add.collider(resistor, platforms);
  this.physics.add.collider(capacitor, platforms);
  this.physics.add.collider(indutor, platforms);

  //adicionando musica
  var music = this.sound.add("music");

  music.play({
    loop: true,
    volume: 0.3
  });

  //botão para troca de cena
  var trocacena = this.add
    .image(500 - 64, 400, "recomeçar", 0)
    .setOrigin(1, 0)
    .setInteractive();
  trocacena.on(
    "pointerup",
    function () {
      music.stop();
      this.scene.start(start);
    },
    this
  );
};

//fim do create
//--------------------------------------

endgame.update = function () {
  //animação formado
  formado.children.iterate(function (child) {

    child.allowGravity = false;

    child.anims.play("animeformado", true);
  });

};

export {
  endgame
};