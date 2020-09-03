import Phaser from '../phaser';
import SkyLayer from '../Entities/skyLayer';
import { fetchScores, gotScores } from './score';
import menuButton from '../resources/images/ui/menuButton.png';
import menuButtonHover from '../resources/images/ui/menuButtonHover.png';
import { appAlert } from '../utils';

export default class LeadersBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeadersBoardScene' });
  }

  preload() {
    this.load.image('menuButton', menuButton);
    this.load.image('menuButtonHover', menuButtonHover);

    fetchScores(gotScores, appAlert, this);
  }

  renderBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new SkyLayer(this, 'sky1', i * 10);
      this.backgrounds.push(bg);
    }
  }

  renderTitle() {
    const title = this.add.text(this.game.config.width * 0.5, 50, 'Leaders Board', {
      fontFamily: 'monospace',
      fontSize: 32,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    title.setOrigin(0.5);
  }

  renderMenuButton() {
    const btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.9),
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
      const inputDiv = document.getElementById('inputDiv');
      if (inputDiv) {
        inputDiv.remove();
      }
      this.scene.start('Entry');
    }, this);
  }

  create() {
    this.renderBackground();
    this.renderTitle();
    this.renderMenuButton();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
