function main()
{
	var myCanvas = document.getElementById("canvas");
	var myCanvasContext = myCanvas.getContext("2d");
	var myWindow = new TW.Graphic.Window(myCanvas);
	var myPlayer1 = new Player({player:1});
	var myPlayer2 = new Player({player:2});

	var myGameloop = new TW.Gameloop.Gameloop();

	myWindow.addChild(myPlayer1.layer);
	myPlayer1.layer.translate(0, 0);

	myWindow.addChild(myPlayer2.layer);
	myPlayer2.layer.translate(500, 200);

	myGameloop.object.push(myWindow);
	myGameloop.object.push(myPlayer1);
	myGameloop.object.push(myPlayer2);
	myGameloop.start();
}

window.onload = function()
{
	main();
};