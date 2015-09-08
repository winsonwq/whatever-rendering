import React from 'react';
import RR from 'reactive-react';

import RouterStore from '../stores/router.store';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = { defaultReactHtml: props.defaultReactHtml };
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange);
  }

  routeChange(route) {
    console.log(route);
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.defaultReactHtml }}></div>
    );
  }

}

export default Page;
