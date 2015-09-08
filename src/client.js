import React from 'react';
import App from './components/app.react';

import Browser from './utils/browser';

React.initializeTouchEvents(true);
global.loadjs([global.viewName], function(component) {
  React.render(
    <App path={ Browser.path() } >
      { React.createFactory(component)(global.props) }
    </App>,
    document.getElementById('react-html-container')
  );
});
