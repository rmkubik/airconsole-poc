import React, { Component } from 'react';

class Controller extends Component {
  state = {};

  render() {
    return (
      <div>
        <h1>Controller</h1>
        <button id="btn-rock" type="button">
          Rock
        </button>
        <button id="btn-paper" type="button">
          Paper
        </button>
        <button id="btn-scissors" type="button">
          Scissors
        </button>
      </div>
    );
  }
}

export default Controller;
