import {
  start
} from "./start.js";
import {
  fase1
} from "./fase1.js";
import {
  fase2
} from "./fase2.js";
import {
  fase3
} from "./fase3.js";
import {
  formatura
} from "./formatura.js";
import {
  gameover1
} from "./gameover1.js";
import {
  gameover2
} from "./gameover2.js";
import {
  gameover3
} from "./gameover3.js";
import {
  endgame
} from "./endgame.js";

var config = {
  type: Phaser.AUTO,
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 500
      },
      debug: false
    }
  },
  // Suporte a tela cheia
  scale: {
    mode: Phaser.Scale.FIT,
    parent: "game",
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 800,
    height: 600
  },
  // Várias cenas, em sequência
  scene: [start, fase1, fase2, fase3, gameover1, gameover2, gameover3, formatura, endgame] //removendo gameover2 funciona
};

var game = new Phaser.Game(config);