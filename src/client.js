import React from 'react';
import App from './components/app.react';

import Browser from './utils/browser';

React.initializeTouchEvents(true);
React.render(
  <App props={ global.props } viewName={ global.viewName } path={ Browser.path() } />,
  document.getElementById('react-html-container')
);
