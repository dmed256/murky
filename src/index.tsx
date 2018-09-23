import React from 'react';
import ReactDOM from 'react-dom';
import { extend } from './Markdown/prism';

import App from './App';
import './index.css';

// Init OKL and Bibtex languages
extend('okl', 'cpp', {
  annotation: {
    pattern: /@[a-zA-Z][a-zA-Z0-9_]*/,
    greedy: true,
  },
});
extend('bibtex', 'latex');

ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
