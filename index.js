var express = require('express');
var app = express();
var server = require('http').Server(app);
var socket = require('socket.io')(server);
var clients = [];
var users = {};

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

// views is directory for all template files
app.set('views', __dirname + '/app');
app.set('view engine', 'ejs');

app.get('/', function (request, response) {
  response.render('index');
});

server.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});

socket.on('connection', function (client) {
  console.log('socket connected server : ', (client.id));
  clients.push(client);

  client.on('sendMessage', function (msg) {
    console.log('socket server received sendMessage : ' + JSON.stringify(msg));
    client.emit('getMessage', msg);
    socket.sockets.connected[users[msg.toUser]].emit('getMessage', msg);
 
  });

  client.on('setUser', function (user) {
    console.log('socket server received User : ' + JSON.stringify(user));
    users[user]=client.id;
  });


});


