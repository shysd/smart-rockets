// number of rockets
var n = 100;
// goal 
var goalsize = 100;
var goal;
// obstacle
var obstaclesize = 250;
var obstacle;
var obstacleCreated = false;
// Lifespan of rockets - number of frames
var lifespan = 200;
// Mutation rate
var mutation_rate = 0.2;
var gen;
var count;
var gencount = 1;
var global_max_fitness = 0;
var global_reachedCount = 0;

function setup() {
	// CSS stuff
	var sk_ho = document.getElementById("sketch-holder");
	var canvas = createCanvas(sk_ho.offsetWidth, 500);
	canvas.parent('sketch-holder');

	resetSketch();

}
//--------------------------Looping function-----------------------
function draw() {
	background(71);
	createGoal();
	createObstacle();

	gen.show();

	count++;
	// if frames reach the lifespan start the new generation
	if (count == lifespan) {
		// calculate fitness and create matingpool
		gen.update();
		// Natural selection
		gen.selection();
		count = 0;
		gencount++;
	}

	// var genstr = 'Generation ' + String(gencount);
	fill(255, 255, 255, 200);
	textSize(20);
	text('Refresh', width - 75, 20)
	text('Generation ' + String(gencount), 10, 20);
	text('Mutation Rate: ' + String(mutation_rate), 10, 40);
	text('Max fitness: ' + String(global_max_fitness), 10, 60);
	if (global_reachedCount == 100) fill(187, 134, 252, 200)
	text('Reached: ' + String(global_reachedCount) + '/' + String(n), 10, 80);
}


//------------------------Goal and Obstacle drawing-------------------------
function createGoal() {
	strokeWeight(8);
	stroke(255, 0, 0);
	line(goal.x - goalsize / 2, goal.y, goal.x + goalsize / 2, goal.y);
	noStroke();
}

function createObstacle() {
	strokeWeight(8);
	stroke(100);
	line(obstacle.x - obstaclesize / 2, obstacle.y, obstacle.x + obstaclesize / 2, obstacle.y);
	noStroke();
	obstacleCreated = true;
}

//----------------------sketch resetting-------------------------------------
function resetSketch() {
	global_max_fitness = 0;
	global_reachedCount = 0;
	gencount = 1;
	
	// create random vectors for goal and obstacle
	goal = createVector(int(random(1, 8)) * width / 8, int(random(100, 200)));
	obstacle = createVector(int(random(1, 8)) * width / 8, int(random(1, 4)) * height / 4);

	count = 0;
	fill(251);
	rectMode(CENTER);
	// start a new Generation
	gen = new Generation(1);
}

function mousePressed() {
	if (mouseX > width - 75 && mouseX < width) {
		if (mouseY > 0 && mouseY < 20) {
			resetSketch();
		}
	}
}

//---------------Styling------------------------------------------------
// Window resizing cannot be allow here since training will be disrupted

// function windowResized() {
// 	resizeCanvas(windowWidth, windowHeight);
// }