function BackgroundScroller(){
    var texture = new PIXI.Texture.fromImage("res/stars-far.jpg");
    PIXI.TilingSprite.call(this, texture, 600, 800);
    
    this.position.x = 0;
    this.position.y = 0;
    this.tilePosition.x = 0;
    this.tilePosition.y = 0;
    
    this.viewportY = 0;
}

BackgroundScroller.constructor = BackgroundScroller;
BackgroundScroller.protoype = Object.create(PIXI.TilingSprite.prototype);

BackgroundScroller.DELTA_Y = 0.256;

BackgroundScroller.prototype.setViewportY = function(newViewportY){
    var distanceTravelled = newViewportY - this.viewportY;
    this.viewportX = newViewportY;
    this.tilePosition.x -= (distanceTravelled * BackgroundScroller.DELTA_Y);
};
