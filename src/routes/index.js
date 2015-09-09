import express from 'express';
import RR from 'reactive-react';

var router = express.Router();

const root$ = RR.replicate(router.rxGet('/'), 'root$');
const readme$ = RR.replicate(router.rxGet('/readme'), 'readme$');

export default router;

export { root$, readme$ };
