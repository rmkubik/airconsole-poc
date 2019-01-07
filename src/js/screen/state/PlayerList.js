import Player from './Player';

class PlayerList {
  constructor(app) {
    this.list = {};
    this.app = app;
  }

  setState() {
    this.app.setState({
      players: this.list,
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
}

export default PlayerList;
