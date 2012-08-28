var canvas, context;
var x = 10;
var y = 10;
var dirX = 1;
var dirY = 1;

// window.onload = function(){
//         gameStart();
// };

function gameStart(){
	console.log('starting animation');
    window.setInterval(drawImage, 25);
}


function drawImage(){
	console.log('This is x: ' + x);
	console.log('This is y: ' + y);

	canvas  = document.getElementById("canvasRain");
    context = canvas.getContext("2d");
	var img = document.getElementById("bubble");
	context.drawImage(img,x,y);

	y += dirY;

	if(y > 300){
		y = 10;
	}
	return true;

}