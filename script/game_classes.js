function Slime (color, x, y) {
  this.color = color,
  this.x = x,
  this.y = y
  this.groundLevel = y,
  this.radius = 40,
  this.width = this.radius * 2,
  this.height = this.radius,
  this.context = document.getElementById('canvas').getContext('2d'),
  this.jumping = false,
  this.jumpTimer = 0,
  
  this.draw = function() {
	this.context.beginPath();
	this.context.arc(this.x, this.y, this.radius, 0, Math.PI, true); 
	this.context.closePath();
	this.context.fillStyle = this.color;
	this.context.fill();
  };
  
  this.jump = function() {
    if (this.y == this.groundLevel) {
	  this.jumpTimer = 10;
	  this.jumping = true;
	}
  };
}

function Ball (color, startingX, startingY) {
  this.color = color,
  this.x = startingX,
  this.y = startingY,
  this.radius = 10,
  this.width = this.radius * 2,
  this.height = this.radius,
  this.context = document.getElementById('canvas').getContext('2d'),
  this.bouncing = false,
  this.bounceTimer = 0,
  this.vx = 0;
  this.vy = 1;
  
  this.draw = function() {
    this.context.beginPath();
	this.context.arc(this.x, this.y, this.radius, 0, 2*Math.PI, true); 
	this.context.closePath();
	this.context.fillStyle = this.color;
	this.context.fill(); 
  };
  
  this.bounce = function() {
    this.bounceTimer = 10;
	this.bouncing = true;
  };
}




