import Phaser from '../phaser';
import SkyLayer from '../Entities/skyLayer';
import { appAlert } from '../utils';

async function fetchScores(callBack, scene) {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/0eU4Ao7UOsXIBhit8aU1/scores';

  await fetch(url)
    .then((response) => response.json())
    .then((data) => callBack(data, scene))
    .catch((err) => appAlert('Error', err));
}

function renderScoreData(scene, scoreData, yPos) {
  const tcolor = scoreData.user === window.game.playerName ? 'yellow' : '#ffffff';
  scene.add.text(100, yPos, scoreData.user, {
    fontFamily: 'monospace',
    fontSize: 22,
    color: tcolor,
    align: 'left',
  });
  scene.add.text(280, yPos, scoreData.score, {
    fontFamily: 'monospace',
    fontSize: 22,
    color: tcolor,
    align: 'right',
    fixedWidth: 100,
  });
}

function gotScores(data, scene) {
  const { result } = data;
  const rsort = result.sort((a, b) => b.score - a.score);
  let yPos = 100;
  const players = [];
  for (let index = 0; index < rsort.length; index += 1) {
    const element = rsort[index];
    if (!players.includes(element.user)) {
      players.push(element.user);
      renderScoreData(scene, element, yPos);
      yPos += 30;
      if (players.length > 8) break;
    }
  }
}

export default class LeadersBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeadersBoardScene' });
  }

  preload() {
    this.load.image('menuButton', '../src/resources/images/ui/menuButton.png');
    this.load.image('menuButtonHover', '../src/resources/images/ui/menuButtonHover.png');

    fetchScores(gotScores, this);
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
