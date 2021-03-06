import React from 'react';
import ReactDOM from 'react-dom';
import AirConsole from 'air-console';
import Screen from './components/Screen';

const airconsole = new AirConsole();

let winner;
const actions = {};

airconsole.onConnect = deviceId => {
  actions[deviceId] = '';
};

// Listen for messages from other devices
airconsole.onMessage = (deviceId, data) => {
  // We receive a message -> Send message back to the device
  airconsole.message(deviceId, 'Recorded action!');

  if (actions[deviceId] === '') {
    actions[deviceId] = data;
  }

  // Show message on device screen
  const info = document.createElement('DIV');
  const allActionsEntered = Object.values(actions).every(value => value !== '');

  info.innerHTML = JSON.stringify(actions, undefined, 2);
  document.body.appendChild(info);
};

ReactDOM.render(
  <Screen airconsole={airconsole} />,
  document.getElementById('root'),
);
