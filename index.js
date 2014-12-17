
var UPDATE_INTERVAL = 1000/60;
var SPAWN_INTERVAL  = 10000;

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var shortId = require('shortid');

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

players = new Array();
actors = new Array();

io.on('connection', function(socket){
    console.log('client ' + socket.id + ' connected');


    socket.on('ready', function(playerData){
        socket.emit('setupId', socket.id);
        console.log('player ready');
        playerData.id = socket.id;
        playerData.player.move_left = 0;
        playerData.player.move_right = 0;
        playerData.player.move_up = 0;
        playerData.player.move_down = 0;
        
        socket.player = playerData.player;
        socket.broadcast.emit('addPlayer', playerData);

        
        players[socket.id] = playerData;
            
        for(player in players){
            if(player != socket.id){
                console.log('sending other players to newcomer');
                socket.emit('addPlayer', players[player])
            }
        }

        //for(actor in actors){
        //    socket.emit('newActor', actors[actor]);
        //}

        
    });

    socket.on('moving', function(moveData){
        try{
            players[socket.id].player.move_left = moveData.player.move_left;
            players[socket.id].player.move_right = moveData.player.move_right;
            players[socket.id].player.move_up = moveData.player.move_up;
            players[socket.id].player.move_down = moveData.player.move_down;
        }catch(err){
            console.log(err.message);
        }
    });
    
    socket.on('disconnect', function(){
        console.log('player ' + socket.id + ' disconnected');
        socket.broadcast.emit('playerDisconnect', socket.id);
        players.splice(socket.id, 1);
    });
});

http.listen(8080, function(){
    console.log('listening on *:8080');
});

setInterval(updateGame, UPDATE_INTERVAL);
setTimeout(spawnBitches, Math.floor(Math.random() * SPAWN_INTERVAL));

function updateGame(){
    for(player in players){
        if((players[player].player.move_left != players[player].player.move_right) 
                    || (players[player].player.move_up != players[player].player.move_down)){
            players[player].player.x += (players[player].player.move_right * 5) - (players[player].player.move_left * 5);
            players[player].player.y += (players[player].player.move_down * 5) - (players[player].player.move_up * 5);
        
            
            if(players[player].player.x < 0 + 25)
                players[player].player.x = 0 + 25;
        
            if(players[player].player.x > 600 - 25)
                players[player].player.x = 600 - 25;
            
            if(players[player].player.y < 0 + 50)
                players[player].player.y = 0 + 50;
            
            if(players[player].player.y > 800 - 50)
                players[player].player.y = 800 - 50;
            
            io.emit('updateCoords', players[player]);
        }
    }

    for(actor in actors){
        actors[actor].move();
        if(actors[actor].y > 800){
            console.log('yo moma left');
            io.emit('killActor', actors[actor].id);
            actors.splice(actor, 1);
        }
    }

}

function spawnBitches(){
    console.log('spawnd yo momma');
    actors.push(new Asteroid(Math.floor(Math.random()*600), Math.floor(Math.random()*5), Math.floor(Math.random()*100)));

    io.emit('newActor', actors[actors.length - 1]);

    setTimeout(spawnBitches, Math.floor(Math.random() * SPAWN_INTERVAL));
}

function Asteroid(x, speed, radius){
    this.id = shortId.generate();
    this.x = x;
    this.y = 0;
    this.speed = speed;
    this.radius = radius;
}

Asteroid.prototype.move = function(){
    this.y += this.speed;
    
    io.emit('moveActor', this);
};
