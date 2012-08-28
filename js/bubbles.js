var canvas, context;
var x = 10;
var y = 10;
var dirX = 1;
var dirY = 1;

window.onload = function(){
        gameStart();
};

function gameStart(){
        setInterval(drawImage, 25);
}


function drawImage(x,y){
	var canvas  = document.getElementById("pong");
    var context = canvas.getContext("2d");
	var img = document.getElementById("bubble");
	context.drawImage(img,x,y);

	x += dirX;
	y += dirY;

	if(x > 200){
		x = 10;
	}

	if(y > 200){
		y = 10;
	}

}