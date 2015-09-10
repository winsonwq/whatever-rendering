import React from 'react';
import App from './components/app.react';

React.initializeTouchEvents(true);
global.loadjs([global.viewName], function(component) {
  React.render(
    <App view={ component } props={ global.props } viewName={ global.viewName } />,
    document.getElementById('react-html-container')
  );
});
