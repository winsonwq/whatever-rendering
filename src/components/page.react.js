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

  constructor(properties) {
    super(properties);

    const view = properties.defaultView;
    const props = properties.defaultProps;
    const currentViewName = properties.defaultViewName;
    const page = React.createFactory(view)(props);

    this.state = {
      view,
      props,
      loadedViews: [currentViewName],
      currentViewName,
      pages: [{ viewName: currentViewName, page }]
    };

    landingViewDidRender$({ view, props, viewName: currentViewName });
  }

  componentDidMount() {
    RouterStore.route$.subscribe(this.routeChange.bind(this));
  }

  routeChange(route) {
    const { viewName } = route;
    const { currentViewName, loadedViews, props, pages } = this.state;

    if (viewName && currentViewName != viewName) {
      this.loadView(viewName).then(function(view) {

        const viewProps = R.merge(props, R.pick(['params', 'query'], route || {}));
        const page = React.createFactory(view)(viewProps);
        const newPages = R.any(R.propEq('viewName', viewName), pages) ?
          pages :
          pages.concat([R.zipObj(['viewName', 'page'], [viewName, page])]);

        this.setState({
          view,
          currentViewName: viewName,
          route,
          pages: newPages
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
    const { pages, currentViewName } = this.state;
    return pages.map(function({ viewName, page }) {
      let classNames = cx('page-view', { 'current': viewName == currentViewName });
      return (
        <div data-page-view-name={ viewName } className={ classNames }>
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
