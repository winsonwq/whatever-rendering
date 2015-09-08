import React from 'react';

class Page extends React.Component {

  constructor(props) {
    super(props);
    this.state = { defaultReactHtml: props.defaultReactHtml };
  }

  render() {
    return (
      <div dangerouslySetInnerHTML={{ __html: this.state.defaultReactHtml }}></div>
    );
  }

}

export default Page;
