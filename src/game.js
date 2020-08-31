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
  points: 0,
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('Entry');
  }
}

window.game = new Game();
