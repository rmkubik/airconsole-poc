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
              readied: 'processingReady',
            },
          },
          processingReady: {
            id: 'processingReady',
            invoke: {
              src: 'processReady',
              onDone: {
                target: 'waiting',
                actions: 'readyPlayer',
              },
              onError: {
                target: 'loading',
                actions: 'readyPlayer',
              },
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
            players: (ctx, evt) => ({
              ...ctx.players,
              [evt.deviceId]: {
                action: undefined,
                ready: false,
              },
            }),
          }),
          recordMessage: assign({
            messages: (ctx, evt) => [...ctx.messages, evt.message],
          }),
          readyPlayer: assign({
            players: (ctx, evt) => ({
              ...ctx.players,
              [evt.data.deviceId]: {
                ...ctx.players[evt.data.deviceId],
                ready: true,
              },
            }),
          }),
        },
        services: {
          processMessage: (ctx, evt) => Promise.resolve({}),
          processReady: (ctx, evt) => {
            const newPlayersCtx = {
              ...ctx.players,
              [evt.deviceId]: {
                ...ctx.players[evt.deviceId],
                ready: true,
              },
            };

            // not all players ready
            if (Object.values(newPlayersCtx).some(player => !player.ready)) {
              return Promise.reject({ deviceId: evt.deviceId });
            }

            // not enough players connected
            if (Object.values(newPlayersCtx).length < 2) {
              return Promise.reject({ deviceId: evt.deviceId });
            }

            return Promise.resolve({ deviceId: evt.deviceId });
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
      switch (data) {
        case 'readied':
          screenService.send({ type: 'readied', deviceId: id });
          break;
        default:
          break;
      }
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
