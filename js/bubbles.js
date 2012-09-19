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
    window.setInterval(this.drawImage, 25);
}

GAME.drawImage = function()
{
	console.log('This is x: ' + GAME.x);
	console.log('This is y: ' + GAME.y);

	GAME.canvas  = document.getElementById("canvasBubbles");
    GAME.context = GAME.canvas.getContext("2d");

    //Clear canvas befor redrawing image
    GAME.context.clearRect(GAME.x, GAME.y, GAME.width, GAME.height);

	//Get image and draw to screen
	var img = document.getElementById("bubble");
	GAME.context.drawImage(img, GAME.x, GAME.y);

	//Set up the y for the next time we draw image
	GAME.y += GAME.dirY;

	if(GAME.y > 300){
		GAME.y = 10;
	}

	return true;

}