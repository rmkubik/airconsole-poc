import React, { Component } from 'react';
import { Machine, actions } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import AirConsole from 'air-console';
import MessageLog from '../../shared/components/MessageLog';

class Controller extends Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);

    const controllerMachine = Machine(
      {
        initial: 'loading',
        context: {
          messages: [],
        },
        states: {
          loading: {
            on: {
              ready: 'readied',
            },
          },
          readied: {
            onEntry: ['readied'],
            on: {
              message: {
                target: 'processing',
                actions: 'recordMessage',
              },
            },
          },
        },
      },
      {
        actions: {
          readied: (ctx, evt) => {
            props.airconsole.message(AirConsole.SCREEN, 'readied');
          },
        },
      },
    );

    this.controllerService = interpret(controllerMachine)
      .onTransition(state => {
        console.log('service state', state);
        this.setState(state.context);
      })
      .start();

    // eslint-disable-next-line no-param-reassign
    props.airconsole.onMessage = (id, data) => {
      // controllerService.send()
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
      airconsole.message(AirConsole.SCREEN, event.target.id);
    };

    return (
      <div>
        <h1>Controller</h1>
        <button
          type="button"
          onClick={() => this.controllerService.send('ready')}
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
