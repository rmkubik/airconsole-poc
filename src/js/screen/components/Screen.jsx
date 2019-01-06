import React, { Component } from 'react';
import { Machine, actions } from 'xstate';
import { interpret } from 'xstate/lib/interpreter';
import MessageLog from '../../shared/components/MessageLog';

const { assign } = actions;
class Screen extends Component {
  state = {
    messages: [],
    players: {},
  };

  constructor(props) {
    super(props);

    const toggleMachine = Machine(
      {
        initial: 'loading',
        context: {
          players: {},
          messages: [],
        },
        states: {
          loading: {
            on: {
              registerPlayer: {
                target: 'loading',
                actions: 'registerPlayer',
              },
              start: 'waiting',
            },
          },
          waiting: {
            on: {
              message: {
                target: 'processing',
                actions: 'recordMessage',
              },
            },
          },
          processing: {
            invoke: {
              src: 'processMessage',
            },
            onDone: {
              target: 'waiting',
            },
          },
        },
      },
      {
        actions: {
          registerPlayer: assign({
            players: (ctx, event) => ({
              ...ctx.players,
              [event.deviceId]: {
                action: undefined,
              },
            }),
          }),
          recordMessage: assign({
            messages: (ctx, event) => [...ctx.messages, event.message],
          }),
        },
        services: {
          processMessage: (ctx, evt) => {
            return Promise.resolve({});
          },
        },
      },
    );

    const screenService = interpret(toggleMachine)
      .onTransition(state => {
        console.log('service state', state);
        this.setState(state.context);
      })
      .start();

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

    // eslint-disable-next-line no-param-reassign
    props.airconsole.onConnect = deviceId => {
      screenService.send({
        type: 'registerPlayer',
        deviceId,
      });
    };
  }

  render() {
    const { messages, players } = this.state;

    return (
      <div>
        <h1>Screen</h1>
        <pre>{JSON.stringify(players, undefined, 2)}</pre>
        <MessageLog messages={messages} />
      </div>
    );
  }
}

export default Screen;
