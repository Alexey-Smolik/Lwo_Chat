const routes = require('express').Router({mergeParams: true});
const users = require('./users/users');
const session = require('./session/session')

routes.use('/users', users);
routes.use('/session', session);
module.exports = routes;