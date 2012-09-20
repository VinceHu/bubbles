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
	this.maxBubbles = 50;
	this.poppedBubbles = 0;
	this.missedBubbles = 0;
}

GAME = new Game();


window.onload = function(){
	// console.log('Page has loaded so lets start game');
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

	//Draw first round of bubbles to screen
    GAME.draw();
    
    //listen for clicks and check if button was clicked
	GAME.canvas.addEventListener('mousedown', GAME.bubblePop, false);
	GAME.canvas.addEventListener('touchstart', GAME.bubbleTouchPop, false);

	//Now start the animation loop
    window.setInterval(GAME.animate, 30);
}

GAME.animate = function()
{	
	GAME.update();
	GAME.draw();

}

GAME.nuke = function()
{
	// console.log('Nuke all of the bubbles and clear array');
	GAME.bubbleArray = [];
}

GAME.bubbleTouchPop = function(event)
{
	// console.log('Someone has touched the screen trying to pop a bubble');
	var touchX = event.targetTouches[0].pageX - GAME.canvas.offsetLeft;
	var touchY = event.targetTouches[0].pageY - GAME.canvas.offsetTop;
	
	//Now pop a bubble
	GAME.pop(touchX, touchY);
}

GAME.bubblePop = function(event)
{
	// console.log('Someone is trying to pop a bubble with a mouse click');
	
	var clickX = event.clientX - GAME.canvas.offsetLeft;
	var clickY = event.clientY - GAME.canvas.offsetTop;
	
	//Now pop a bubble
	GAME.pop(clickX, clickY);
}

GAME.pop = function(clickX, clickY)
{
	// console.log('Trying to pop a bubble');
	
	var popped = false;
	//loop through array to see if I clicked a bubble
	for (var i = 0; i < GAME.bubbleArray.length; i++) {
        if(clickX >= GAME.bubbleArray[i].x && clickX <= GAME.bubbleArray[i].x + GAME.bubbleArray[i].width && clickY >= GAME.bubbleArray[i].y && clickY <= GAME.bubbleArray[i].y + GAME.bubbleArray[i].height){
        	
        	//splic this bubble out of array, possibly need refactored
        	GAME.bubbleArray.splice(i, 1);
        	GAME.poppedBubbles++;
        	// console.log('Have popped this many bubbles ' + GAME.poppedBubbles);
        	
        	popped = true;
        	break;
        }
    }
    
    if(popped === false){
    	GAME.missedBubbles++;
    	// console.log('You have missed this many bubbles ' + GAME.missedBubbles);
    }
}

GAME.update = function()
{

	// console.log('Running the update function to move all of the bubbles');
	
	for (var i = 0; i < GAME.bubbleArray.length; i++) {
        if (GAME.bubbleArray[i].y < GAME.context.canvas.height){
            
            GAME.bubbleArray[i].y += GAME.bubbleArray[i].speed;

            if (GAME.bubbleArray[i].y > GAME.context.canvas.height){
            	GAME.bubbleArray[i].y = -5;
            }
                
            
            GAME.bubbleArray[i].x += GAME.bubbleArray[i].drift;
            
            if (GAME.bubbleArray[i].x > GAME.context.canvas.width){
            	GAME.bubbleArray[i].x = 0;
            }
                
        }
    }
}

GAME.draw = function()
{
	// console.log('Starting to draw images to canvas');
	
	GAME.context.save();

	GAME.blank();

	//Get image and draw to screen
	var img = new Image();
 	img.src = "images/bubblet.png";

	// console.log('Loop through all images and draw them to the screen');
	for (var i = 0; i < GAME.bubbleArray.length; i++) {
        GAME.bufferCanvasCtx.drawImage(img, GAME.bubbleArray[i].x, GAME.bubbleArray[i].y, GAME.bubbleArray[i].width, GAME.bubbleArray[i].height);
    }

	// console.log('Now draw the buffer canvas to the canvas');
	GAME.context.drawImage(GAME.bufferCanvas, 0, 0, GAME.bufferCanvas.width, GAME.bufferCanvas.height);
	GAME.context.restore();

	return true;
}

GAME.addBubble = function()
{
	// console.log('Adding a bubble to the array');
	GAME.bubbleArray[GAME.bubbleArray.length] = new BUBBLE();
	
	if(GAME.bubbleArray.length == GAME.maxBubbles){
		clearInterval(GAME.bubbleTimer);
	}
}

GAME.blank = function()
{
	// GAME.bufferCanvasCtx.fillStyle = "rgba(255,255,255,0.8)";
	GAME.bufferCanvasCtx.fillStyle = "rgba(0,0,0,0.8)";
    GAME.bufferCanvasCtx.fillRect(0, 0, GAME.bufferCanvasCtx.canvas.width, GAME.bufferCanvasCtx.canvas.height);
}


function BUBBLE()
{
	this.x = Math.round(Math.random() * GAME.context.canvas.width);
	this.y = -10;
	this.drift = Math.random();
	this.speed = Math.round(Math.random() * 5) + 1;
	// this.width = (Math.random() * 100) + 2;
	this.width = 100;
    this.height = this.width;
}