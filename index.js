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
  fase4
} from "./fase4.js";
import {
  fase5
} from "./fase5.js";
import {
  fase6
} from "./fase6.js";
import {
  fase7
} from "./fase7.js";
import {
  fase8
} from "./fase8.js";
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
  gameover4
} from "./gameover4.js";
import {
  gameover5
} from "./gameover5.js";
import {
  gameover6
} from "./gameover6.js";
import {
  gameover7
} from "./gameover7.js";
import {
  gameover8
} from "./gameover8.js";
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
  scene: [start, fase1, gameover1, fase2, gameover2, fase3, gameover3, fase4, gameover4, fase5, gameover5, fase6, gameover6, fase7, gameover7, fase8, gameover8, formatura, endgame]
};

var game = new Phaser.Game(config);