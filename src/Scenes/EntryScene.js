import Phaser from '../phaser';
import Button from '../Objects/Button';
import Player from '../Entities/player';
import GunShip from '../Entities/gunShip';

export default class EntryScene extends Phaser.Scene {
  constructor() {
    super('Entry');
  }

  preload() {
    this.load.image('space', '../src/resources/images/space-top.png');
    this.load.image('cmdButton', '../src/resources/images/ui/cmdButton.png');
    this.load.image('cmdButtonHover', '../src/resources/images/ui/cmdButtonHover.png');

    // this.load.image('playerShip', '../src/resources/images/ui/playerShip.png');
    this.load.spritesheet('playerShip', '../src/resources/images/ui/playerShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('gunShip', '../src/resources/images/ui/gunShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });

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

    this.space = this.add.sprite(
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

    this.playButton = new Button(this, centerX, centerY, 'cmdButton', 'cmdButtonHover', 'Play', 'Battle');

    // player ship
    this.anims.create({
      key: 'playerShip',
      frames: this.anims.generateFrameNumbers('playerShip'),
      frameRate: 20,
      repeat: -1,
    });
    this.player = new Player(
      this,
      centerX,
      centerY * 1.7,
      'playerShip',
    );
    this.player.scale = 4.0;

    // gunShip
    this.anims.create({
      key: 'gunShip',
      frames: this.anims.generateFrameNumbers('gunShip'),
      frameRate: 20,
      repeat: -1,
    });
    this.gunShip = new GunShip(
      this,
      centerX,
      centerY * 1.7,
      'gunShip',
    );
    this.gunShip.scale = 4.0;
  }
}
