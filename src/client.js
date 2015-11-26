import React from 'react';
import FastClick from 'fastclick';
import App from './components/app.react';

React.initializeTouchEvents(true);
FastClick(document.body);
global.loadjs([global.viewName], function(component) {
  React.render(
    <App view={ component } props={ global.props } viewName={ global.viewName } />,
    document.getElementById('react-html-container')
  );
});
