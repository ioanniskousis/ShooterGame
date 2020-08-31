import Phaser from './phaser';
import EntryScene from './Scenes/EntryScene';
import BattleScene from './Scenes/BattleScene';
import GameOverScene from './Scenes/GameOverScene';
import LeadersBoardScene from './Scenes/LeadersBoardScene';

const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  backgroundColor: '#036',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [
    EntryScene,
    BattleScene,
    GameOverScene,
    LeadersBoardScene,
  ],
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.points = 0;
    this.playerName = '';
    this.power = 100;
    this.scene.start('Entry');
  }
}

window.game = new Game();
