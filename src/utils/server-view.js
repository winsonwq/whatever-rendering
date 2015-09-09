import React from 'react';
import App from '../components/app.react';

export default {
  view(clazz, props = {}) {

    const viewName = dashify(clazz.displayName);

    const appFactory = React.createFactory(App);
    const reactHtml = React.renderToString(
      appFactory({ view: clazz, props })
    );

    return {
      reactHtml,
      viewName,
      props,
      propsStr: JSON.stringify(props).replace(/\\/g, '\\\\')
    };

  }

};

function dashify(str) {
  return str.split('')
    .map(function(ch, idx) {
      if (ch >= 'A' && ch <= 'Z') return (idx == 0 ? '' : '-') + ch.toLowerCase();
      return ch;
    })
    .join('');
}
