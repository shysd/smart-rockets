class Rocket{
	constructor(dna){
		this.width = 30;
		this.height = 10;
		// current position of the rocket
		this.pos = createVector(width/2, height - this.height - 50);
		// Alive flag - used to stop updating the position if false
		this.alive = true;
		// Reached flag - no use except to change colour
		this.reached = false;
		// Hit wall flag - used to reduce fitness if rocket hits wall
		this.hitwall = false;
		// current heading of the rocket - direction where the rocket is pointing
		this.heading = createVector(0, -1);
		// DNA of the rocket, array of vectors containing the path to be taken
		// this DNA will be replicated to produce new rockets
		this.DNA = new Array(lifespan);
		// fitness score - used to determine, well, fitness.
		this.fitness = 0;
		// used to count the number of frames of animation
		this.count = 0;

		if(dna){
			//if DNA supplied, create rocket from it
			this.DNA = dna;
		}
		else{
			for(var i = 0; i < lifespan; i++){
				//else create random DNA
				this.DNA[i] = p5.Vector.random2D();
			}
		}
	}
//--------------------------------update function------------------------------
	update(){
		// every cycle, each element from DNA is vector-added
		// to the heading of the rocket and that heading is
		// add to the position of the rocket
		// basically position = velocity*time;
		push();
		translate(this.pos.x, this.pos.y);
		this.pos.add(this.heading);
		this.heading.add(this.DNA[this.count]);
		pop();

		// boundary condtions
		// die if reach boundary
		if(this.pos.x >= width-this.width || this.pos.x <= this.width/2 || this.pos.y >= height-this.height || this.pos.y <= this.height/2){

			this.alive = false;	
			this.hitwall = true;
		} 

		// die if hit obstacle, set appropriate flags
		if(obstacleCreated == true && this.pos.x < obstacle.x+obstaclesize/2 && this.pos.x > obstacle.x-obstaclesize/2 && this.pos.y <= obstacle.y + this.height/2  && this.pos.y >= obstacle.y - this.height/2){

			this.alive = false;
			this.hitwall = true;
		}

		// appropriate flags if reached goal
		if(this.pos.x < goal.x+goalsize/2 && this.pos.x > goal.x-goalsize/2 && this.pos.y <= goal.y + this.height/2  && this.pos.y >= goal.y - this.height/2){
			this.alive = false;
			this.reached = true;
		}

		this.count++;
		if(this.count == lifespan){
			this.count = 0;
		}

	}

//-----------------------------calculate fitness-------------------------------

	evaluate(){
		// fitness is calculated as the inverse of the distance of
		// the rocket from the goal after completing lifespan
		// less distance => more fitness
		// if hit wall => fitness is reduced
		for(var i = 0; i < n; i++){
			var d = dist(this.pos.x, this.pos.y, goal.x, goal.y);
			this.fitness = abs(map(d, 0, width, 100, 0));
			if(this.hitwall) this.fitness = 0.1;
		}
	}

//--------------------------------show function--------------------------------
	show(){
		if(this.alive){
			this.update();
		}

		// drawing the rocket at given position vector this.pos
		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading.heading());
		fill(251, 50);
		if(this.reached) fill(150, 0, 0, 50);
		rect(0, 0, this.width, this.height);
		pop();

	}
}