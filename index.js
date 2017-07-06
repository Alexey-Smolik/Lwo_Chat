var app = require('express')();
var http = require('http').Server(app);
const config = require('./config.json');
var jwt = require('jsonwebtoken');

const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
const models = require('./models');
const path = require("path");

var io = require('socket.io')(http);
var socketioJwt = require('socketio-jwt');

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static("public"));

io.set('authorization', socketioJwt.authorize({
    secret: config.secret_key,
    handshake: true
}));


io.on('connection', function(socket){
    var decoded = jwt.verify(socket.handshake.query.token, config.secret_key);
    io.emit('connect message', decoded.firstName + " " + decoded.lastName + " connected");
    socket.on('disconnect', function(){
        io.emit('connect message', decoded.firstName + " " + decoded.lastName + " disconnected");
    });
    socket.on('chat message', function(msg){
        io.emit('chat message', decoded.firstName + " " + decoded.lastName + ": " + msg);
    });
});

app.get('/', function(req, res){
    res.redirect('/login.html');
});

models.sequelize
    .sync()
    .then(() => {
        http.listen(3000, () => console.log("Server started!"));
    })
    .catch((err) => console.log(err));


module.exports = app;