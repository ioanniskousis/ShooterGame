import Phaser from '../phaser';
import SkyLayer from '../Entities/skyLayer';

function renderInput() {
  const inputDiv = document.createElement('div');
  inputDiv.className = 'inputDiv';
  inputDiv.id = 'inputDiv';

  const input = document.createElement('input');
  input.type = 'text';

  const button = document.createElement('button');
  button.innerHTML = 'Save';
  button.addEventListener('click', () => {
    inputDiv.remove();
  });

  inputDiv.appendChild(input);
  inputDiv.appendChild(button);
  document.body.appendChild(inputDiv);
}

async function fetchScores(callBack) {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/0eU4Ao7UOsXIBhit8aU1/scores';

  // const data = {
  //   method: 'GET',
  //   headers: {
  //     Accept: 'Application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     name: 'SpaceSjafhjdskcbter',
  //   }),
  // };
  // 0eU4Ao7UOsXIBhit8aU1
  // result,Game with ID: 0eU4Ao7UOsXIBhit8aU1 added.
  // result,Game with ID: xVDL8s89b8FbTpcOukzM added.

  await fetch(url)
    .then((response) => response.json())
    .then((data) => callBack(data))
    .catch((err) => alert('Error : '.concat(err)));
}

export default class LeadersBoardScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LeadersBoardScene' });
  }

  gotScores(data) {
    alert(Object.entries(data));
    // alert(this.backgrounds);
  }

  preload() {
    this.load.image('menuButton', '../src/resources/images/ui/menuButton.png');
    this.load.image('menuButtonHover', '../src/resources/images/ui/menuButtonHover.png');

    fetchScores(this.gotScores);
  }

  create() {
    this.backgrounds = [];
    for (let i = 0; i < 5; i += 1) {
      const bg = new SkyLayer(this, 'sky1', i * 10);
      this.backgrounds.push(bg);
    }

    const title = this.add.text(this.game.config.width * 0.5, 50, 'Leaders Board', {
      fontFamily: 'monospace',
      fontSize: 32,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    title.setOrigin(0.5);

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

    renderInput();
  }

  update() {
    for (let i = 0; i < this.backgrounds.length; i += 1) {
      this.backgrounds[i].update();
    }
  }
}
