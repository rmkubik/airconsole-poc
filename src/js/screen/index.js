import AirConsole from '../../../vendor/js/airconsole-1.7.0';

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
