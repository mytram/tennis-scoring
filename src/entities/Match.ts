import { GameSide } from 'models/Game';
import MatchSet from 'models/MatchSet';
import RecordMatchSetPoint from 'services/recordMatchSetPoint.service';

class Match {
  private playerToGameSideMap: Record<string, GameSide>;
  private gameSideToPlayerMap: Record<GameSide, string>;
  private recordMatchSetPoint: RecordMatchSetPoint;

  private matchSet: MatchSet;

  constructor(firstPlayer: string, secondPlayer: string) {
    this.playerToGameSideMap = {
      [firstPlayer]: GameSide.First,
      [secondPlayer]: GameSide.Second
    };

    this.gameSideToPlayerMap = {
      [GameSide.First]: firstPlayer,
      [GameSide.Second]: secondPlayer
    };

    this.matchSet = new MatchSet();
    // TODO: can be injected
    this.recordMatchSetPoint = new RecordMatchSetPoint({
      matchSet: this.matchSet
    });
  }

  pointWonBy(player: string) {
    const wonBy = this.playerToGameSideMap[player];
    if (!wonBy) throw `Player #{player} is not found`;

    this.recordMatchSetPoint.call(wonBy);
  }

  score() {
    const scores = [
      `${this.matchSet.score[GameSide.First]}-${this.matchSet.score[GameSide.Second]
      }`,
      this.gameScore()
    ].filter(s => s !== '');

    return scores.join(', ');
  }

  // TODO: move out to a functional service
  private gameScore(): string {
    const game = this.matchSet.currentGame;
    if (game.winner) return '';

    if (game.advantage) {
      const player = this.gameSideToPlayerMap[game.advantage];

      return `Advantage ${player}`;
    }

    if (game.deuce) {
      return 'Deuce';
    }

    const gameScore = `${game.records[GameSide.First].score}-${game.records[GameSide.Second].score
      }`;

    // A little quirk in the sample test.
    if (gameScore == '0-0') return '';

    return gameScore;
  }
}

export default Match;
