function Game(){
	this.canvas = null;
	this.context = null;
	this.bufferCanvas = null;
	this.bufferCanvasCtx = null;
	this.x = 10;
	this.y = 10;
	this.dirX = 1;
	this.dirY = 1;
	this.bubbleArray = [];
	this.bubbleTimer = null;
	this.maxBubbles = 200;
}

GAME = new Game();


window.onload = function(){
    GAME.gameStart();
};

GAME.gameStart = function()
{
	//Canvas page
	GAME.canvas  = document.getElementById("canvasBubbles");
    GAME.context = GAME.canvas.getContext("2d");

    //Buffer Canvas
    GAME.bufferCanvas = document.createElement("canvas");
    GAME.bufferCanvasCtx = GAME.bufferCanvas.getContext("2d");
    GAME.bufferCanvasCtx.canvas.width = GAME.context.canvas.width;
    GAME.bufferCanvasCtx.canvas.height = GAME.context.canvas.height;

	//Add bubbles to array
    GAME.bubbleTimer = setInterval(GAME.addBubble, 200);

    GAME.draw();

    window.setInterval(GAME.animate, 30);
}

GAME.animate = function()
{
	//listen for clicks and check if button was clicked
	GAME.canvas.addEventListener('click', GAME.bubblePop, false);
	
	GAME.update();
	GAME.draw();

}

GAME.nuke = function()
{
	GAME.bubbleArray = [];
}

GAME.bubblePop = function(ev)
{
	var clickX = ev.clientX - GAME.canvas.offsetLeft;
	var clickY = ev.clientY - GAME.canvas.offsetTop;
	// console.log('mouse was clicked here ' + clickX + ', ' + clickY);
	
	//loop through array to see if I clicked a bubble
	for (var i = 0; i < GAME.bubbleArray.length; i++) {
        if(clickX >= GAME.bubbleArray[i].x && clickX <= GAME.bubbleArray[i].x + GAME.bubbleArray[i].width && clickY >= GAME.bubbleArray[i].y && clickY <= GAME.bubbleArray[i].y + GAME.bubbleArray[i].height){
        	// alert('you clicked a bubble');
        	GAME.bubbleArray.splice(i, 1);
        }else{
        	//sorry you did not click a bubble
        }
    }
}

GAME.update = function()
{

	for (var i = 0; i < GAME.bubbleArray.length; i++) {
        if (GAME.bubbleArray[i].y < GAME.context.canvas.height){
            
            GAME.bubbleArray[i].y += GAME.bubbleArray[i].speed;

            if (GAME.bubbleArray[i].y > GAME.context.canvas.height)
                GAME.bubbleArray[i].y = -5;
            
            GAME.bubbleArray[i].x += GAME.bubbleArray[i].drift;
            
            if (GAME.bubbleArray[i].x > GAME.context.canvas.width)
                GAME.bubbleArray[i].x = 0;
        }
    }
}

GAME.draw = function()
{
	GAME.context.save();

	GAME.blank();

	//Get image and draw to screen
	var img = document.getElementById("bubble");

	for (var i = 0; i < GAME.bubbleArray.length; i++) {
        GAME.bufferCanvasCtx.drawImage(img, GAME.bubbleArray[i].x, GAME.bubbleArray[i].y, GAME.bubbleArray[i].width, GAME.bubbleArray[i].height);
    }

	GAME.context.drawImage(GAME.bufferCanvas, 0, 0, GAME.bufferCanvas.width, GAME.bufferCanvas.height);
	GAME.context.restore();

	return true;
}

GAME.addBubble = function()
{
	GAME.bubbleArray[GAME.bubbleArray.length] = new BUBBLE();
	if(GAME.bubbleArray.length == GAME.maxBubbles){
		clearInterval(GAME.bubbleTimer);
	}
}

GAME.blank = function()
{
	GAME.bufferCanvasCtx.fillStyle = "rgba(0,0,0,0.8)";
    GAME.bufferCanvasCtx.fillRect(0, 0, GAME.bufferCanvasCtx.canvas.width, GAME.bufferCanvasCtx.canvas.height);
}


function BUBBLE()
{
	this.x = Math.round(Math.random() * GAME.context.canvas.width);
	this.y = -10;
	this.drift = Math.random();
	this.speed = Math.round(Math.random() * 5) + 1;
	this.width = (Math.random() * 100) + 2;
    this.height = this.width;
}