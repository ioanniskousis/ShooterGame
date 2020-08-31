import Phaser from '../phaser';
import SkyLayer from '../Entities/skyLayer';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  preload() {
    this.load.image('restartButton', '../src/resources/images/ui/restartButton.png');
    this.load.image('restartButtonHover', '../src/resources/images/ui/restartButtonHover.png');
    this.load.image('menuButton', '../src/resources/images/ui/menuButton.png');
    this.load.image('menuButtonHover', '../src/resources/images/ui/menuButtonHover.png');
    this.load.image('leadersBoardButton', '../src/resources/images/ui/leadersBoardButton.png');
    this.load.image('leadersBoardButtonHover', '../src/resources/images/ui/leadersBoardButtonHover.png');
  }

  renderLeadersBoardButton() {
    const leadersBoardButton = this.add.sprite(
      this.game.config.width * 0.5,
      190,
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

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new SkyLayer(this, 'sky1', i * 10);
      this.backgrounds.push(bg);
    }

    const title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    title.setOrigin(0.5);

    const btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'restartButton',
    );
    btnRestart.setInteractive();

    btnRestart.on('pointerover', () => {
      btnRestart.setTexture('restartButtonHover');
    }, this);

    btnRestart.on('pointerout', () => {
      btnRestart.setTexture('restartButton');
    });

    btnRestart.on('pointerdown', () => {
      this.scene.start('BattleScene');
    }, this);

    const btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.5) + 50,
      'menuButton',
    );
    btnMenu.setInteractive();

    btnMenu.on('pointerover', () => {
      btnMenu.setTexture('menuButtonHover');
    }, this);

    btnMenu.on('pointerout', () => {
      btnMenu.setTexture('menuButton');
    });

    btnMenu.on('pointerup', () => {
      this.scene.start('Entry');
    }, this);

    this.renderLeadersBoardButton();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
