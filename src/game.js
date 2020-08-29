import Phaser from './phaser';
import EntryScene from './Scenes/EntryScene';

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 640,
  backgroundColor: '#036',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.add('Entry', EntryScene);
    this.scene.start('Entry');
  }
}

window.game = new Game();
