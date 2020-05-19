class Generation{
	constructor(id){
		this.id = id;						//not used

		// create a generation of Rockets of given number
		this.rockets = new Array(n);
		for(var i = 0; i < n; i++){
			this.rockets[i] = new Rocket();
		}

		//mating pool (empty)
		this.matingpool = new Array();

		this.newGen = new Array(n);
		this.reachedCount = 0;
	}

//----------------------------update function----------------------------------
	update(){
		var maxfitness = 0;

		// for every rocket in the current generation
		// fitness is calculated and maxfitness is determined
		for(var i = 0; i < n; i++){
			this.rockets[i].evaluate();
			if(this.rockets[i].fitness > maxfitness){
				maxfitness = this.rockets[i].fitness;
			}
			if(this.rockets[i].reached) this.reachedCount++;
		}

		// global variables for display purposes
		global_max_fitness = round(maxfitness, 3);
		global_reachedCount = this.reachedCount;
		this.reachedCount = 0;

		// normalizing the fitness of all rockets
		// every fitness value is divided by the maxfitness
		// so most fit rocket has fitness = 1
		for(var i = 0; i < n; i++){
			this.rockets[i].fitness /= maxfitness;
		}


		// clear out the mating pool
		this.matingpool = [];

		// for every rocket multiply the fitness by some number and
		// put it in the mating pool that many number of times
		// so that during selection the rocket which is more fit is
		// more likely to be picked
		for(var i = 0; i < n; i++){
			var k = this.rockets[i].fitness * mutation_rate * n;
			for(var j = 0; j < k; j++){
				this.matingpool.push(this.rockets[i]);
			}

		}

	}
//-----------------------Natural selection-------------------------------------

	selection(){
		// create new child for the new generation
		for(var i = 0; i < n; i++){
			// choose two parents DNA from the mating pool randomly
			var parent1DNA = random(this.matingpool).DNA;
			var parent2DNA = random(this.matingpool).DNA;

			var childDNA = new Array();
			// choose an arbit number to crossover the DNA
			var cut = floor(random(n));

			// the DNA before that number is from parent 1
			// the DNA after  that number is from parent 2
			for(var j = 0; j < lifespan; j++){
				if(j > cut){
					childDNA.push(parent1DNA[j]);
				}
				else{
					childDNA.push(parent2DNA[j]);
				}
			}
			
			// new DNA is now created for every rocket
			// make a new rocket using the created DNA
			// this is inside the loop so we will make n rockets
			this.newGen[i] = new Rocket(childDNA);
			
		}

		// now we make the new generation of rockets as the current rockets
		// new generation is now playing
		this.rockets = this.newGen;
	}

//-----------------------------show function-----------------------------------
	show(){

		for(var i = 0; i < n; i++){
			this.rockets[i].show();
		}
	}

}