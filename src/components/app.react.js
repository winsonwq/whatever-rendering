import React from 'react';

import Router from './router.react';
import Page from './page.react';

class App extends React.Component {

  constructor(appProps) {
    super(appProps);
    var { viewName, reactHtml, props, path } = appProps;

    this.state = {
      viewName,
      reactHtml,
      props,
      path
    };
  }

  render() {
    var { reactHtml, path } = this.state;

    return (
      <div className="app">
        <h1>App Loaded</h1>
        <Router defaultPath={ path }/>
        <Page defaultReactHtml={ reactHtml } />
      </div>
    );
  }

}

export default App;
