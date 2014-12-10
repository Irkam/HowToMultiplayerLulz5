var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

io.on('connection', function(socket){
    //TODO
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
