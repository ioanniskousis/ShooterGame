import { addPoints, saveScore, fetchScores } from '../src/Scenes/score';
import 'regenerator-runtime/runtime';

class MokeGame {
  constructor() {
    this.points = 0;
  }
}

function errorCallBack(title, text) {
  // eslint-disable-next-line no-console
  console.log(title, text);
}

describe('the game public functions', () => {
  const game = new MokeGame();
  test('game points', () => {
    game.points = addPoints(game, 200);
    expect(game.points).toBe(200);
  });

  test('saving user\'s score asynchronously', done => {
    function saveScoreCallback(data) {
      try {
        const pos = data.result.indexOf('Leaderboard');
        expect(pos).toBe(0);
        done();
      } catch (error) {
        done(error);
      }
    }

    saveScore(saveScoreCallback, errorCallBack, 'George', 20000);
  });

  test('retrieving users\' scores asynchronously', done => {
    function findGeorge(scoreData) {
      return scoreData.user === 'George';
    }
    function fetchScoresCallback(data) {
      try {
        const george = data.result.find(findGeorge);
        expect(george.user).toEqual('George');
        done();
      } catch (error) {
        done(error);
      }
    }

    fetchScores(fetchScoresCallback, errorCallBack, 'scene');
  });
});
