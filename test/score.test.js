import { addPoints } from '../src/Scenes/score';

class MokeGame {
  constructor() {
    this.points = 0;
  }
}

describe('the game public functions', () => {
  const game = new MokeGame();
  test('game points', () => {
    game.points = addPoints(game, 200);
    expect(game.points).toBe(200);
  });
});
