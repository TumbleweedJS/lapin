function Ball(param) {
	this._vs = new TW.Math.Vector2D(0,0);
	this._radius = param.radius ? param.radius : 20;
	this.layer = new TW.Graphic.Circle({x:0, y:0, radius:this._radius, color:"yellow"});
}

Ball.prototype.update = function() {
	this._updatePhysics();
};

Ball.prototype._updatePhysics = function() {
	this.layer.setPosition(this.layer.x + this._vs.x, this.layer.y + this._vs.y);
	this._vs.y++;
	if (this._vs.y > 10) {
		this._vs.y = 10;
	}
	if (this.layer.y > 500 - this._radius) {
		this.layer.y = 500 - this._radius;
		this._vs.y = - this._vs.y;
	}
};