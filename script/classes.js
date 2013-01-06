function Slime (color, x, y) {
  this.color = color,
  this.x = x,
  this.y = y
  this.radius = 40,
  this.context = document.getElementById('canvas').getContext('2d')
  
  this.draw = function() {
	this.context.beginPath();
	this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true); 
	this.context.closePath();
	this.context.fillStyle = this.color;
	this.context.fill();
  };
}

function Ground (canvasHeight, canvasWidth, groundHeight) {
  this.color = 'gray',
  this.canvasHeight = canvasHeight,
  this.width = canvasWidth,
  this.context = document.getElementById('canvas').getContext('2d'),
  this.height = groundHeight,
  
  this.draw = function() {
    this.context.fillStyle = this.color;
	this.context.fillRect(0, this.canvasHeight - this.height, this.width, this.height); 
  }
}

function Ball (color, startingX, startingY) {
  this.color = color,
  this.x = startingX,
  this.y = startingY,
  this.radius = 10,
  this.context = document.getElementById('canvas').getContext('2d'),
  
  this.draw = function() {
    this.context.beginPath();
	this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true); 
	this.context.closePath();
	this.context.fillStyle = this.color;
	this.context.fill(); 
  }
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
  }
}

function Sky (height, width) {
  this.color = 'blue',
  this.height = height,
  this.width = width,
  this.context = document.getElementById('canvas').getContext('2d'),
  
  this.draw = function() {
    this.context.fillStyle = 'blue';
    this.context.fillRect(0, 0, this.width, this.height);
  };
}

