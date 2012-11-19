function fill_layer(layerToFill)
{
	var rabbitImage = new Image();
	rabbitImage.src = "./images/animation_course/lapin_course_1.png";
	var rabbitSprite = new TW.Graphic.Sprite({x:400, y:300, width:64, height:64, xCenterPoint:32, yCenterPoint:32});
	rabbitSprite.setImage(rabbitImage);
	layerToFill.addChild(rabbitSprite);
}



function main()
{
	var myCanvas = document.getElementById("canvas2d");
	var myCanvasContext = myCanvas.getContext("2d");
	var myWindow = new TW.Graphic.Window(myCanvas);
	var myLayer = new TW.Graphic.Layer({width:800, height:600});
	var myGameloop = new TW.Gameloop.Gameloop();

	fill_layer(myLayer);

	myWindow.addChild(myLayer);
	myGameloop.object.push(myWindow);
	myGameloop.start();
}

window.onload = function()
{
	main();
};