"use strict";
const routes = require('express').Router();
const users = require('../../models').Users;
var jwt = require('jsonwebtoken');
const config = require('../../config.json');

routes.post('/', (req, res) => {
    if(!req.body.firstName || !req.body.lastName){
        res.status(400).send({ status: "error", message: "Wrong params" });
    }
    users.build({firstName: req.body.firstName, lastName: req.body.lastName}).save()
        .then(result => {
            res.status(200).send({ message: "success" });
        })
        .catch(err => {
            res.status(500).send({ status: "error", message: "Server error" });
        });
});

routes.get("/", (req, res) => {
    users.findAndCountAll({ attributes: { exclude: 'password' } })
        .then(result => {
            res.status(200).send(result.rows);
        })
        .catch(err => {
            res.status(500).send({ status: "error", message: "Server error" });
        });
});


module.exports = routes;