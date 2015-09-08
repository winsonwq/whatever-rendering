import React from 'react';

export default {
  view(clazz, props) {

    const factory = React.createFactory(clazz);
    const reactHtml = React.renderToString(factory(props));
    const viewName = dashify(clazz.displayName);

    return {
      props,
      viewName,
      reactHtml
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
