function Player(param) {
	this._player = param.player ? param.player : 1;
	this._radius = param._radius ? param._radius : 75;

	this.layer = new TW.Graphic.Layer({width:this._radius * 2, height:this._radius});

	// Slim creation
	if (this._player === 1) {
		this._body = new TW.Graphic.Circle({x:this._radius, y:this._radius, radius:this._radius, color:"red"});
		this._eye = new TW.Graphic.Circle({x:this._radius + this._radius / 2, y:this._radius / 2, radius:this._radius / 8, color:"white"});
		this._pupil = new TW.Graphic.Circle({x:this._radius + this._radius / 2, y:this._radius / 2, radius:this._radius / 12, color:"black"});
	} else {
		this._body = new TW.Graphic.Circle({x:this._radius, y:this._radius, radius:this._radius, color:"blue"});
		this._eye = new TW.Graphic.Circle({x:this._radius / 2, y:this._radius / 2, radius:this._radius / 8, color:"white"});
		this._pupil = new TW.Graphic.Circle({x:this._radius / 2, y:this._radius / 2, radius:this._radius / 12, color:"black"});
	}
	// ZIndex Configuration
	this._body.setZIndex(0);
	this._eye.setZIndex(1);
	this._pupil.setZIndex(2);

	// Fill the circles
	this._body.setMode("FILLED");
	this._eye.setMode("FILLED");
	this._pupil.setMode("FILLED");

	// Adding circles to layer
	this.layer.addChild(this._body);
	this.layer.addChild(this._eye);
	this.layer.addChild(this._pupil);

	// Fix Center Point
	this.layer.setCenterPoint(this._radius, this._radius);
	this.layer.zIndex = this._player;

	// Speed vector
	this._vs = new TW.Math.Vector2D(0,0);

	// Binding for player 1 input
	if (this._player === 1) {
		var keyboardEvents = new TW.Event.KeyboardInput();
		keyboardEvents.addListener("KEY_LEFT", this.moveLeft.bind(this));
		keyboardEvents.addListener("KEY_RIGHT", this.moveRight.bind(this));
	}
}

Player.prototype.update = function() {
	this.layer.translate(this._vs.x, this._vs.y);
	this.layer.rotate(1);
};

Player.prototype.moveLeft = function (event, value, provider) {
	this._vs.x = 0;
	if (value == true && provider.getState("KEY_RIGHT") === TW.Event.KeyboardInput.KEY_RELEASED) {
		this._vs.x = -5;
	}
};

Player.prototype.moveRight = function (event, value, provider) {
	this._vs.x = 0;
	if (value == true && provider.getState("KEY_LEFT") === TW.Event.KeyboardInput.KEY_RELEASED) {
		this._vs.x = 5;
	}
};
