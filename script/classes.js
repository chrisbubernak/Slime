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
  }
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
  }
  
  this.bounce = function() {
    this.bounceTimer = 10;
	this.bouncing = true;
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
  }
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

function Title (x, y, title, subtitle, subtitle2) {
  this.color = 'white',
  this.title = title,
  this.subtitle = subtitle,
  this.subtitle2 = subtitle2,
  this.x = x,
  this.y = y,
  this.height = 48,
  this.subtitleFont = "12px sans-serif",
  this.titleFont = "bold 16px sans-serif",
  this.context = document.getElementById('canvas').getContext('2d'),

  this.draw = function() {
    this.context.fillStyle = this.color;
	this.context.font = this.titleFont;
	this.context.fillText(this.title, this.x - this.context.measureText(this.title).width/2, this.y);
	this.context.font = this.subtitleFont;
	this.context.fillText(this.subtitle, this.x - this.context.measureText(this.subtitle).width/2, this.y + this.height);
	this.context.fillText(this.subtitle2, this.x - this.context.measureText(this.subtitle2).width/2, this.y + this.height*6/4);
	}; 
}

function Button (x, y, text) {
  this.color = 'white',
  this.textColor = 'blue',
  this.text = text,
  this.height = 50,
  this.width = 225,
  this.font = "12px sans-serif",
  this.context = document.getElementById('canvas').getContext('2d'),
  this.x = x,
  this.y = y,
  
  this.draw = function() {
    this.context.fillStyle = this.color;
    this.context.fillRect(x, y, this.width, this.height);
	this.context.fillStyle = this.textColor;
	this.context.font = this.font;
	this.context.fillText(text, this.x + this.width/2 - this.context.measureText(this.text).width/2, this.y + this.height/2);
  };
}

