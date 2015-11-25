import React from 'react';
import RR from 'reactive-react';

const linkRedirect$ = RR.Observable.bind('linkRedirect$');

class Link extends React.Component {

  handleLinkRedirect(evt) {
    evt.preventDefault();
    const { path, redirect, replace, forword } = this.props;
    return linkRedirect$({
      path,
      redirect,
      replace,
      state: { forword: forword == undefined ? true : forword }
    });
  }

  render() {
    var { className, path, children } = this.props;
    return (
      <a onClick={ this.handleLinkRedirect.bind(this) } path={ path } className={ className } href={ path }>
        { children }
      </a>
    );
  }

}


export default Link;
