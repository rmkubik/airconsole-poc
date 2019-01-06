import React from 'react';
import ReactDOM from 'react-dom';
import AirConsole from '../../../vendor/js/airconsole-1.7.0';
import Controller from './components/Controller';

const airconsole = new AirConsole();

document.querySelectorAll('button').forEach(button => {
  button.addEventListener('click', () => {
    airconsole.message(AirConsole.SCREEN, button.id);
  });
});

// Listen for messages
airconsole.onMessage = (from, data) => {
  // Show message on device screen
  const info = document.createElement('DIV');
  info.innerHTML = data;
  document.body.appendChild(info);
};

ReactDOM.render(<Controller />, document.getElementById('root'));
