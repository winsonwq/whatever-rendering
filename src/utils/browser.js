import qs from 'qs';

export default {

  path() {
    return this.pathname() + location.search;
  },

  pathname() {
    return location.pathname;
  },

  query() {
    var queryString = location.href.split('?')[1];
    return qs.parse(queryString);
  }

};
