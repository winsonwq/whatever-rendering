import React from 'react';

import Router from './router.react';
import Page from './page.react';

class App extends React.Component {

  constructor(appProps) {
    super(appProps);
    var { viewName, reactHtml, props } = appProps;

    this.state = {
      viewName,
      reactHtml,
      props
    };
  }

  render() {
    var { viewName, reactHtml } = this.state;

    return (
      <div className="app">
        <h1>App Loaded</h1>
        <Router defaultViewName={ viewName } />
        <Page defaultReactHtml={ reactHtml } />
      </div>
    );
  }

}

export default App;
