function Ground (canvasHeight, canvasWidth, groundHeight) {
  this.color = 'gray',
  this.canvasHeight = canvasHeight,
  this.width = canvasWidth,
  this.context = document.getElementById('canvas').getContext('2d'),
  this.height = groundHeight,
  this.x = 0,
  this.y = this.canvasHeight - this.height,
  
  this.draw = function() {
    this.context.fillStyle = this.color;
	this.context.fillRect(this.x, this.y, this.width, this.height); 
  };
}

function Net (canvasHeight, canvasWidth, groundHeight) {
  this.color = 'white',
  this.width = 4,
  this.context = document.getElementById('canvas').getContext('2d'),
  this.height = 40,
  this.offset = 5, //in slime volleyball the net overlaps the ground a little bit...
  this.x = canvasWidth/2-this.width/2
  this.y = canvasHeight - groundHeight + this.offset
  
  this.draw = function() {
    this.context.fillStyle = this.color;
	this.context.fillRect(this.x, this.y, this.width, -this.height); 
  };
}

function Sky (height, width) {
  this.color = 'blue',
  this.height = height,
  this.width = width,
  this.context = document.getElementById('canvas').getContext('2d'),
  
  this.draw = function() {
    this.context.fillStyle = this.color;
    this.context.fillRect(0, 0, this.width, this.height);
  };
}

function ScoreCircle (x, y, color) {
  this.color = color,
  this.outlineColor = 'white',
  this.radius = 12,
  this.context = document.getElementById('canvas').getContext('2d'),
  this.filled = false,
  this.x = x,
  this.y = y,
  
  this.fill = function() {
    this.filled = true;
  }
  
  this.unfill = function() {
    this.filled = false;
  }
  
  this.draw = function() {
    this.context.beginPath();
	this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true); 
	this.context.closePath();
	this.context.strokeStyle = this.outlineColor;
	this.context.stroke();
	if (this.filled) {
	  this.context.fillStyle = this.color;
	  this.context.fill();
    }	
  };
}