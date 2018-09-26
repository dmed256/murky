import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import init from './init';
import './index.css';

init();

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
