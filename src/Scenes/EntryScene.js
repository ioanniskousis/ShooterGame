import Phaser from '../phaser';
// import '../resources/images/sky1.png';
// import '../resources/images/space-top.png';
// import '../resources/images/ui/playButton.png';
// import '../resources/images/ui/playButtonHover.png';
// import '../resources/images/ui/leadersBoardButton.png';
// import '../resources/images/ui/leadersBoardButtonHover.png';
// import '../resources/images/ui/playerShip.png';
// import '../resources/images/ui/alienShip.png';
// import '../resources/images/ui/motherShip.png';
// import '../resources/images/ui/dogShip.png';
// import '../resources/audio/entry.mp3';

export default class EntryScene extends Phaser.Scene {
  constructor() {
    super('Entry');
  }

  preload() {
    this.load.image('sky1', '../src/resources/images/sky1.png');
    this.load.image('space', '../src/resources/images/space-top.png');
    this.load.image('playButton', '../src/resources/images/ui/playButton.png');
    this.load.image('playButtonHover', '../src/resources/images/ui/playButtonHover.png');
    this.load.image('leadersBoardButton', '../src/resources/images/ui/leadersBoardButton.png');
    this.load.image('leadersBoardButtonHover', '../src/resources/images/ui/leadersBoardButtonHover.png');

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
      0,
      'space',
    );
  }

  renderTitle() {
    this.title = this.add.text(this.game.config.width * 0.5, 55, 'Shooter Game', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }

  renderInstructions() {
    const style = {
      fontFamily: 'monospace',
      fontSize: 16,
      color: '#aaf',
      align: 'center',
    };
    const instruction1 = 'Use keyboard arrows to move your plane';
    const instruction2 = 'Shoot using the space bar';
    const xPos = this.game.config.width * 0.5;
    const yPos = this.game.config.height - 40;
    this.instructions1 = this.add.text(xPos, yPos, instruction1, style);
    this.instructions1.setOrigin(0.5);
    this.instructions2 = this.add.text(xPos, yPos + 20, instruction2, style);
    this.instructions2.setOrigin(0.5);
  }

  renderPlayerName() {
    this.title = this.add.text(this.game.config.width * 0.5, 140, window.game.playerName, {
      fontFamily: 'monospace',
      fontSize: 22,
      color: 'yellow',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }

  renderPlayButton() {
    const playButton = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) - 100,
      'playButton',
    );
    playButton.setInteractive();

    playButton.on('pointerover', () => {
      playButton.setTexture('playButtonHover');
    }, this);

    playButton.on('pointerout', () => {
      playButton.setTexture('playButton');
    });

    playButton.on('pointerdown', () => {
      this.stopBackSound();
      this.scene.start('BattleScene');
    }, this);
  }

  renderLeadersBoardButton() {
    const leadersBoardButton = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) - 30,
      'leadersBoardButton',
    );
    leadersBoardButton.setInteractive();

    leadersBoardButton.on('pointerover', () => {
      leadersBoardButton.setTexture('leadersBoardButtonHover');
    }, this);

    leadersBoardButton.on('pointerout', () => {
      leadersBoardButton.setTexture('leadersBoardButton');
    });

    leadersBoardButton.on('pointerdown', () => {
      this.scene.start('LeadersBoardScene');
    }, this);
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
      (this.game.config.height * 0.5) + 80,
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
    this.music = this.sound.add('entry');
    // this.sound.play('entry', { volume: 0.05, loop: true });
  }

  stopBackSound() {
    this.music.stop();
  }

  create() {
    this.renderBackground();
    this.renderTitle();
    this.renderInstructions();
    this.renderPlayerName();
    this.renderPlayButton();
    this.renderLeadersBoardButton();
    this.renderPlayerShip();
    this.renderAlienShip();
    this.renderDogShip();
    this.renderMotherShip();

    this.startBackSound();
  }
}
