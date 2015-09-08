import React from 'react';
import App from './components/app.react';

React.initializeTouchEvents(true);
React.render(<App props={ global.props } viewName={ global.viewName } />, document.getElementById('react-html-container'));
