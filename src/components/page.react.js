import React from 'react';
import R from 'ramda';
import RR from 'reactive-react';
import cx from 'classnames';

import { noErrCallbackPromisify } from '../utils/promisify';
import RouterStore from '../stores/router.store';

//
// Async view is the view load in future
const asyncViewDidRender$ = RR.Observable.bind('asyncViewDidRender$');

//
// Landing view is the landing page view, which is with props
const landingViewDidRender$ = RR.Observable.bind('landingViewDidRender$');

class Page extends React.Component {

  constructor(props) {
    super(props);

    const view = props.defaultView;
    const properties = props.defaultProps;
    const currentViewName = props.defaultViewName;
    const page = React.createFactory(view)(props);

    this.state = {
      view,
      props: properties,
      loadedViews: [currentViewName],
      currentViewName,
      newPages: R.zipObj([currentViewName], [page])
    };

    landingViewDidRender$({ view, props: properties, viewName: currentViewName });
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange.bind(this));
  }

  routeChange(route) {
    const { viewName } = route;
    const { currentViewName, loadedViews, props, newPages } = this.state;

    if (viewName && currentViewName != viewName) {
      this.loadView(viewName).then(function(view) {

        const viewProps = R.merge(props, R.pick(['params', 'query'], route || {}));
        const { forword } = route.state;
        const targetView = newPages[viewName] ?
          newPages[viewName] :
          React.createFactory(view)(viewProps);

        this.setState({
          view,
          currentViewName: viewName,
          route,
          newPages: R.merge(newPages, R.zipObj([viewName], [targetView])),

          animate: {
            forword,
            from: currentViewName,
            to: viewName
          }

        });

        /*
          TODO: find one time render solution
          trigger the second render cycle to reuse action logic when the compoent first load
        */
        if (loadedViews.indexOf(viewName) == -1) {
          asyncViewDidRender$({ view, route });
          this.setState({ loadedViews: loadedViews.concat([viewName]), route });
        }

      }.bind(this));
    }
  }

  loadView(viewName) {
    return noErrCallbackPromisify(global.loadjs)([viewName]).then(ret => ret[0]);
  }

  renderPagesDOM() {
    const { newPages, animate } = this.state;
    const { from, to, forword } = animate || {};

    const renderingPages = R.toPairs(newPages);

    return renderingPages.map(function([viewName, page]) {
      var classNames = 'page-view';

      if (viewName == from) {
        classNames = cx(classNames, `current-to-${ forword ? 'before' : 'after' }`);
      } else if (viewName == to){
        classNames = cx(classNames, `${ forword ? 'after' : 'before' }-to-current`);
      }

      return (
        <div data-view-name={ viewName } className={ classNames }>
          { page }
        </div>
      );

    });
  }

  render() {
    return (
      <div className="page-views">
        { this.renderPagesDOM() }
      </div>
    );
  }

}

export default Page;
