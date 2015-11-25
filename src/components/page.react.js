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
      pages: [{ viewName: currentViewName, page }]
    };

    landingViewDidRender$({ view, props: properties, viewName: currentViewName });
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
    const currentViewIdx = R.findIndex(R.propEq('viewName', currentViewName), pages);

    return pages.map(function({ viewName, page }, idx) {
      return (
        <PageShift
          viewName={ viewName }
          pos={ idx - currentViewIdx }
          animate={ pages.length > 1 }>
          { page }
        </PageShift>
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

class PageShift extends React.Component {

  static pos2class(pos) {
    if (pos == 0) return 'current';
    else if (pos == -1) return 'before';
    else if (pos == 1) return 'after';
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const oldPos = PageShift.pos2class(this.props.pos);
    const currPos = PageShift.pos2class(nextProps.pos);

    if (oldPos != currPos) {
      const transitionClassName = `${oldPos}-to-${currPos}`;
      this.setState({ transitionClassName });
    }
  }

  render() {
    const { children, viewName, className, pos, animate } = this.props;
    const { transitionClassName } = this.state;
    const classNames = cx(
      className,
      'page-view',
      { 'current': pos == 0 },
      { 'disable-animate': !animate },
      transitionClassName || 'after-to-current'
    );

    return (
      <div data-page-view-name={ viewName } className={ classNames }>
        { children }
      </div>
    );
  }
}

export default Page;
