function Background(context) {
	var skyGradient = context.createLinearGradient(0,0,0,700);
	skyGradient.addColorStop(0, "#0281FF");
	skyGradient.addColorStop(1, '#84C1FD');

	var groundGradient = context.createLinearGradient(0,0,0,100);
	groundGradient.addColorStop(0, "#00D460");
	groundGradient.addColorStop(1, '#06A52B');

	var netGradient = context.createLinearGradient(0,0,20,70);
	netGradient.addColorStop(0, "#FFF072");
	netGradient.addColorStop(1, '#DDC32C');

	this._sky = new TW.Graphic.Rect({x:0, y:0, width:800, height:500, xCenterPoint : 0, yCenterPoint : 0, zIndex:0});
	this._ground = new TW.Graphic.Rect({x:0, y:500, width:800, height:100, xCenterPoint : 0, yCenterPoint : 0, zIndex:0});
	this._net = new TW.Graphic.Rect({x:390, y:430, width:20, height:70, xCenterPoint : 0, yCenterPoint : 0, zIndex:1});

	this._sky.color = skyGradient;
	this._ground.color = groundGradient;
	this._net.color = netGradient;

	this._sky.setMode("FILLED");
	this._ground.setMode("FILLED");
	this._net.setMode("FILLED");

	this.layer = new TW.Graphic.Layer({width:800, height:600});
	this.layer.zIndex = 0;
	this.layer.addChild(this._sky);
	this.layer.addChild(this._ground);
	this.layer.addChild(this._net);
}

Background.prototype.update = function() {

};