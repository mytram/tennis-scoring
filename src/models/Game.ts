export enum GameSide {
  First = 'first',
  Second = 'second'
}

export const REGULAR_GAME_SCORES: ReadonlyArray<number> = [0, 15, 30, 40];
export const REGULAR_GAME_DEUCE_POINT = 3;
export const REGULAR_GAME_WIN_POINT_DIFF = 2;
export const REGULAR_GAME_ADVANTAGE_POINT_DIFF = 1;

export const TIE_BREAK_MIN_WIN_POINT = 7;
export const TIE_BREAK_WIN_POINT_DIFF = 2;

export const findOpponentSide = (gameSide: GameSide) =>
  gameSide === GameSide.First ? GameSide.Second : GameSide.First;

export interface GameRecord {
  pointTally: number;
  score: number;
}

const newGameRecord = (): GameRecord => ({
  pointTally: 0,
  score: 0
});

type GameCtorProps = {
  tieBreak: boolean;
};

class Game {
  records: Record<GameSide, GameRecord>;
  deuce: boolean;
  advantage: GameSide | null;
  winner: GameSide | null;
  // The concepts of tieBreak exists in two places.
  // One is with MatchSet to decide if the next game is a tiebreak,
  // and data integrity checks.
  tieBreak: boolean;

  constructor(props?: GameCtorProps) {
    this.records = {
      [GameSide.First]: newGameRecord(),
      [GameSide.Second]: newGameRecord()
    };
    this.deuce = false;
    this.advantage = null;
    this.winner = null;
    this.tieBreak = props ? props.tieBreak : false;
  }
}

export default Game;
