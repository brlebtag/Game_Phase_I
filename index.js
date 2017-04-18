const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  io.emit('chat message', "Welcome!");

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function () {
  console.log('http://localhost:3000/')
});