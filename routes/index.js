const routes = require('express').Router({mergeParams: true});
const users = require('./users/users');

routes.use('/users', users);
module.exports = routes;