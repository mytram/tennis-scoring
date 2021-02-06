import { GameSide } from 'models/Game';
import MatchSet from 'models/MatchSet';
import { recordMatchSetPoint } from 'services/recordMatchSetPoint.service';

function winOneGame(matchSet: MatchSet, wonBy: GameSide) {
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
}

function winTieBreak(matchSet: MatchSet, wonBy: GameSide) {
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
  recordMatchSetPoint({ matchSet, wonBy });
}

function winFiveGames(matchSet: MatchSet, wonBy: GameSide) {
  winOneGame(matchSet, wonBy);
  winOneGame(matchSet, wonBy);
  winOneGame(matchSet, wonBy);
  winOneGame(matchSet, wonBy);
  winOneGame(matchSet, wonBy);
}

describe('recordMatchSetPoint', () => {
  it('wins the set with 6 regular games with 2 more games', () => {
    const matchSet = new MatchSet();

    winFiveGames(matchSet, GameSide.First);
    winOneGame(matchSet, GameSide.First);

    expect(matchSet.score[GameSide.First]).toBe(6);
    expect(matchSet.score[GameSide.Second]).toBe(0);

    expect(matchSet.winner).toBe(GameSide.First);
  });

  it('wins the set by 7 to 5', () => {
    const matchSet = new MatchSet();

    winFiveGames(matchSet, GameSide.First);
    winFiveGames(matchSet, GameSide.Second);

    winOneGame(matchSet, GameSide.First);

    expect(matchSet.score[GameSide.First]).toBe(6);
    expect(matchSet.score[GameSide.Second]).toBe(5);

    winOneGame(matchSet, GameSide.First);

    expect(matchSet.score[GameSide.First]).toBe(7);
    expect(matchSet.score[GameSide.Second]).toBe(5);

    expect(matchSet.winner).toBe(GameSide.First);
  });

  it('wins the set by winning the tiebreak', () => {
    const matchSet = new MatchSet();

    winFiveGames(matchSet, GameSide.First);
    winFiveGames(matchSet, GameSide.Second);

    winOneGame(matchSet, GameSide.First);

    expect(matchSet.score[GameSide.First]).toBe(6);
    expect(matchSet.score[GameSide.Second]).toBe(5);

    winOneGame(matchSet, GameSide.Second);

    expect(matchSet.score[GameSide.First]).toBe(6);
    expect(matchSet.score[GameSide.Second]).toBe(6);

    expect(matchSet.isTieBreak()).toBe(true);

    // 7 points to win a tiebreak
    winTieBreak(matchSet, GameSide.Second);

    expect(matchSet.score[GameSide.First]).toBe(6);
    expect(matchSet.score[GameSide.Second]).toBe(7);

    expect(matchSet.winner).toBe(GameSide.Second);
  });
});
