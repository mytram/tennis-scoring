import Game, {
  GameRecord,
  TIE_BREAK_MIN_WIN_POINT,
  TIE_BREAK_WIN_POINT_DIFF
} from 'models/Game';
import { GameSide, findOpponentSide } from 'models/Game';

type Props = {
  game: Game;
  wonBy: GameSide;
};

const isWon = (winRecord: GameRecord, lossRecord: GameRecord) =>
  winRecord.score >= TIE_BREAK_MIN_WIN_POINT &&
  winRecord.score - lossRecord.score >= TIE_BREAK_WIN_POINT_DIFF;

// Functional interface
export const recordTieBreakPoint = ({ game, wonBy }: Props): Game => {
  if (game.winner) return game;

  const winRecord = game.records[wonBy];

  winRecord.pointTally += 1;
  winRecord.score += 1;

  const lostBy = findOpponentSide(wonBy);
  const lossRecord = game.records[lostBy];

  if (isWon(winRecord, lossRecord)) {
    game.winner = wonBy;
  }

  return game;
};
