$(document).ready(function () {	  
  //constants
  var CANVAS_WIDTH = 800;
  var CANVAS_HEIGHT = 350;
  var GROUND_HEIGHT = 75;
  var MOVE_SPEED = 10;
  var SCORE_CIRCLE_OFFSET = 40;
  var WINNING_SCORE = 6;
  var P1_STARTING_X = 1/4 * CANVAS_WIDTH;
  var P2_STARTING_X = 3/4 * CANVAS_WIDTH;
  var SLIME_STARTING_Y = CANVAS_HEIGHT - GROUND_HEIGHT;
  var BALL_STARTING_Y = 100;
  var PAUSE_LENGTH = 30;
  
  //global variables
  var inStartMenu = true;
  var inGame = false;
  var twoPlayer;
  var p1Score = 0;
  var p2Score = 0;
  var paused = false;
  var pause_counter = 0;
  var scored =false;
	  
  //create and append the canvas in the element with the id "slime"
  var canvasElement = $("<canvas id='canvas' width='" + CANVAS_WIDTH + "'height='" + CANVAS_HEIGHT + "'></canvas>");
  var canvas = canvasElement.get(0).getContext("2d");
  $("#slime").append(canvasElement);

  //game loop
  var FPS = 30;
  setInterval(function() {
	if (paused == false) {
	  update();
	  draw();
	}
	else {
	  pause_counter -= 1
	  if (pause_counter == 0) {
		paused = false;
	  }
	}
  }, 1000/FPS);
  
  //create the setting
  var sky = new Sky(CANVAS_HEIGHT, CANVAS_WIDTH);
  var ground = new Ground(CANVAS_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
  var net = new Net(CANVAS_HEIGHT, CANVAS_WIDTH, GROUND_HEIGHT);
  var p1ScoreCircles = [new ScoreCircle(SCORE_CIRCLE_OFFSET, SCORE_CIRCLE_OFFSET, 'yellow'), new ScoreCircle(SCORE_CIRCLE_OFFSET*2, SCORE_CIRCLE_OFFSET, 'yellow'), new ScoreCircle(SCORE_CIRCLE_OFFSET*3,SCORE_CIRCLE_OFFSET, 'yellow'), new ScoreCircle(SCORE_CIRCLE_OFFSET*4, SCORE_CIRCLE_OFFSET, 'yellow'), new ScoreCircle(SCORE_CIRCLE_OFFSET*5, SCORE_CIRCLE_OFFSET, 'yellow'), new ScoreCircle(SCORE_CIRCLE_OFFSET*6, SCORE_CIRCLE_OFFSET, 'yellow')];
  var p2ScoreCircles = [new ScoreCircle(CANVAS_WIDTH - SCORE_CIRCLE_OFFSET, SCORE_CIRCLE_OFFSET, 'white'), new ScoreCircle(CANVAS_WIDTH - SCORE_CIRCLE_OFFSET*2, SCORE_CIRCLE_OFFSET, 'white'), new ScoreCircle(CANVAS_WIDTH - SCORE_CIRCLE_OFFSET*3,SCORE_CIRCLE_OFFSET, 'white'), new ScoreCircle(CANVAS_WIDTH - SCORE_CIRCLE_OFFSET*4, SCORE_CIRCLE_OFFSET, 'white'), new ScoreCircle(CANVAS_WIDTH - SCORE_CIRCLE_OFFSET*5, SCORE_CIRCLE_OFFSET, 'white'), new ScoreCircle(CANVAS_WIDTH - SCORE_CIRCLE_OFFSET*6, SCORE_CIRCLE_OFFSET, 'white')];

  //create the start menu stuff
  var onePlayerButton = new Button(CANVAS_WIDTH*1/8, CANVAS_HEIGHT/2, "Press 1 to start a one player game!");
  var twoPlayerButton = new Button(CANVAS_WIDTH*5/8, CANVAS_HEIGHT/2, "Press 2 to start a two player game!");
  var title = new Title(CANVAS_WIDTH/2, CANVAS_HEIGHT*1/4, "Slime Volleyball", "Rewritten by Chris Bubernak", "http://bubernak.com/");
  
  //create the game objects
  var human = new Slime('yellow', P1_STARTING_X, SLIME_STARTING_Y, 'player1');
  var enemy = new Slime('white', P2_STARTING_X, SLIME_STARTING_Y, 'computer');
  var ball = new Ball('yellow', P1_STARTING_X, BALL_STARTING_Y);	  

  
  function update() {
	if (p1Score == WINNING_SCORE || p2Score == WINNING_SCORE) {
	  gameReset();
	}
	if (scored) {
	  pointReset(ball);
	  scored = false;
	}
	
	if (inStartMenu) {
	  if (keydown.one) {
		twoPlayer = false;
		inGame = true;
		inStartMenu = false;
	  }
	  if (keydown.two) {
		twoPlayer = true;
		inGame = true;
		inStartMenu = false;
		enemy.player = 'player2';
	  }
	}
	else {
	
	  //playerOneMove();
	  playerTwoMove();
	  human.update();
	  enemy.update();
	  /*if (human.jumping) {
		human.jumpTimer -=1;
		if (human.jumpTimer == 0) {
		  human.jumping = false;p
		}
		human.y -=MOVE_SPEED*2;
	  }
	
	  if (enemy.jumping) {
		enemy.jumpTimer -=1;
		if (enemy.jumpTimer == 0) {
		  enemy.jumping = false;
		}
		enemy.y -=MOVE_SPEED*2;
	  }*/
	  if (ball.bouncing) {
		ball.bounceTimer -=1;
		if (ball.bounceTimer == 0) {
		  ball.bouncing = false;
		}
		ball.y -=MOVE_SPEED*2*ball.vy;
	  }
	
	  ball.x +=MOVE_SPEED*ball.vx;
	
	  ball.y +=MOVE_SPEED;
	  human.y +=MOVE_SPEED;
	  enemy.y +=MOVE_SPEED;
	
	  ball.x = ball.x.clamp(0 + ball.radius, CANVAS_WIDTH - ball.radius);
	  human.x = human.x.clamp(0 + human.radius, net.x - human.radius);
	  enemy.x = enemy.x.clamp(net.x + net.width + enemy.radius, CANVAS_WIDTH - enemy.radius);
	
	  human.y = human.y.clamp(0, CANVAS_HEIGHT - GROUND_HEIGHT);
	  enemy.y = enemy.y.clamp(0, CANVAS_HEIGHT - GROUND_HEIGHT);
	  ball.y = ball.y.clamp(0, CANVAS_HEIGHT - GROUND_HEIGHT - ball.radius);
	
	  handleCollisions();
	}
  }
  
  function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	sky.draw();
	ground.draw();
	net.draw();
	for (var i in p1ScoreCircles) {
	  p1ScoreCircles[i].draw();
	  p2ScoreCircles[i].draw();
	}
	
	if (inStartMenu) {
	  onePlayerButton.draw();
	  twoPlayerButton.draw();
	  title.draw();
	}
	if (inGame) {
	  human.draw();
	  enemy.draw();
	  ball.draw();
	}
  }
  
  Number.prototype.clamp = function(min, max) {
	return Math.min(Math.max(this, min), max);
  }
  
  function handleCollisions() {
	if (ballGroundCollision(ball, ground)) {
	  //someone should score a point here!
	  scorePoint(ball.x);
	}
	if (circleCollision(ball, human)) {
	  ball.bounce();
	}
	if (circleCollision(ball, enemy)) {
	  ball.bounce();
	}
	if (ballNetCollision(ball, net)) {
	  ball.bounce();
	}
	if (ballWallCollision(ball)) {
	  ball.bounce();
	}
  }
  
  function circleCollision(a, b) {
	//hypotenuse
	hyp = Math.sqrt(Math.pow(Math.abs(a.x - b.x),2)+ Math.pow(Math.abs(a.y - b.y),2));
	//adjacent
	adj = a.x-b.x; 
	//opposite
	opp = a.y-b.y; 
	//Sin = opp/hyp
	sin = opp/hyp;
	//Cos = adj/hyp
	cos = adj/hyp;
	if (hyp <= a.radius + b.radius) {
	  a.vx = cos*2;
	  a.vy = -sin*1.5;
	}
	return hyp <= a.radius + b.radius;
  }
  
  function ballGroundCollision(b, g) {
	return (b.y + b.height >= g.y)
  }
  
  function ballNetCollision(b, n) {
	if (b.y + b.radius > net.y) {
	  alert('fda');
	}
  }
  
  function ballWallCollision(b) {
	if (b.x - b.width <= 0 || b.x + b.width >= CANVAS_WIDTH) {
	  b.vx = -b.vx;
	}
	return (b.x - b.width <= 0 || b.x + b.width >= CANVAS_WIDTH)
  }
  
  //rectangle collision algorithm
  function collides(a, b) {
	collision = a.x <= b.x + b.width &&
	 a.x + a.width >= b.x &&
	 a.y <= b.y + b.height &&
	 a.y + a.height >= b.y;
	 if (collision) {
	   b.vx = -b.vx;
	   b.vy = -b.vy;
	 }
	 return collision;
  }
  
  /*function playerOneMove() {
	//player 1 controls
	if (keydown.a) {
	  human.x -=MOVE_SPEED;
	}
	if (keydown.d) {
	  human.x +=MOVE_SPEED;
	}
	if (keydown.w) {
	  human.jump();
	}
  }*/
  
  function playerTwoMove() {
	if (twoPlayer) {
	  //player 2 human controls
	  if (keydown.j) {
		enemy.x -=MOVE_SPEED;
	  }
	  if (keydown.l) {
		enemy.x +=MOVE_SPEED;
	  }
	  if (keydown.i) {
		enemy.jump();
	  }
	}

	else {
	  //player 2 ai
	  if (ball.x < net.x) {
		if (enemy.x > CANVAS_WIDTH*7/10) {
		  enemy.x -=MOVE_SPEED;
		}		  
		if (enemy.x < CANVAS_WIDTH*7/10) {
		  enemy.x +=MOVE_SPEED;
		}
	  }
	  else {
		if (enemy.x > ball.x + 5) {
		  enemy.x -=MOVE_SPEED;
		}
		if (enemy.x < ball.x + 5) {
		  enemy.x +=MOVE_SPEED;
		}
		if (ball.x <=enemy.x + 10 && ball.x >= enemy.x - 10) {
		  enemy.jump();
		}
	  }
	}
  }
  
  function scorePoint(x) {
	if (x > CANVAS_WIDTH/2 + net.width/2) {
	  p1ScoreCircles[p1Score].fill();
	  p1Score +=1;
	}
	else {
	  p2ScoreCircles[p2Score].fill();
	  p2Score +=1;
	}
	pause(PAUSE_LENGTH);
	scored = true;
  }

  
  function pause(time) {
	paused = true;
	pause_counter = time;
  }
  
  function pointReset(b){ 
	if (b.x > CANVAS_WIDTH/2 + net.width/2) {
	  ball = new Ball('yellow', P1_STARTING_X, BALL_STARTING_Y);
	}
	else {
	  ball = new Ball('yellow', P2_STARTING_X, BALL_STARTING_Y);
	}
	human.x = P1_STARTING_X;
	human.y = SLIME_STARTING_Y;
	enemy.x = P2_STARTING_X;
	enemy.y = SLIME_STARTING_Y;
  }
  
  function gameReset() {
	for (var i in p1ScoreCircles) {
	  p1ScoreCircles[i].unfill();
	  p2ScoreCircles[i].unfill();
	}
	p1Score = 0;
	p2Score = 0;
	inGame = false;
	inStartMenu = true;
  }
});
