// A Shape with collisionBox and a speed vector
function ShapeMe() {
	// Create a random speed vector
	this._vector = new TW.Math.Vector2D(1 - Math.random() * 2 ,1 - Math.random() * 2);
	// half chance to have a rectangle shape
	if (Math.random() > 0.5) {
		this.shape = new TW.Graphic.Rect({x:25 + Math.random() * 375, y:25 + Math.random() * 275, width:20, height:20, xCenterPoint : 0, yCenterPoint : 0, zIndex : 0, color:"black"});
		this.collision = new TW.Collision.CollisionBox(this.shape.x, this.shape.y,20,20);
		this.myType = "Rect";
	} else {
		this.shape = new TW.Graphic.Circle({x:25 + Math.random() * 375, y:25 + Math.random() * 275, radius:10, xCenterPoint : 0, yCenterPoint : 0, zIndex : 0, color:"black"});
		this.collision = new TW.Collision.CollisionCircle(this.shape.x, this.shape.y, 10);
		this.myType = "Circle";
	}
	// Shape aspect
	this.shape.color = "black";
	this.shape.setMode("FILLED");
	this.shape.setZIndex(0);
	// Some parameters to order shapes with a callback and a tween function
	this.shape.reorder = false;
	this.shape.reorderXdest = 0;
	this.shape.reorderYdest = 0;
	this.shape.reorderXsrc = 0;
	this.shape.reorderYsrc = 0;
	this.shape.reorderT = 0;
}

// This function update shape position.
// It's designed for handle screen edge bounce
ShapeMe.prototype.update = function() {
	// Update shape position
	if (this.shape.reorder === false) {
		// This case is where shapes are just moving
		this.shape.setPosition(this.shape.x + this._vector.x, this.shape.y + this._vector.y);
	} else {
		if (this.shape.reorderT <= 30) {
			// This case is where shapes are moving to order themselves
			this.shape.setPosition(Math.linearTween(this.shape.reorderT, this.shape.reorderXsrc, this.shape.reorderXdest, 30), Math.linearTween(this.shape.reorderT, this.shape.reorderYsrc, this.shape.reorderYdest, 30));
		}
	}
	// Bounce on left
	if (this.shape.x < 0) {
		this._vector.x *= -1;
		this.shape.setPosition(10, this.shape.y);
	}
	// Bounce on right
	if (this.shape.x > 390) {
		this._vector.x *= -1;
		this.shape.setPosition(390, this.shape.y);
	}
	// Bounce on top
	if (this.shape.y < 10) {
		this._vector.y *= -1;
		this.shape.setPosition(this.shape.x, 10);

	}
	// Bounce on bottom
	if (this.shape.y > 290) {
		this._vector.y *= -1;
		this.shape.setPosition(this.shape.x, 290);
	}
	// Update collisionShape position
	this.collision.setX(this.shape.x);
	this.collision.setY(this.shape.y);
};

// A class to manage ShapeMe object
function ShapeManager(myGameloop, myLayer) {
	// Shapes number
	this._len = 50;
	var i = this._len;
	this._list = new Array();
	while (i > 0) {
		// Create a shape
		var tmpShape = new ShapeMe();
		// Add the shape to the gameloop for update it
		myGameloop.object.push(tmpShape);
		// Add the shape to the layer for draw it
		myLayer.addChild(tmpShape.shape);
		// Add the shape to an internal ShapeManager array
		this._list[i] = tmpShape;
		i--;
	}
	myGameloop.object.push(this);

	var keyboardEvents = new TW.Event.KeyboardInput();
	keyboardEvents.addListener("KEY_SPACE", this.reorderAll.bind(this));
}

ShapeManager.prototype.update = function() {
	// We take each shape one by one
	for (var i = 1; i <= this._len; i++) {
		this._list[i].shape.setFillColor("black");
		// For each shape, we check collision we all other shapes
		for (var j = 1; j <= this._len; j++) {
			// Check if we took two different shapes
			if (i !== j) {
				// In case of the other shape is a circle
				if (this._list[j].myType === "Circle") {
					if (this._list[i].collision.isCollidingCircle(this._list[j].collision) === true) {
						this._list[i].shape.setFillColor("red");
					}
				}
				// In case of the other shape is a rectangle
				if (this._list[j].myType === "Rect") {
					if (this._list[i].collision.isCollidingBox(this._list[j].collision) === true) {
						this._list[i].shape.setFillColor("red");
					}
				}
			}
		}
		this._list[i].shape.reorderT++;
	}
};

// Callback for Space Key to reorder all shapes
ShapeManager.prototype.reorderAll = function(event, value, provider) {
	// If shapes were moving we change a flag and fix the source and destination point
	if (value == true && this._list[1].shape.reorder == false) {
		for (var i = 1; i <= this._len; i++) {
			this._list[i].shape.reorderXdest = - this._list[i].shape.x + (10 + 40 * ((i - 1) % 10));
			this._list[i].shape.reorderYdest = - this._list[i].shape.y + (10 + 50 * Math.floor(((i - 1) / 10)));
			this._list[i].shape.reorderXsrc = this._list[i].shape.x;
			this._list[i].shape.reorderYsrc = this._list[i].shape.y;
			this._list[i].shape.reorderT = 0;
		}
	}
	// Tell all shapes to reorder
	for (var j = this._len; j > 0; j--) {
		this._list[j].shape.reorder = value;
	}
};

function main() {
	// Canvas creation
	var myCanvas = document.getElementById("canvas");
	// Context creation
	var myCanvasContext = myCanvas.getContext("2d");
	// Window creation
	var myWindow = new TW.Graphic.Window(myCanvas);
	// Gameloop creation
	var myGameloop = new TW.Gameloop.Gameloop();
	// Layer creation for add the shapes
	var myLayer = new TW.Graphic.Layer({width:400, height:300, zIndex:0});

	// ShapeManager is designed to create the shapes and check collision between them
	var myShapeManager = new ShapeManager(myGameloop, myLayer);
	// Add the layer to the window
	myWindow.addChild(myLayer);
	// Add the window the gameloop
	myGameloop.object.push(myWindow);
	// Start the gameloop
	myGameloop.start();
}

window.onload = function() {
	main();
}