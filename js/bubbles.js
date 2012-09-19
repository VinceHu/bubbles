function Game(){
	this.canvas;
	this.context;
	this.x = 10;
	this.y = 10;
	this.dirX = 1;
	this.dirY = 1;
	this.width = 800;
	this.height = 800;
}

GAME = new Game();


window.onload = function(){
    GAME.gameStart();
};

GAME.gameStart = function()
{
	console.log('starting animation');

	GAME.canvas  = document.getElementById("canvasBubbles");
    GAME.context = GAME.canvas.getContext("2d");

    GAME.draw();

    window.setInterval(GAME.animate, 25);
}

GAME.animate = function()
{
	GAME.update();
	GAME.draw();

}

GAME.update = function()
{
	console.log('This is x: ' + GAME.x);
	console.log('This is y: ' + GAME.y);

	//Clear canvas befor redrawing image
    GAME.context.clearRect(GAME.x, GAME.y, GAME.width, GAME.height);

	//Set up the y for the next time we draw image
	GAME.y += GAME.dirY;

	if(GAME.y > 300){
		GAME.y = 10;
	}
}

GAME.draw = function()
{
	//Get image and draw to screen
	var img = document.getElementById("bubble");
	GAME.context.drawImage(img, GAME.x, GAME.y);

	return true;
}