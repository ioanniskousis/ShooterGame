import { appAlert } from '../utils';

export async function saveScore(callBack) {
  const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/0eU4Ao7UOsXIBhit8aU1/scores';
  const data = {
    method: 'POST',
    headers: {
      Accept: 'Application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: window.game.playerName,
      score: window.game.points,
    }),
  };

  await fetch(url, data)
    .then((response) => response.json())
    .then((data) => callBack(data))
    .catch((err) => appAlert('Error ', err));
}

function showSaved(data) {
  const scoreText = document.getElementById('scoreText');
  scoreText.innerHTML = data.result;
}

export function renderInput() {
  let inputDiv = document.getElementById('inputDiv');
  if (inputDiv) return;

  inputDiv = document.createElement('div');
  inputDiv.className = 'inputDiv';
  inputDiv.id = 'inputDiv';

  const input = document.createElement('input');
  input.type = 'text';
  input.setAttribute('placeholder', 'enter your name');

  const saveButton = document.createElement('button');
  saveButton.innerHTML = 'Save';
  saveButton.addEventListener('click', () => {
    if (input.value.trim() !== '') {
      window.game.playerName = input.value;
      saveScore(showSaved);
      inputDiv.remove();
    }
  });

  const cancelButton = document.createElement('button');
  cancelButton.innerHTML = 'Cancel';
  cancelButton.addEventListener('click', () => {
    inputDiv.remove();
  });

  inputDiv.appendChild(input);
  inputDiv.appendChild(saveButton);
  inputDiv.appendChild(cancelButton);
  document.body.appendChild(inputDiv);
}

export function renderScore() {
  let scoresDiv = document.getElementById('scoresDiv');
  if (scoresDiv) {
    const scoreText = document.getElementById('scoreText');
    scoreText.innerHTML = 'Score : 0';
    return;
  }
  scoresDiv = document.createElement('div');
  scoresDiv.className = 'scoresDiv';
  scoresDiv.id = 'scoresDiv';

  const scoreText = document.createElement('label');
  scoreText.id = 'scoreText';
  scoreText.innerHTML = 'Score : '.concat(window.game.points.toString());

  scoresDiv.appendChild(scoreText);
  document.body.appendChild(scoresDiv);
}

export function addPoints(points) {
  window.game.points += points;
  const scoreText = document.getElementById('scoreText');
  scoreText.innerHTML = 'Score : '.concat(window.game.points.toString());
}

export function checkScore() {
  if (window.game.points > 0) {
    if (window.game.playerName === '') {
      renderInput();
    } else if (window.game.points > 0) {
      saveScore(showSaved);
    }
  }
}
