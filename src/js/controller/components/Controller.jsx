import React, { Component } from 'react';
import AirConsole from 'air-console';

class Controller extends Component {
  state = {};

  render() {
    const { airconsole } = this.props;

    const onClick = event => {
      airconsole.message(AirConsole.SCREEN, event.target.id);
    };
    return (
      <div>
        <h1>Controller</h1>
        <button id="btn-rock" type="button" onClick={onClick}>
          Rock
        </button>
        <button id="btn-paper" type="button" onClick={onClick}>
          Paper
        </button>
        <button id="btn-scissors" type="button" onClick={onClick}>
          Scissors
        </button>
      </div>
    );
  }
}

export default Controller;
