class Generation{
	constructor(id){
		this.id = id;
		this.rockets = new Array(n);
		for(var i = 0; i < n; i++){
			this.rockets[i] = new Rocket();
		}

		this.matingpool = new Array();
		this.newGen = new Array(n);
		this.reachedCount = 0;

	}

//----------------------------update function----------------------------------
	update(){
		var maxfitness = 0;

		for(var i = 0; i < n; i++){
			this.rockets[i].evaluate();
			if(this.rockets[i].fitness > maxfitness){
				maxfitness = this.rockets[i].fitness;
			}
			if(this.rockets[i].reached) this.reachedCount++;
		}

		global_max_fitness = round(maxfitness, 3);
		global_reachedCount = this.reachedCount;
		this.reachedCount = 0;

		for(var i = 0; i < n; i++){
			this.rockets[i].fitness /= maxfitness;
		}


		this.matingpool = [];

		for(var i = 0; i < n; i++){
			var k = this.rockets[i].fitness * 20;
			for(var j = 0; j < k; j++){
				this.matingpool.push(this.rockets[i]);
			}

		}

	}
//-----------------------Natural selection-------------------------------------

	selection(){
		for(var i = 0; i < n; i++){
			var parent1DNA = random(this.matingpool).DNA;
			var parent2DNA = random(this.matingpool).DNA;

			var childDNA = new Array();
			var cut = floor(random(n));

			for(var j = 0; j < lifespan; j++){
				if(j > cut){
					childDNA.push(parent1DNA[j]);
				}
				else{
					childDNA.push(parent2DNA[j]);
				}
			}
			
			this.newGen[i] = new Rocket(childDNA);
			
		}

		this.rockets = this.newGen;
	}

//-----------------------------show function-----------------------------------
	show(){

		for(var i = 0; i < n; i++){
			this.rockets[i].show();
		}
	}

}