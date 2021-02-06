import Match from 'entities/Match';

function winOneRegularGame(match: Match, player: string) {
  match.pointWonBy(player);
  match.pointWonBy(player);
  match.pointWonBy(player);
  match.pointWonBy(player);
}

function winFiveRegularGames(match: Match, player: string) {
  winOneRegularGame(match, player);
  winOneRegularGame(match, player);
  winOneRegularGame(match, player);
  winOneRegularGame(match, player);
  winOneRegularGame(match, player);
}

describe('Match', () => {
  test('the sample', () => {
    const match = new Match('player 1', 'player 2');

    match.pointWonBy('player 1');
    match.pointWonBy('player 2');
    // this will return "0-0, 15-15"
    expect(match.score()).toEqual('0-0, 15-15');

    match.pointWonBy('player 1');
    match.pointWonBy('player 1');
    // this will return "0-0, 40-15"
    expect(match.score()).toEqual('0-0, 40-15');

    match.pointWonBy('player 2');
    match.pointWonBy('player 2');
    // this will return "0-0, Deuce"
    expect(match.score()).toEqual('0-0, Deuce');

    match.pointWonBy('player 1');
    // this will return "0-0, Advantage player 1"
    expect(match.score()).toEqual('0-0, Advantage player 1');

    match.pointWonBy('player 1');
    // this will return "1-0"
    expect(match.score()).toEqual('1-0');
  });

  test('the set is won by 6-0', () => {
    const match = new Match('player 1', 'player 2');

    winOneRegularGame(match, 'player 1');
    winFiveRegularGames(match, 'player 1');

    expect(match.score()).toEqual('6-0');
  });

  test('the set is won by 7-5', () => {
    const match = new Match('player 1', 'player 2');

    winFiveRegularGames(match, 'player 2');
    winFiveRegularGames(match, 'player 1');

    winOneRegularGame(match, 'player 1');
    winOneRegularGame(match, 'player 1');

    expect(match.score()).toEqual('7-5');
  });

  test('the tiebreak score when the set is won by 6-7 tiebreak', () => {
    const match = new Match('player 1', 'player 2');

    winFiveRegularGames(match, 'player 2');
    winFiveRegularGames(match, 'player 1');
    winOneRegularGame(match, 'player 1');
    winOneRegularGame(match, 'player 2');

    expect(match.score()).toEqual('6-6');

    match.pointWonBy('player 2');
    expect(match.score()).toEqual('6-6, 0-1');

    match.pointWonBy('player 2');
    match.pointWonBy('player 1');
    expect(match.score()).toEqual('6-6, 1-2');

    match.pointWonBy('player 2');
    match.pointWonBy('player 2');
    match.pointWonBy('player 2');
    match.pointWonBy('player 2');
    expect(match.score()).toEqual('6-6, 1-6');

    match.pointWonBy('player 2');
    expect(match.score()).toEqual('6-7');
  });
});
