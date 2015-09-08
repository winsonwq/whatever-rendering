import React from 'react';

import Router from './router.react';
import Page from './page.react';

class App extends React.Component {

  constructor(appProps) {
    super(appProps);
  }

  render() {
    var { children, path } = this.props;

    return (
      <div>
        <Router defaultPath={ path }/>
        <Page>
          { children }
        </Page>
      </div>
    );
  }

}

export default App;
