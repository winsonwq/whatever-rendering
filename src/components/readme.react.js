import React from 'react';
import Link from './link.react';

class Readme extends React.Component {
  render() {
    return (
      <article>
        <Link path="/">go back to todos</Link>
        <h1>Readme</h1>
      </article>
    );
  }
}

Readme.displayName = 'Readme';

export default Readme;
