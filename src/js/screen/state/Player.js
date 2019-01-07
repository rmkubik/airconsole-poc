class Player {
  constructor(id) {
    this.id = id;
    this.readied = false;
    this.action = undefined;
  }

  ready() {
    this.readied = true;
  }

  isReady() {
    return this.readied;
  }

  tookAction() {
    return Boolean(this.action);
  }

  takeAction(action) {
    if (!this.action) {
      this.action = action;
    }
  }
}

export default Player;
