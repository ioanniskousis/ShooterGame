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

    this.load.spritesheet('playerShip', '../src/resources/images/ui/playerShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('alienShip', '../src/resources/images/ui/alienShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet('motherShip', '../src/resources/images/ui/motherShip.png', {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image('dogShip', '../src/resources/images/ui/dogShip.png');

    this.load.audio('entry', '../src/resources/audio/entry.mp3');
  }

  renderBackground() {
    this.space = this.add.sprite(
      this.game.config.width * 0.5,
      70,
      'space',
    );
  }

  renderPlayButton() {
    const centerX = this.game.config.width * 0.5;
    const centerY = this.game.config.height * 0.5;
    this.playButton = new Button(this, centerX, centerY - 80, 'cmdButton', 'cmdButtonHover', 'Play', 'Battle');
  }

  renderTitle() {
    this.title = this.add.text(this.game.config.width * 0.5, 100, 'Shooter Game', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }

  renderPlayerShip() {
    this.anims.create({
      key: 'playerShip',
      frames: this.anims.generateFrameNumbers('playerShip'),
      frameRate: 20,
      repeat: -1,
    });
    this.playerShip = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5 * 1.7,
      'playerShip',
    );
    this.playerShip.scale = 4.0;
    this.playerShip.play('playerShip');
  }

  renderAlienShip() {
    this.alienShip = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) + 30,
      'alienShip',
    );
    this.alienShip.scale = 4.0;
    this.anims.create({
      key: 'alienShip',
      frames: this.anims.generateFrameNumbers('alienShip'),
      frameRate: 20,
      repeat: -1,
    });
    this.alienShip.play('alienShip');
  }

  renderDogShip() {
    this.dogShip = this.add.sprite(
      (this.game.config.width * 0.5) * 0.3,
      (this.game.config.height * 0.5) + 10,
      'dogShip',
    );
    this.dogShip.scale = 4.0;
  }

  renderMotherShip() {
    this.motherShip = this.add.sprite(
      (this.game.config.width * 0.5) * 1.7,
      (this.game.config.height * 0.5) + 10,
      'motherShip',
    );
    this.motherShip.scale = 4.0;
  }

  startBackSound() {
    this.sound.play('entry', { volume: 0.1, loop: true });
  }

  create() {
    this.renderBackground();
    this.renderTitle();
    this.renderPlayButton();
    this.renderPlayerShip();
    this.renderAlienShip();
    this.renderDogShip();
    this.renderMotherShip();

    this.startBackSound();
  }
}
