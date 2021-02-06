import { GameSide } from 'models/Game';
import MatchSet, {
  GAMES_TO_WIN_TIEBREAK,
  MIN_GAMES_TO_WIN_SET,
  GAME_DIFF_TO_WIN_SET
} from 'models/MatchSet';

export const isSetWonByTieBreak = ({
  matchSet,
  gameWonBy
}: {
  matchSet: MatchSet;
  gameWonBy: GameSide;
}) => matchSet.scores[gameWonBy] === GAMES_TO_WIN_TIEBREAK;

type isSetWonByReguardGamesProps = {
  matchSet: MatchSet;
  gameWonBy: GameSide;
  gameLostBy: GameSide;
};

export const isSetWonByRegularGames = ({
  matchSet,
  gameWonBy,
  gameLostBy
}: isSetWonByReguardGamesProps) =>
  matchSet.scores[gameWonBy] >= MIN_GAMES_TO_WIN_SET &&
  matchSet.scores[gameWonBy] - matchSet.scores[gameLostBy] >=
    GAME_DIFF_TO_WIN_SET;

export const isTieBreak = (matchSet: MatchSet) =>
  matchSet.scores[GameSide.First] === MIN_GAMES_TO_WIN_SET &&
  matchSet.scores[GameSide.Second] === MIN_GAMES_TO_WIN_SET;
