import MatchSet, {
  GAMES_TO_WIN_TIEBREAK,
  MIN_GAMES_TO_WIN_SET,
  GAME_DIFF_TO_WIN_SET
} from 'models/MatchSet';
import { GameSide, findOpponentSide } from 'models/Game';

import { recordRegularGamePoint } from 'services/recordReguarlGamePoint.service';
import { recordTieBreakPoint } from 'services/recordTieBreakPoint.service';

type Props = {
  matchSet: MatchSet;
  wonBy: GameSide;
};

// Functional interface
export const recordMatchSetPoint = ({ matchSet, wonBy }: Props): MatchSet => {
  if (matchSet.winner) return matchSet;

  const game = matchSet.currentGame;

  if (matchSet.isTieBreak()) {
    recordTieBreakPoint({ game, wonBy });
  } else {
    recordRegularGamePoint({ game, wonBy });
  }

  if (!game.winner) return matchSet;

  matchSet.score[game.winner] += 1;

  const lossSide = findOpponentSide(game.winner);

  if (
    matchSet.score[game.winner] === GAMES_TO_WIN_TIEBREAK ||
    (matchSet.score[game.winner] >= MIN_GAMES_TO_WIN_SET &&
      matchSet.score[game.winner] - matchSet.score[lossSide] >=
      GAME_DIFF_TO_WIN_SET)
  ) {
    matchSet.winner = game.winner;
  } else {
    matchSet.startNextGame();
  }

  return matchSet;
};

// OO interface
class RecordMatchSetPoint {
  private matchSet: MatchSet;

  constructor({ matchSet }: { matchSet: MatchSet }) {
    this.matchSet = matchSet;
  }

  call(wonBy: GameSide) {
    recordMatchSetPoint({ matchSet: this.matchSet, wonBy });
  }
}

export default RecordMatchSetPoint;
