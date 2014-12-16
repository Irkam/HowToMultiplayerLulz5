function Scroller(stage){
    this.bgs = new BackgroundScroller();
    stage.addChild(this.bgs);

    this.viewportY = 0;
}

Scroller.prototype.setViewportY = function(viewportY){
    this.viewportY = viewportY;
    this.bgs.setViewportY(viewportY);
};

Scroller.prototype.getViewportY = function(){
    return this.viewportY;
};

Scroller.prototype.moveViewportYBy = function(units){
    this.setViewportY(this.viewportY + units);
}
