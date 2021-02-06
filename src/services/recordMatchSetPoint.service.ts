import Game, { GameSide, findOpponentSide } from 'models/Game';
import MatchSet from 'models/MatchSet';

import {
  isSetWonByRegularGames,
  isSetWonByTieBreak,
  isTieBreak
} from 'services/matchSets/predicates';
import { recordRegularGamePoint } from 'services/recordReguarlGamePoint.service';
import { recordTieBreakPoint } from 'services/recordTieBreakPoint.service';

// Functional interface
type Props = {
  matchSet: MatchSet;
  wonBy: GameSide;
};

export const recordMatchSetPoint = ({ matchSet, wonBy }: Props): MatchSet => {
  if (matchSet.winner) return matchSet;

  const game = matchSet.currentGame;

  if (game.tieBreak) {
    recordTieBreakPoint({ game, wonBy });
  } else {
    recordRegularGamePoint({ game, wonBy });
  }

  if (!game.winner) return matchSet;

  matchSet.scores[game.winner] += 1;

  const lossSide = findOpponentSide(game.winner);

  if (
    isSetWonByRegularGames({
      matchSet,
      gameWonBy: game.winner,
      gameLostBy: lossSide
    }) ||
    isSetWonByTieBreak({ gameWonBy: game.winner, matchSet })
  ) {
    matchSet.winner = game.winner;
  } else {
    // TODO: In more real app, we will want to store the previous games.
    matchSet.currentGame = new Game({ tieBreak: isTieBreak(matchSet) });
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
