function Player(color, x, y){
    this.width = 50;
    this.height = 100;
    this.color = color;

    this.x = x;
    this.y = y;

    this.move_left = 0;
    this.move_right = 0;
    this.move_up = 0;
    this.move_down = 0;

    this.triangle = new PIXI.Graphics();
    
    this.triangle.beginFill(color);

    this.triangle.moveTo(0, -(this.height/2));
    this.triangle.lineTo(-(this.width/2), this.height/2);
    this.triangle.lineTo(this.width/2, this.height/2);
    this.triangle.endFill();

    this.triangle.position.x = this.x;
    this.triangle.position.y = this.y;
}

Player.SPEED = 5;

Player.prototype.move = function(){
    this.x += (this.move_right * Player.SPEED) - (this.move_left * Player.SPEED);
    this.y += (this.move_down * Player.SPEED) - (this.move_up * Player.SPEED);

    if(this.x < 0 + this.width/2)
        this.x = 0 + 25;

    if(this.x > 600 - this.width/2)
        this.x = 600 - 25;
    
    if(this.y < 0 + this.height/2)
        this.y = 0 + 50;
    
    if(this.y > 800 - this.height/2)
        this.y = 800 - 50;
    

    this.triangle.position.x = this.x;
    this.triangle.position.y = this.y;

    if((this.move_left != this.move_right) || (this.move_up != this.move_down))
        socket.emit('updateCoords', {
            player:{
                x: this.x,
                y: this.y
            }
        });
};

Player.prototype.getMoves = function(){
    return {
        move_left: this.move_left, 
        move_right: this.move_right,
        move_up: this.move_up,
        move_down: this.move_down
    }
};
