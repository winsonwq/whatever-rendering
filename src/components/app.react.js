import React from 'react';

import {} from './router/router';
import Page from './page.react';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var { view, props, viewName } = this.props;

    return (
      <Page defaultViewName={ viewName } defaultView={ view } defaultProps={ props }/>
    );
  }

}

export default App;
