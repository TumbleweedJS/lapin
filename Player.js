function Player(param) {
	this._player = param.player ? param.player : 1;

	this.layer = new TW.Graphic.Layer({width:200, height:100});

	if (this._player === 1) {
		this._body = new TW.Graphic.Circle({x:100, y:100, radius:100, color:"red"});
		this._eye = new TW.Graphic.Circle({x:100, y:100, radius:10, color:"white"});
		this._pupil = new TW.Graphic.Circle({x:100, y:100, radius:6, color:"black"});
	} else {
		this._body = new TW.Graphic.Circle({x:100, y:100, radius:100, color:"blue"});
		this._eye = new TW.Graphic.Circle({x:50, y:50, radius:10, color:"white"});
		this._pupil = new TW.Graphic.Circle({x:50, y:50, radius:6, color:"black"});
	}


	this._body.setZIndex(0);
	this._eye.setZIndex(1);
	this._pupil.setZIndex(2);
	this._body.setMode("FILLED");
	this._eye.setMode("FILLED");
	this._pupil.setMode("FILLED");
	this.layer.addChild(this._body);
	this.layer.addChild(this._eye);
	this.layer.addChild(this._pupil);

	this._body.setCenterPoint(0, 0);
	this._eye.setCenterPoint(0, 0);
	this._pupil.setCenterPoint(0, 0);

	this.layer.setCenterPoint(100,50);

	this._vs = new TW.Math.Vector2D(0,0);
}

Player.prototype.update = function() {
	//this.layer.translate(this._vs.x, this._vs.y);
	//this.layer.scale(1.001, 1.001);
	//this.layer.rotate(0.5);
	this._pupil.rotate(0.5);
	this._eye.rotate(0.5);
	this._body.rotate(0.5);
};
