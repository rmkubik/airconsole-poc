import React from 'react';
import ReactDOM from 'react-dom';
import AirConsole from 'air-console';
import Controller from './components/Controller';

const airconsole = new AirConsole();

// Listen for messages
airconsole.onMessage = (from, data) => {
  // Show message on device screen
  const info = document.createElement('DIV');
  info.innerHTML = data;
  document.body.appendChild(info);
};

ReactDOM.render(
  <Controller airconsole={airconsole} />,
  document.getElementById('root'),
);
