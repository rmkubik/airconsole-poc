import Player from './Player';

class PlayerList {
  constructor(app) {
    this.list = {};
    this.app = app;
    this.winner = undefined;
  }

  setState() {
    this.app.setState({
      players: this.list,
      winner: this.winner,
    });
  }

  register(id) {
    this.list[id] = new Player(id);
    this.setState();
  }

  ready(id) {
    this.list[id].ready();
    this.setState();
  }

  takeAction(id, action) {
    this.list[id].takeAction(action);
    this.setState();
  }

  allPlayersReady() {
    return Object.values(this.list).every(player => player.isReady());
  }

  enoughPlayers() {
    return Object.keys(this.list).length >= 2;
  }

  allPlayersTookAction() {
    return Object.values(this.list).every(player => player.tookAction());
  }

  calcWinners() {
    const isAWinner = (a, b) => {
      // Use JavaScript pattern matching technique
      switch (true) {
        case Boolean(a.action === 'rock' && b.action === 'scissors'):
          return true;

        case Boolean(a.action === 'paper' && b.action === 'rock'):
          return true;

        case Boolean(a.action === 'scissors' && b.action === 'paper'):
          return true;

        default:
          return false;
      }
    };

    if (this.allPlayersTookAction()) {
      const players = Object.values(this.list);

      if (isAWinner(players[0], players[1])) {
        this.winner = players[0];
      }

      if (isAWinner(players[1], players[0])) {
        this.winner = players[1];
      }
    }

    this.setState();
  }
}

export default PlayerList;
