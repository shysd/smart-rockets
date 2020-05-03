// var rockets;
var n = 100;
var goalsize = 100;
var goal;
var obstaclesize = 250;
var obstacle;
var obstacleCreated = false;
var lifespan = 200;
var gen;
var count;
var gencount = 1;
var global_max_fitness = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	goal = createVector(4*width/6, 150);
	obstacle = createVector(2*width/3, height/2);
	count = 0;
	fill(251);
	rectMode(CENTER);
	gen = new Generation(1);
	
}

function draw() {
	background(51);
	createGoal();
	createObstacle();

	gen.show();

	count++;
	if(count == lifespan){
		gen.update();
		gen.selection();
		count = 0;
		gencount++;
	}

	var genstr = 'Generation ' + String(gencount); 
	textSize(24);
	text(genstr, 10, 30);
	text('Max fitness: ' + String(global_max_fitness), 10, 60);
}



function createGoal(){
	strokeWeight(8);
	stroke(255, 0, 0);
	line(goal.x - goalsize/2, goal.y, goal.x + goalsize/2, goal.y);
	noStroke();
}

function createObstacle(){
	strokeWeight(8);
	stroke(100);
	line(obstacle.x - obstaclesize/2, obstacle.y, obstacle.x + obstaclesize/2, obstacle.y);
	noStroke();
	obstacleCreated = true;
}