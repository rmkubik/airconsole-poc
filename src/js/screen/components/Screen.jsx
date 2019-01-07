import React, { Component } from 'react';
import CircularJSON from 'circular-json-es6';
import MessageLog from '../../shared/components/MessageLog';
import PlayerList from '../state/PlayerList';
import Game from '../state/Game';

class Screen extends Component {
  state = {
    messages: [],
    players: {},
    game: {},
  };

  constructor(props) {
    super(props);

    this.game = new Game(this);
    this.players = new PlayerList(this);

    // eslint-disable-next-line no-param-reassign
    props.airconsole.onMessage = (id, message) => {
      this.logMessage(id, message);

      switch (message.type) {
        case 'readied':
          this.players.ready(id);

          if (this.players.allPlayersReady() && this.players.enoughPlayers()) {
            this.game.start();
          }
          break;

        case 'action':
          this.players.takeAction(id, message.action);
          break;

        default:
          break;
      }
    };

    // eslint-disable-next-line no-param-reassign
    props.airconsole.onConnect = deviceId => {
      this.players.register(deviceId);
    };

    console.log(props.airconsole);
  }

  logMessage(id, data) {
    this.setState(prevState => ({
      messages: [
        ...prevState.messages,
        {
          id,
          data,
        },
      ],
    }));
  }

  render() {
    const { messages, ...state } = this.state;

    return (
      <div>
        <h1>Screen</h1>
        <pre>{CircularJSON.stringify(state, undefined, 2)}</pre>
        <MessageLog messages={messages} />
      </div>
    );
  }
}

export default Screen;
