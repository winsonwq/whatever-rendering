import express from 'express';
import RR from 'reactive-react';
import routesConfig from './routes-config';

const router = express.Router();
const rxMethods = { get: 'rxGet' };

export default router;

export var routes = routesConfig
  .reduce(function(sofar, rconfig) {
    var { method, path, name } = rconfig;
    sofar[name] = RR.replicate(router[rxMethods[method]](path), name);
    return sofar;
  }, {});
