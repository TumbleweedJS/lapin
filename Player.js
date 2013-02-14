function Player(param, width, height) {
	this._player = param.player ? param.player : 1;
	this._radius = param._radius ? param._radius : 50;
	this._speed = param._speed ? param._speed : 10;

	// Slim creation
	this._bodyWired = new TW.Graphic.Circle({x:this._radius, y:this._radius, radius:this._radius, color:"black"});

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
	this._body.setZIndex(1);
	this._eye.setZIndex(2);
	this._pupil.setZIndex(3);
	this._bodyWired.setZIndex(4);

	// Fill the circles
	this._bodyWired.setMode("WIRED");
	this._body.setMode("FILLED");
	this._eye.setMode("FILLED");
	this._pupil.setMode("FILLED");

	this.layer = new TW.Graphic.Layer({width:this._radius * 2, height:this._radius, zIndex:param.player});
	// Adding circles to layer
	this.layer.addChild(this._bodyWired);
	this.layer.addChild(this._body);
	this.layer.addChild(this._eye);
	this.layer.addChild(this._pupil);

	// Fix Center Point
	this.layer.setCenterPoint(this._radius, this._radius);

	// Speed vector
	this._vs = new TW.Math.Vector2D(0,1);
	this._jumping = true;
	this._xmin = this._radius + ((width / 2) * (this._player - 1));
	this._xmax = (width / 2) + ((width / 2) * (this._player - 1)) - this._radius;

	// Binding for player 1 input
	if (this._player === 1) {
		var keyboardEvents = new TW.Event.KeyboardInput();
		keyboardEvents.addListener("KEY_LEFT", this.moveLeft.bind(this));
		keyboardEvents.addListener("KEY_RIGHT", this.moveRight.bind(this));
		keyboardEvents.addListener("KEY_UP", this.moveUp.bind(this));
	}
}

Player.prototype.update = function() {
	this.layer.setPosition(this._vs.x + this.layer.x, this._vs.y + this.layer.y);
	this._updatePhysics();
};

Player.prototype.moveLeft = function (event, value, provider) {
	this._vs.x = 0;
	if (value === true && provider.getState("KEY_RIGHT") === TW.Event.KeyboardInput.KEY_RELEASED) {
		this._vs.x = -this._speed;
		return;
	}
	if (value === false && provider.getState("KEY_RIGHT") === TW.Event.KeyboardInput.KEY_PRESSED) {
		this._vs.x = this._speed;
		return;
	}
};

Player.prototype.moveRight = function (event, value, provider) {
	this._vs.x = 0;
	if (value === true && provider.getState("KEY_LEFT") === TW.Event.KeyboardInput.KEY_RELEASED) {
		this._vs.x = this._speed;
		return;
	}
	if (value === false && provider.getState("KEY_LEFT") === TW.Event.KeyboardInput.KEY_PRESSED) {
		this._vs.x = -this._speed;
		return;
	}
};

Player.prototype.moveUp = function (event, value, provider) {
	if (this._jumping === false && this._vs.y === 0) {
		this._vs.y = -15;
		this._jumping = true;
	}
};

Player.prototype._updatePhysics = function() {
	if (this._jumping === true && this._vs.y < 50) {
		this._vs.y++;
	}
	if (this.layer.y > 500) {
		this.layer.y = 500;
		this._vs.y = 0;
		this._jumping = false;
	}
	// Forbid slim going left
	if (this.layer.x < this._xmin) {
		this.layer.x = this._xmin;
		this._vs.x = 0;
	}
	// Forbid slim going right
	if (this.layer.x > this._xmax) {
		this.layer.x = this._xmax;
		this._vs.x = 0;
	}
};