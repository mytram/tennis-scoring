import Game, { GameSide } from 'models/Game';
import { recordTieBreakPoint } from 'services/recordTieBreakPoint.service';

describe('recordTieBreakPoint', () => {
  it('records a point for the win side', () => {
    const game = new Game();

    recordTieBreakPoint({ game, wonBy: GameSide.First });

    expect(game.records[GameSide.First].score).toBe(1);
    expect(game.records[GameSide.Second].score).toBe(0);

    expect(game.winner).toBeNull();
  });

  it('does not update the record if a winner is decided', () => {
    const game: Game = new Game();
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });

    expect(game.records[GameSide.First].score).toBe(7);

    recordTieBreakPoint({ game, wonBy: GameSide.Second });
    expect(game.records[GameSide.Second].score).toBe(0);
  });

  it('sets the winner once it wins 7 points with 2 points difference', () => {
    const game: Game = new Game();

    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });
    recordTieBreakPoint({ game, wonBy: GameSide.First });

    recordTieBreakPoint({ game, wonBy: GameSide.Second });

    recordTieBreakPoint({ game, wonBy: GameSide.First });

    expect(game.records[GameSide.First].score).toBe(7);
    expect(game.records[GameSide.Second].score).toBe(1);

    expect(game.winner).toBe(GameSide.First);
  });
});
