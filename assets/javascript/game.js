$("#newgame").toggle("hide");
$("#btn-attack").toggle("hide");

$(document).ready( function () {

	function print(str){
		console.log(str);
	}


	var luke = {
		name: "Luke",
		health_points: 100,
		attack_power: 5,
		counter_attack_power: 20,
		tile: null,

		doubleAttack: function(){
			this.attack_power = this.attack_power * 2;
		},	

		lowerHealth: function(attack){
			this.health_points = this.health_points - attack;
		},

		updateStats: function(){
			$('#'+this.name).find(".stats").html(
				"HP: " + this.health_points + "<br>" + 
				"Attack: " + this.attack_power + "<br>" +
				"Counter Attack: " + this.counter_attack_power);
		},

		detach: function(){
			print(this.name + "detach");
			this.tile = $('#'+this.name).detach();
		},

		attach: function(){
			print(this.name + "appending");
			$("#characters").append(this.tile);
		}

	}

	var obiwan = {
		name: "Obiwan",
		health_points: 150,
		attack_power: 6,
		counter_attack_power: 15,
		tile: null,

		doubleAttack: function(){
			this.attack_power = this.attack_power * 2;
		},	

		lowerHealth: function(attack){
			this.health_points = this.health_points - attack;
		},

		updateStats: function(){
			$('#'+this.name).find(".stats").html(
				"HP: " + this.health_points + "<br>" + 
				"Attack: " + this.attack_power + "<br>" +
				"Counter Attack: " + this.counter_attack_power);
		},

		detach: function(){
			print(this.name + "detach");
			this.tile = $('#'+this.name).detach();
		},

		attach: function(){
			print(this.name + "appending");
			$("#characters").append(this.tile);
		}

	}

	var vader = {
		name: "Vader",
		health_points: 200,
		attack_power: 4,
		counter_attack_power: 30,
		tile: null,

		doubleAttack: function(){
			this.attack_power = this.attack_power * 2;
		},

		lowerHealth: function(attack){
			this.health_points = this.health_points - attack;
		},

		updateStats: function(){
			$('#'+this.name).find(".stats").html(
				"HP: " + this.health_points + "<br>" + 
				"Attack: " + this.attack_power + "<br>" +
				"Counter Attack: " + this.counter_attack_power);
		},

		detach: function(){
			print(this.name + "detach");
			this.tile = $('#'+this.name).detach();
		},

		attach: function(){
			print(this.name + "appending");
			$("#characters").append(this.tile);
		}

	}

	var maul = {
		name: "Maul",
		health_points: 90,
		attack_power: 8,
		counter_attack_power: 10,
		tile: null,

		doubleAttack: function(){
			this.attack_power = this.attack_power * 2;
		},	

		lowerHealth: function(attack){
			this.health_points = this.health_points - attack;
		},

		updateStats: function(){
			$('#'+this.name).find(".stats").html(
				"HP: " + this.health_points + "<br>" + 
				"Attack: " + this.attack_power + "<br>" +
				"Counter Attack: " + this.counter_attack_power);
		},

		detach: function(){
			print(this.name+"detach");
			this.tile = $('#'+this.name).detach();
		},

		attach: function(){
			print(this.name + "appending");
			$("#characters").append(this.tile);
		}
	}

	//Move character tile
	function moveCharacter(char, destination){
		var characterTile = $("#"+char.name).detach();
		$("#"+destination).append(characterTile);
		
	};

	var characters = [luke, obiwan, vader, maul];

	//Print initial stats of each character
	characters.forEach(function(character){
		$('#'+character.name).find(".stats").html(
			"HP: " + character.health_points + "<br>" + 
			"Attack: " + character.attack_power + "<br>" +
			"Counter Attack: " + character.counter_attack_power);

		$('#'+character.name).find('.name').text(character.name);
	});

	//Variables to keep track of what step of the game we're on
	var hero = null;
	var defender = null;
	var enemiesleft = 3;


	//Character is clicked on
	$(document).on('click', '.character', function(event){		
		var str_clicked = this.id;
		var clicked_char;
		var enemies = [];

		//If picking hero
		if(hero === null){
			$("#btn-attack").toggle("show");
			characters.forEach( function(character){
				if (character.name == str_clicked){
					clicked_char = character;
					moveCharacter(clicked_char, "your-character");	
					hero = clicked_char;

				}
				else {
					moveCharacter(character, "enemies-available");
					enemies.push(character);
				}
			});

			$("#characters").toggle("hide");
			$("#pickchar").toggle("hide");


		}

		//If picking defender
		else if (hero !== null && defender === null){
		 	characters.forEach( function(character){
		 		if(character.name === str_clicked){
		 			clicked_char = character;
		 			moveCharacter(clicked_char, "defender");
		 			defender = clicked_char;
		 		}
		 	});
		 	print("Moving to defender");
		}
		 
	});  

         
    //Attack
	$("#btn-attack").on("click", function (){
        
        //Apply stat changes
		defender.lowerHealth(hero.attack_power);
		hero.lowerHealth(defender.counter_attack_power);
		hero.doubleAttack();

		//If defender loses
		if (defender.health_points <= 0){
			defender.detach();
			defender = null;
			hero.updateStats();
			enemiesleft--;

			//Check if you won
			if (enemiesleft === 0){
				alert("You win!");
			}

		}

		//If hero loses
		else if(hero.health_points <= 0){
			//hero.detach();
			alert("You lose!");
			hero = null;
			$("#newgame").toggle("show");
			$("#btn-attack").toggle("hide");

		}

		//If no one dissapears
		else {
			defender.updateStats();
			hero.updateStats();
		}

	});

	//New game button clicked and dissapears
	$("#newgame").on("click", function(){
		$("#characters").toggle("show");
		$("#pickchar").toggle("show");
		characters.forEach(function(char){
			char.detach();
			char.attach();
		});

		$("#newgame").toggle("hide");
	});

});