import Phaser from '../phaser';
import Button from '../Objects/Button';

export default class EntryScene extends Phaser.Scene {
  constructor() {
    super('Entry');
  }

  preload() {
    this.load.image('space', '../src/resources/images/space-top.png');
    this.load.image('cmdButton', '../src/resources/images/ui/cmdButton.png');
    this.load.image('cmdButtonHover', '../src/resources/images/ui/cmdButtonHover.png');

    this.load.image('carrierShip', '../src/resources/images/ui/carrierShip.png');
    this.load.image('chaserShip', '../src/resources/images/ui/chaserShip.png');
    // this.load.image('gunShip', '../src/resources/images/ui/gunShip.png');
    this.load.image('cmdButtonHover', '../src/resources/images/ui/cmdButtonHover.png');

    this.load.spritesheet('gunShip', '../src/resources/images/ui/gunShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

    this.load.image('laserPlayer', '../src/resources/images/ui/laserPlayer.png');
  }

  create() {
    const centerX = this.game.config.width * 0.5;
    const centerY = this.game.config.height * 0.5;
    // const style = { color: '#fff', fontSize: 24 };
    // this.yText = this.add.text(100, 10, 'Boot Scene', style);
    // this.text = this.add.text(centerX, 100, 'Shooter Game', { fontSize: 40, align: 'center' });
    // this.scene.start('Preloader');

    this.btnspace = this.add.sprite(
      centerX,
      100,
      'space',
    );

    this.title = this.add.text(centerX, 100, 'Shooter Game', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);

    this.menuButton = new Button(this, centerX, centerY, 'cmdButton', 'cmdButtonHover', 'Play', 'Title');

  }
}
