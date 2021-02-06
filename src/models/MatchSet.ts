import Game, { GameSide } from 'models/Game';

export const GAMES_TO_WIN_TIEBREAK = 7;
export const MIN_GAMES_TO_WIN_SET = 6;
export const GAME_DIFF_TO_WIN_SET = 2;

class MatchSet {
  private games: Game[];
  score: Record<GameSide, number>;
  winner: GameSide | null;
  currentGameIndex: number;

  constructor() {
    this.score = {
      [GameSide.First]: 0,
      [GameSide.Second]: 0
    };

    this.games = [new Game()];

    this.currentGameIndex = 0;

    this.winner = null;
  }

  get currentGame(): Game {
    return this.games[this.currentGameIndex];
  }

  startNextGame() {
    if (this.winner) return;
    if (!this.currentGame.winner) return;

    this.games = [...this.games, new Game()];
    this.currentGameIndex = this.games.length - 1;
  }

  isTieBreak(): boolean {
    return (
      this.score[GameSide.First] === MIN_GAMES_TO_WIN_SET &&
      this.score[GameSide.Second] === MIN_GAMES_TO_WIN_SET
    );
  }
}

export default MatchSet;
