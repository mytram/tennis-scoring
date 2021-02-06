import { findOpponentSide, GameSide } from 'models/Game';

describe('findOpponentSide', () => {
  it('returns the opposite side', () => {
    expect(findOpponentSide(GameSide.First)).toBe(GameSide.Second);
    expect(findOpponentSide(GameSide.Second)).toBe(GameSide.First);
  });
});
