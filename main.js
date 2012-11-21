function initPlayers(myWindow, myGameloop) {
	var myPlayer1 = new Player({player:1}, myWindow.getCanvas().width, myWindow.getCanvas().height);
	var myPlayer2 = new Player({player:2});

	myWindow.addChild(myPlayer1.layer);
	myWindow.addChild(myPlayer2.layer);

	myGameloop.object.push(myPlayer1);
	myGameloop.object.push(myPlayer2);

	myPlayer1.layer.setPosition(150, 100);
	myPlayer2.layer.setPosition(650, 100);
}

function initBackground(myWindow, myGameloop, context) {
	var myBackground = new Background(context);
	myWindow.addChild(myBackground.layer);
	myGameloop.object.push(myBackground);
}

function main()
{
	var myCanvas = document.getElementById("canvas");
	var myCanvasContext = myCanvas.getContext("2d");
	var myWindow = new TW.Graphic.Window(myCanvas);
	var myGameloop = new TW.Gameloop.Gameloop();


	initPlayers(myWindow, myGameloop);
	initBackground(myWindow, myGameloop, myCanvasContext);
	myGameloop.setf
	myGameloop.start();
	myGameloop.object.push(myWindow);

}

window.onload = function() {
	main();
};