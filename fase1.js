import {
  gameover1
} from "./gameover1.js";
import {
  fase2
} from "./fase2.js";

//criação do player 1
var player;


//criação de inimigos
var bombs;
var inimigo;
var boneco1;
var boneco2;
var boneco3;


//plataformas/icones na tela
var scoreText;
var scoreJogador1 = 0;
var platforms;

//parte de coletáveis
var terminais;
var telefones;

//movimtação de câmeras
var moveCam = false;

//movimentação personagens
var cursors;
var WKey;
var AKey;
var DKey;
var pointer;

//mudança de cena
var gameOver = false;
var proximafase = false;
var portas;

//adicionando sons
var fundodojogo;
var coleta;

var fase1 = new Phaser.Scene("fase1");

fase1.preload = function () {
  //carregando imagens em geral
  this.load.image("parede", "assets/parede.png");
  this.load.image("ground", "assets/plataforma.png");
  this.load.image("bloco", "assets/bloco.png");
  this.load.image("blocolongo", "assets/bloco2.png");
  this.load.image("telefone", "assets/fases/fase1/telefone.png");
  this.load.image("terminal1", "assets/fases/fase1/terminal.png");
  this.load.image("porta", "assets/portaverde.png");
  this.load.image("letreiro1", "assets/fases/fase1/fase1.png");
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
  this.load.spritesheet("antena1", "assets/fases/fase1/antena.png", {
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

  //animações dos inimigos
  /*this.load.spritesheet('dude', 'assets/dude.png', {
    frameWidth: 32,
    frameHeight: 48
  });*/

  //audios do jogo
  this.load.audio("fundodojogo", "assets/sons/fundodojogo.mp3");
  this.load.audio("coleta", "assets/sons/coleta.mp3");
};
//fim do upload

fase1.create = function () {
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

  //adicionando letreiro da fase
  this.add.image(400, 200, "letreiro1");

  //  The platforms group contains the ground and the 2 ledges we can jump on
  platforms = this.physics.add.staticGroup();

  //  criando física das plataformas
  //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
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
    .refreshBody(); //chãoplatforms
  platforms
    .create(2800, 700, "ground")
    .setScale(2)
    .refreshBody(); //chão

  //primeiro abstáculo

  platforms
    .create(500, 400, "blocolongo")
    .setScale(2)
    .refreshBody();

  platforms
    .create(704, 400, "blocolongo")
    .setScale(2)
    .refreshBody();
  //-------------------------------------------

  //criando segundo obstáculo
  //primeira parte
  platforms
    .create(970, 508, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 1
  platforms
    .create(1125, 508, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 1
  platforms
    .create(1125, 444, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 2
  platforms
    .create(1175, 380, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 3
  //segunda parte
  platforms
    .create(1400, 380, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 3
  platforms
    .create(1448, 444, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 2
  platforms
    .create(1602, 508, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 1
  platforms
    .create(1448, 508, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel 1
  //-------------------------------
  //terceiro obstáculo
  platforms
    .create(2500, 508, "blocolongo")
    .setScale(2)
    .refreshBody(); //nivel1
  platforms
    .create(2704, 508, "blocolongo")
    .setScale(2)
    .refreshBody(); //nível 1

  platforms
    .create(2550, 445, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 2
  platforms
    .create(2704, 445, "blocolongo")
    .setScale(2)
    .refreshBody(); //nível 2
  platforms
    .create(2704, 383, "blocolongo")
    .setScale(2)
    .refreshBody(); //nível 3
  platforms
    .create(2753, 321, "bloco")
    .setScale(2)
    .refreshBody(); //nivel 4

  // The player and its settings
  player = this.physics.add.sprite(100, 450, "idle");
  //player2 = this.physics.add.sprite(150, 450, 'idle');

  //parte do player com cameras
  this.cameras.main.startFollow(player, true, 0.05, 0.05);
  //this.cameras.main.startFollow(player2, true, 0.05, 0.05);

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

  this.anims.create({
    key: "dead",
    frames: this.anims.generateFrameNumbers("dead", {
      start: 0,
      end: 16
    }),
    frameRate: 10,
    repeat: 0
  });

  /* //animação de coletável
  this.anims.create({
    key: "dude",
    frames: this.anims.generateFrameNumbers("dude", {
      start: 0,
      end: 9
    }),
    frameRate: 20,
    repeat: -1
  });*/

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
  //animação do 'inimigo'
  this.anims.create({
    key: "animeantena1",
    frames: this.anims.generateFrameNumbers("antena1", {
      start: 0,
      end: 4
    }),
    frameRate: 4,
    repeat: -1
  });

  //adicionando efeito de coleta
  coleta = this.sound.add("coleta");

  //adicionando musica de fundo

  fundodojogo = this.sound.add("fundodojogo");
  fundodojogo.play({
    loop: true,
    volume: 1
  });

  //  Input Events
  cursors = this.input.keyboard.createCursorKeys();
  WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
  AKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
  DKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
  // Touch
  pointer = this.input.addPointer(1);

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  terminais = this.physics.add.group({
    key: "terminal1",
    repeat: 4,
    setXY: {
      x: 500, //como adicionar mais de um ícone
      y: 0,

      stepX: 500
    }
  });

  terminais.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setCircle(15);
  });

  //adicionando coletável como a estrela
  telefones = this.physics.add.group({
    key: "telefone",
    repeat: 4,
    setXY: {
      x: 100,
      y: 0,
      stepX: 500
    }
  });

  telefones.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setCircle(25);
  });

  bombs = this.physics.add.group();
  portas = this.physics.add.group();
  inimigo = this.physics.add.group();

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
  //this.physics.add.collider(player2, platforms);
  this.physics.add.collider(terminais, platforms);
  this.physics.add.collider(telefones, platforms); //coletável com plataforma
  //this.physics.add.collider(antena, platforms); //coletável com plataforma
  this.physics.add.collider(bombs, platforms);
  this.physics.add.collider(portas, platforms);
  this.physics.add.collider(inimigo, platforms);
  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player, terminais, coletavel2, null, this);
  this.physics.add.overlap(player, telefones, coletavel1, null, this);
  //this.physics.add.overlap(player, telefones, coletar, null, this); //coletar coletáveis

  this.physics.add.collider(player, bombs, hitBomb, null, this);
  //this.physics.add.collider(player2, bombs, hitBomb, null, this);
  this.physics.add.collider(player, portas, mudarfase, null, this);
  this.physics.add.collider(player, inimigo, hitBomb, null, this);

  //adicionando inimigo1
  boneco1 = inimigo.create(2000, 510, "antena1");
  boneco1.setBounce(0);
  boneco1.setCollideWorldBounds(true);
  boneco1.setVelocityX(100);
  boneco1.allowGravity = false;
  boneco1.setCircle(23);
  //adicionando inimigo2
  boneco2 = inimigo.create(1300, 0, "antena1");
  boneco2.setBounce(1);
  boneco2.setCollideWorldBounds(true);
  boneco2.setVelocityY(100);
  boneco2.allowGravity = false;
  boneco2.setCircle(23);
  //adicionando inimigo3
  boneco3 = inimigo.create(2900, 200, "antena1");
  boneco3.setBounce(0);
  boneco3.setCollideWorldBounds(true);
  boneco3.setVelocityY(0);
  boneco3.allowGravity = false;
  boneco3.setCircle(23);

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
//fim do create
//------------------------------------------------

fase1.update = function () {
  //gameover animação
  /*if (gameOver === true) {
    this.scene.start(gameover); //ao morrer o jogo não reiniciar
  }*/

  //mudaça de fase
  /*if (proximafase === true) {
    this.scene.start(fase2); // não troca a cena, aparece a porta e a animação
  }*/

  var cam = this.cameras.main;

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

  //          morte com animação
  /* if (player.anims.getCurrentKey() === "dead" &&
     player.anims.getProgress("dead") < 1) {
     //player.setTint(0xff0000);
   } else if (
     player.anims.getCurrentKey() === "dead" &&
     player.anims.getProgress("dead") === 1) {

     this.physics.pause();
     music.stop();
     gameOver = true;
   }*/

  //          mudança de fase com animação
  /*if (porta) {

    if (porta.anims.getCurrentKey() === "saida" && //fica gerando erro nessa linha falando que não esta definido.
      portas.anims.getProgress("saida") < 1) {
      //player.setTint(0xff0000);
    } else if (
      portas.anims.getCurrentKey() === "saida" &&
      portas.anims.getProgress("saida") === 1) {

      //this.physics.pause();
      music.stop();
      proximafase = true;
    }
  }*/

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
  //movimentação personagem 2
  /*
    if (AKey.isDown) {
      player2.setVelocityX(-160);

      player2.anims.play('left', true);
    } else if (DKey.isDown) {
      player2.setVelocityX(160);

      player2.anims.play('right', true);
    } else

    {
      player2.setVelocityX(0);

      player2.anims.play('turn');
    }
    if (WKey.isDown && player2.body.touching.down) {
      player2.setVelocityY(-330);
    }
  */

  //movimentação boneco1
  if (boneco1.body.position.x - 1999 > 200) {
    boneco1.setVelocityX(-200);
    boneco1.setFlipX(false);
    boneco1.anims.play("animeantena1", true);
  } else if (boneco1.body.position.x - 1999 < -200) {
    boneco1.setVelocityX(200);
    boneco1.setFlipX(true);
    boneco1.anims.play("animeantena1", true);
  }
  //animação do boneco2
  boneco2.anims.play("animeantena1", true);
  //movimentação boneco3
  if (boneco3.body.position.x - 3000 > 10) {
    boneco3.setVelocityX(-300);
    boneco3.setFlipX(false);
    boneco3.anims.play("animeantena1", true);
  } else if (boneco3.body.position.x - 3000 < -100) {
    boneco3.setVelocityX(300);
    boneco3.setFlipX(true);
    boneco3.anims.play("animeantena1", true);
  }
};

//icone1 de coleta
function coletavel1(player, telefone) {
  telefone.disableBody(true, true);

  //  Add and update the score
  scoreJogador1 += 1;
  scoreText.setText("nota: " + scoreJogador1);

  if (telefones.countActive(true) === 0) {
    //  A new batch of stars to collect
    telefones.children.iterate(function (child) {
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
function coletavel2(player, terminal) {
  terminal.disableBody(true, true);

  //  Add and update the score
  scoreJogador1 += 1;
  scoreText.setText("nota: " + scoreJogador1);

  if (terminais.countActive(true) === 0) {
    //  A new batch of stars to collect
    terminais.children.iterate(function (child) {
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

function hitBomb(player, bomb) {
  // this.physics.pause();

  player.setTint(0xff0000);
  // player.anims.play('dead', true);
  this.physics.pause();
  fundodojogo.stop();
  gameOver = true;
  scoreJogador1 = 0;
  this.scene.start(gameover1);
}

function mudarfase(player, portas) {
  // this.physics.pause();
  player.disableBody(true, true);

  player.setTint(0xff0000);
  portas.anims.play("saida", true);
  fundodojogo.stop();
  gameOver = true;
  scoreJogador1 = 0;
  this.scene.start(fase2);
}

export {
  fase1
};