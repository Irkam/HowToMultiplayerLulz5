var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendfile('index.html');
});

app.get('/pixi.js', function(req, res){
    res.sendfile('pixi.js');
});
app.get('/Networking.js', function(req, res){
    res.sendfile('Networking.js');
});
app.get('/BackgroundScroller.js', function(req, res){
    res.sendfile('BackgroundScroller.js');
});
app.get('/Scroller.js', function(req, res){
    res.sendfile('Scroller.js');
});
app.get('/Player.js', function(req, res){
    res.sendfile('Player.js');
});
app.get('/Main.js', function(req, res){
    res.sendfile('Main.js');
});
app.get('/res/stars-far.jpg', function(req, res){
    res.sendfile('res/stars-far.jpg');
});

io.on('connection', function(socket){
    console.log('client ' + socket.id + ' connected');


    socket.on('ready', function(playerData){
        console.log('player ready');
        playerData.id = socket.id;

        socket.player = playerData.player;
        
        //io.sockets.clients().forEach(function(element, index, array){
        //    socket.emit('addPlayer', element.id);
        //});

        
        socket.broadcast.emit('addPlayer', playerData);
    });

    socket.on('moving', function(moveData){
        moveData.id = socket.id;
        //console.log('player moving');
        socket.broadcast.emit('moving', moveData);
    });

    socket.on('updateCoords', function(coordsData){
        coordsData.id = socket.id;
        socket.broadcast.emit('updateCoords', coordsData);
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});
