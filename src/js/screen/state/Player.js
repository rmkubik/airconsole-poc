class Player {
  constructor(id) {
    this.id = id;
    this.readied = false;
  }

  ready() {
    this.readied = true;
  }

  isReady() {
    return this.readied;
  }
}

export default Player;
