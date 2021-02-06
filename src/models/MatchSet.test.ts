import MatchSet from 'models/MatchSet';
import { GameSide } from './Game';

describe('MatchSet', () => {
  it('does not start a new game if the set is finished', () => {
    const matchSet = new MatchSet();
    matchSet.currentGame.winner = GameSide.First;
    matchSet.winner = GameSide.First;
    expect(matchSet.currentGameIndex).toBe(0);
    matchSet.startNextGame();
    expect(matchSet.currentGameIndex).toBe(0);
  });

  it('does not start a new game if the current game is not finished', () => {
    const matchSet = new MatchSet();
    expect(matchSet.currentGameIndex).toBe(0);
    matchSet.startNextGame();
    expect(matchSet.currentGameIndex).toBe(0);
  });
});
