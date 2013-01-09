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