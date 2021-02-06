import Game, {
  REGULAR_GAME_SCORES,
  GameRecord,
  REGULAR_GAME_DEUCE_POINT,
  REGULAR_GAME_WIN_POINT_DIFF,
  REGULAR_GAME_ADVANTAGE_POINT_DIFF
} from 'models/Game';
import { GameSide, findOpponentSide } from 'models/Game';

const isWon = (winRecord: GameRecord, lossRecord: GameRecord) =>
  winRecord.pointTally > REGULAR_GAME_DEUCE_POINT &&
  winRecord.pointTally - lossRecord.pointTally >= REGULAR_GAME_WIN_POINT_DIFF;

const isDeuce = (winRecord: GameRecord, lossRecord: GameRecord) =>
  winRecord.pointTally == REGULAR_GAME_DEUCE_POINT &&
  lossRecord.pointTally == REGULAR_GAME_DEUCE_POINT;

const wonAdvantage = (winRecord: GameRecord, lossRecord: GameRecord) =>
  winRecord.pointTally >= REGULAR_GAME_DEUCE_POINT &&
  lossRecord.pointTally >= REGULAR_GAME_DEUCE_POINT &&
  winRecord.pointTally - lossRecord.pointTally ==
    REGULAR_GAME_ADVANTAGE_POINT_DIFF;

// Functional interface
type Props = {
  game: Game;
  wonBy: GameSide;
};

export const recordRegularGamePoint = ({ game, wonBy }: Props): Game => {
  if (game.winner) return game;

  const winRecord = game.records[wonBy];
  winRecord.pointTally += 1;

  if (REGULAR_GAME_SCORES[winRecord.pointTally]) {
    winRecord.score = REGULAR_GAME_SCORES[winRecord.pointTally];
  }

  const lostBy = findOpponentSide(wonBy);
  const lossRecord = game.records[lostBy];

  game.deuce = isDeuce(winRecord, lossRecord);

  if (wonAdvantage(winRecord, lossRecord)) {
    game.advantage = wonBy;
  } else {
    game.advantage = null;
  }

  if (isWon(winRecord, lossRecord)) {
    game.winner = wonBy;
  }

  return game;
};
