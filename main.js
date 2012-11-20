function initPlayers(myWindow, myGameloop) {
	var myPlayer1 = new Player({player:1});
	var myPlayer2 = new Player({player:2});

	myWindow.addChild(myPlayer1.layer);
	myWindow.addChild(myPlayer2.layer);

	myGameloop.object.push(myPlayer1);
	myGameloop.object.push(myPlayer2);

	myPlayer1.layer.setPosition(0, 0);
	myPlayer2.layer.setPosition(650, 100);
}

function initBackground(myWindow, context) {
	var myBackground = new Background(context);

	myWindow.addChild(myBackground.layer);
}

function main()
{
	var myCanvas = document.getElementById("canvas");
	var myCanvasContext = myCanvas.getContext("2d");
	var myWindow = new TW.Graphic.Window(myCanvas);
	var myGameloop = new TW.Gameloop.Gameloop();

	initBackground(myWindow, myCanvasContext);
	initPlayers(myWindow, myGameloop);


	myGameloop.object.push(myWindow);
	myGameloop.start();
}

window.onload = function()
{
	main();
};