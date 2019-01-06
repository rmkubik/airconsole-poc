import React from 'react';
import ReactDOM from 'react-dom';
import AirConsole from 'air-console';
import Controller from './components/Controller';

const airconsole = new AirConsole();

ReactDOM.render(
  <Controller airconsole={airconsole} />,
  document.getElementById('root'),
);
