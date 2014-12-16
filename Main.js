function Main(){
    this.move_left = 0;
    this.move_right = 0;
    this.move_up = 0;
    this.move_down = 0;
    this.players = new Array();

    this.stage = new PIXI.Stage(0x303030);
    renderer = PIXI.autoDetectRenderer(600, 800);
    document.body.appendChild(renderer.view);

    farTexture = new PIXI.Texture.fromImage("res/stars-far.jpg");
    far = new PIXI.TilingSprite(farTexture, 600, 800);
    far.position.x = 0;
    far.position.y = 0;
    far.tilePosition.x = 0;
    far.tilePosition.y = 0;
    this.stage.addChild(far);

    //scroller = new Scroller();
    //stage.addChild(scroller);
    
    player = new Player(Math.floor(Math.random()*16777215), 300, 700);
    this.stage.addChild(player.triangle);

    socket.emit('ready', {
        player:{
            color: player.color,
            x: player.x,
            y: player.y
        }
    });

    requestAnimFrame(this.update.bind(this));
}

Main.prototype.update = function(){
    far.tilePosition.y += 0.256;

    player.move();
    this.players.forEach(function(pl){
        pl.move();
    });

    renderer.render(this.stage);

    requestAnimFrame(this.update.bind(this));
} 

socket.on('addPlayer', function(playerData){
    console.log('new challenger appeared');
    console.log(playerData);
    var newPlayer = new Player(playerData.player.color, playerData.player.x, playerData.player.y);
    main.players[playerData.id] = newPlayer;
    main.stage.addChild(main.players[playerData.id].triangle);
});

socket.on('moving', function(moveData){
    main.players[moveData.id].move_left = moveData.player.move_left;
    main.players[moveData.id].move_right = moveData.player.move_right;
    main.players[moveData.id].move_up = moveData.player.move_up;
    main.players[moveData.id].move_down = moveData.player.move_down;
});

socket.on('updateCoords', function(coordsData){
    main.players[coordsData.id].triangle.position.x = coordsData.player.x;
    main.players[coordsData.id].triangle.position.y = coordsData.player.y;
});
