import Game, { GameSide } from 'models/Game';

export const GAMES_TO_WIN_TIEBREAK = 7;
export const MIN_GAMES_TO_WIN_SET = 6;
export const GAME_DIFF_TO_WIN_SET = 2;

class MatchSet {
  scores: Record<GameSide, number>;
  winner: GameSide | null;
  currentGame: Game;

  constructor() {
    this.scores = {
      [GameSide.First]: 0,
      [GameSide.Second]: 0
    };

    this.currentGame = new Game();
    this.winner = null;
  }
}

export default MatchSet;
