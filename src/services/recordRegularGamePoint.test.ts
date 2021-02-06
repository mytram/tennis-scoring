import Game, { GameSide } from 'models/Game';

import { recordRegularGamePoint } from 'services/recordReguarlGamePoint.service';

const getDeuceGame = () => {
  const game: Game = new Game();

  recordRegularGamePoint({ game, wonBy: GameSide.First });
  recordRegularGamePoint({ game, wonBy: GameSide.First });
  recordRegularGamePoint({ game, wonBy: GameSide.First });

  recordRegularGamePoint({ game, wonBy: GameSide.Second });
  recordRegularGamePoint({ game, wonBy: GameSide.Second });
  recordRegularGamePoint({ game, wonBy: GameSide.Second });

  return game;
};

describe('recordRegularGamePoint', () => {
  describe('game scores', () => {
    it('records scores 15, 30, 40 for the first three points', () => {
      const game: Game = new Game();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.records[GameSide.First].score).toBe(15);
      expect(game.records[GameSide.Second].score).toBe(0);

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.records[GameSide.First].score).toBe(30);
      expect(game.records[GameSide.Second].score).toBe(0);

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.records[GameSide.First].score).toBe(40);
      expect(game.records[GameSide.Second].score).toBe(0);

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.records[GameSide.Second].score).toBe(15);

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.records[GameSide.Second].score).toBe(30);

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.records[GameSide.Second].score).toBe(40);

      expect(game.winner).toBeNull();
    });
  });

  describe('win', () => {
    it('wins 4 points and two more the opponent', () => {
      const game: Game = new Game();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      recordRegularGamePoint({ game, wonBy: GameSide.First });
      recordRegularGamePoint({ game, wonBy: GameSide.First });

      recordRegularGamePoint({ game, wonBy: GameSide.First });

      expect(game.winner).toBe(GameSide.First);
    });

    it('wins 2 more points after deuce', () => {
      const game = getDeuceGame();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      recordRegularGamePoint({ game, wonBy: GameSide.First });

      expect(game.winner).toBe(GameSide.First);
    });

    it('wins 2 more points after advantage being flipped', () => {
      const game = getDeuceGame();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.advantage).toBe(GameSide.First);

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      recordRegularGamePoint({ game, wonBy: GameSide.Second });

      recordRegularGamePoint({ game, wonBy: GameSide.Second });

      expect(game.winner).toBe(GameSide.Second);
    });

    it('does nothing if the game is already won', () => {
      const game = getDeuceGame();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      recordRegularGamePoint({ game, wonBy: GameSide.First });

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.winner).toBe(GameSide.First);
    });
  });

  describe('deuce', () => {
    it('records deuce when both sides tie at 3 points', () => {
      const game = getDeuceGame();

      expect(game.deuce).toBe(true);
    });

    it('is not deuce after once side passes 3 points', () => {
      const game = getDeuceGame();
      expect(game.deuce).toBe(true);
      recordRegularGamePoint({ game, wonBy: GameSide.Second });

      expect(game.deuce).toBe(false);
    });
  });

  describe('advantage', () => {
    it('records advantage on the second side after the first point after deuce', () => {
      const game = getDeuceGame();

      expect(game.deuce).toBe(true);

      expect(game.advantage).toBeNull();

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.advantage).toBe(GameSide.Second);
    });

    it('records advantage on the first side after the first point after deuce', () => {
      const game = getDeuceGame();

      expect(game.deuce).toBe(true);

      expect(game.advantage).toBeNull();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.advantage).toBe(GameSide.First);
    });

    it('records the advantage being flipped', () => {
      const game = getDeuceGame();

      expect(game.advantage).toBeNull();

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.advantage).toBe(GameSide.First);

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.advantage).toBeNull();

      recordRegularGamePoint({ game, wonBy: GameSide.Second });
      expect(game.advantage).toBe(GameSide.Second);

      recordRegularGamePoint({ game, wonBy: GameSide.First });
      expect(game.advantage).toBeNull();
    });
  });
});
