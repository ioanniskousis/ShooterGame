import Phaser from '../phaser';
import SkyLayer from '../Entities/skyLayer';
import { checkScore } from './score';

// function renderInput() {
//   let inputDiv = document.getElementById('inputDiv');
//   if (inputDiv) return;

//   inputDiv = document.createElement('div');
//   inputDiv.className = 'inputDiv';
//   inputDiv.id = 'inputDiv';

//   const input = document.createElement('input');
//   input.type = 'text';
//   input.setAttribute('placeholder', 'enter your name');

//   const saveButton = document.createElement('button');
//   saveButton.innerHTML = 'Save';
//   saveButton.addEventListener('click', () => {
//     if (input.value.trim() !== '') {
//       window.game.playerName = input.value;
//       saveScore(showSaved);
//       inputDiv.remove();
//     }
//   });

//   const cancelButton = document.createElement('button');
//   cancelButton.innerHTML = 'Cancel';
//   cancelButton.addEventListener('click', () => {
//     inputDiv.remove();
//   });

//   inputDiv.appendChild(input);
//   inputDiv.appendChild(saveButton);
//   inputDiv.appendChild(cancelButton);
//   document.body.appendChild(inputDiv);
// }

// async function saveScore(callBack) {
//   const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/0eU4Ao7UOsXIBhit8aU1/scores';
//   const data = {
//     method: 'POST',
//     headers: {
//       Accept: 'Application/json',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//       user: window.game.playerName,
//       score: window.game.points,
//     }),
//   };

//   await fetch(url, data)
//     .then((response) => response.json())
//     .then((data) => callBack(data))
//     .catch((err) => appAlert('Error ', err));
// }

// function showSaved(data) {
//   const scoreText = document.getElementById('scoreText');
//   scoreText.innerHTML = data.result;
// }


// function checkScore() {
//   if (window.game.points > 0) {
//     if (window.game.playerName === '') {
//       renderInput();
//     } else if (window.game.points > 0) {
//       saveScore(showSaved);
//     }
//   }
// }

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

  renderBackground() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new SkyLayer(this, 'sky1', i * 10);
      this.backgrounds.push(bg);
    }
  }

  renderTitle() {
    const title = this.add.text(this.game.config.width * 0.5, 128, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    title.setOrigin(0.5);
  }

  renderMenuButton() {
    const btnMenu = this.add.sprite(
      this.game.config.width * 0.5,
      (this.game.config.height * 0.8),
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

  renderRestartButton() {
    const btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.9,
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
  }

  create() {
    this.renderBackground();
    this.renderTitle();
    this.renderMenuButton();
    this.renderRestartButton();
    this.renderLeadersBoardButton();

    checkScore();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
