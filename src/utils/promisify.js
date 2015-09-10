
var Promise = require('es6-promise').Promise;

exports.callbackPromisify = function(func) {
  return function() {
    var args = [].slice.call(arguments);
    return new Promise(function(resolve, reject) {
      args.push(function() {
        var returns = [].slice.call(arguments);
        var err = returns[0], rest = returns.slice(1);
        if (err) {
          reject(err);
        } else {
          resolve(rest);
        }
      });

      func.apply(null, args);
    });
  };
};

exports.noErrCallbackPromisify = function(func) {
  return function() {
    var args = [].slice.call(arguments);
    return new Promise(function(resolve) {
      args.push(function() {
        resolve([].slice.call(arguments));
      });

      func.apply(null, args);
    });
  };
};
