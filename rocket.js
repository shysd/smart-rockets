class Rocket{
	constructor(dna){
		this.width = 30;
		this.height = 10;
		this.pos = createVector(width/2, height - this.height - 50);
		this.alive = true;
		this.reached = false;
		this.hitwall = false;
		this.heading = createVector(0, -1);
		this.DNA = new Array(lifespan);
		this.fitness = 0;

		if(dna){
			this.DNA = dna;
		}
		else{
			for(var i = 0; i < lifespan; i++){
				this.DNA[i] = p5.Vector.random2D();
			}
		}

		this.count = 0;
	}
//--------------------------------update function------------------------------
	update(){
		push();
		translate(this.pos.x, this.pos.y);
		this.pos.add(this.heading);
		this.heading.add(this.DNA[this.count]);
		pop();

		if(this.pos.x >= width-this.width || this.pos.x <= this.width/2 || this.pos.y >= height-this.height || this.pos.y <= this.height/2){

			this.alive = false;	
			this.hitwall = true;
		} 

		if(obstacleCreated == true && this.pos.x < obstacle.x+obstaclesize/2 && this.pos.x > obstacle.x-obstaclesize/2 && this.pos.y <= obstacle.y + this.height/2  && this.pos.y >= obstacle.y - this.height/2){

			this.alive = false;
			this.hitwall = true;
		}

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

		push();
		translate(this.pos.x, this.pos.y);
		rotate(this.heading.heading());
		fill(251, 50);
		if(this.reached) fill(150, 0, 0, 50);
		rect(0, 0, this.width, this.height);
		pop();

	}
}