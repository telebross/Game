import {
  fase2
} from "./fase2.js";
import {
  start
} from "./start.js";
import { endgame } from "./endgame.js";


//criação do player 1
var player;

//plataformas/icones na tela
var scoreText;
var scoreJogador1;
var orientaçaoText;

//plataformas
var platforms;

var bombs;

var gameOver;

//movimentação de cameras
var moveCam = false;

//criando porta
var portas;

//parte de coletáveis
var bois;

//teclados do personagem
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



  //audios do jogo
  this.load.audio("formatura", "assets/sons/formatura.mp3");
};

formatura.create = function () {
  this.cameras.main.setBounds(0, 0, 3200, 600);
  this.physics.world.setBounds(0, 0, 3200, 600);

  //  colocando a imagem de fundo
  this.add.image(400, 300, "parede");
  this.add.image(1200, 300, "parede");
  this.add.image(2000, 300, "parede");
  this.add.image(2800, 300, "parede");

  //criando física da porta
  portas = this.physics.add.group();

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  criando chão do jogo

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

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "idle");



  //parte do player com cameras
  this.cameras.main.startFollow(
    player,
    true,
    0.05,
    0.05
  );

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
  bois = this.physics.add.group({
    key: "boi",
    repeat: 0,
    setXY: {
      x: 200,
      y: 0,
      stepX: 70
    }
  });

  bois.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    // child.setBounceY(Phaser.Math.FloatBetween(10, 10));
    //child.setVelocity(Phaser.Math.Between(-300, 250), 30);
    //child.setCollideWorldBounds(true);
    child.setBounce(1);
    child.setCollideWorldBounds(true);
    child.setVelocity(Phaser.Math.Between(190, 190), 30);
    child.allowGravity = false;
  });





  bombs = this.physics.add.group();

  //  The score1
  scoreText = this.add.text(16, 16, "nota: 0", {
    fontSize: "32px",
    fill: "#000"
  });
  scoreText.setScrollFactor(0);

  //texto orientativo
  this.orientaçaoText = this.add.text(100, 100, "pegue seu diploma -->", {
    fontSize: "32px",
    fill: "#000"
  });
  this.orientaçaoText = this.add.text(2700, 100, "Achou que seria fácil?", {
    fontSize: "32px",
    fill: "#000"
  });
  this.orientaçaoText = this.add.text(2700, 200, "<-- encontre a porta", {
    fontSize: "32px",
    fill: "#000"
  });
  // this.orientaçãoText.visible = true;

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

  this.physics.add.collider(bois, platforms);
  // this.physics.add.collider(telefones, platforms); //coletável com plataforma
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(portas, platforms);
  //this.physics.add.collider(inimigo, platforms);
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  //this.physics.add.overlap(player, stars, collectStar, null, this);
  this.physics.add.overlap(player, bois, coletardiploma, null, this);
  this.physics.add.overlap(player, portas, mudarfase, null, this);

  //this.physics.add.overlap(player, telefones, abrirporta, null, this);
  //this.physics.add.overlap(player, telefones, coletar, null, this); //coletar coletáveis



  /*var trocacena = this.add
    .image(500 - 64, 400, "boi", 0)
    .setOrigin(1, 0)
    .setInteractive();
  trocacena.on(
    "pointerup",
    function () {
      formatura.stop();
      this.scene.start(endgame);
    },
    this
  );*/
};

formatura.update = function () {

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
  if (cursors.left.isDown) {
    player.setVelocityX(-200);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(200);

    player.anims.play("right", true);
  } else if (cursors.up.isUp && cursors.left.isUp && cursors.right.isUp) {
    player.setVelocityX(0);
    player.anims.play("turn");
  }
  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-660);
  }
};

function coletardiploma(player, boi) {

  // player.disableBody(true, true);
  boi.disableBody(true, true);

  scoreJogador1 += 10;
  scoreText.setText("nota: " + scoreJogador1);

  if (bois.countActive(true) === 0) {
    //  A new batch of stars to collect
    /* bois.children.iterate(function (child) {

       child.enableBody(true, child.x, 0, true, true);

     });*/

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var porta = portas.create(x, 16, "saida");
    porta.setBounce(1);
    porta.setCollideWorldBounds(true);
    porta.setVelocity(Phaser.Math.Between(-190, -190), 30);
    porta.allowGravity = false;


  }

}

function mudarfase(player, portas) {

  player.disableBody(true, true);
  //portas.disableBody(true, true);

  player.setTint(0xff0000);
  formatura.stop();
  gameOver = true;
  scoreJogador1 = 0;
  this.scene.start(endgame);
}

export {
  formatura
};