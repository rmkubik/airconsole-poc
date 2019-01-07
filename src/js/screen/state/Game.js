class Game {
  constructor(app) {
    this.started = false;
    this.app = app;
  }

  setState() {
    this.app.setState({
      game: {
        started: this.started,
      },
    });
  }

  start() {
    this.started = true;
    this.setState();
  }
}

export default Game;
