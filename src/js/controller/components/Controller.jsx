import React, { Component } from 'react';
import AirConsole from 'air-console';
import MessageLog from '../../shared/components/MessageLog';

class Controller extends Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);

    // eslint-disable-next-line no-param-reassign
    props.airconsole.onMessage = (id, data) => {
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          {
            id,
            data,
          },
        ],
      }));
    };
  }

  render() {
    const { airconsole } = this.props;
    const { messages } = this.state;

    const onClick = event => {
      airconsole.message(AirConsole.SCREEN, {
        type: 'action',
        action: event.target.id,
      });
    };

    return (
      <div>
        <h1>Controller</h1>
        <button
          type="button"
          onClick={() =>
            airconsole.message(AirConsole.SCREEN, {
              type: 'readied',
            })
          }
        >
          Ready
        </button>
        <button id="btn-rock" type="button" onClick={onClick}>
          Rock
        </button>
        <button id="btn-paper" type="button" onClick={onClick}>
          Paper
        </button>
        <button id="btn-scissors" type="button" onClick={onClick}>
          Scissors
        </button>
        <MessageLog messages={messages} />
      </div>
    );
  }
}

export default Controller;
