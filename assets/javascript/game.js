$(document).ready( function () {

	function print(str){
		console.log(str);
	}


	var luke = {
		name: "luke",
		health_points: 100,
		attack_power: 5,
		counter_attack_power: 20,
		enemy: false,

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
		}
	}

	var obiwan = {
		name: "obiwan",
		health_points: 150,
		attack_power: 6,
		counter_attack_power: 15,
		enemy: false,

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
		}
	}

	var vader = {
		name: "vader",
		health_points: 200,
		attack_power: 4,
		counter_attack_power: 30,
		enemy: false,

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
		}
	}

	var maul = {
		name: "maul",
		health_points: 90,
		attack_power: 8,
		counter_attack_power: 10,
		enemy: false,

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
		}
	}

	//Move character tile
	function moveCharacter(char, destination){
		var characterTile = $("#"+char.name).detach();
		$("#"+destination).append(characterTile);
		
	}

	var characters = [luke, obiwan, vader, maul];

	//Print initial stats of each character
	characters.forEach(function(character){
		$('#'+character.name).find(".stats").html(
			"HP: " + character.health_points + "<br>" + 
			"Attack: " + character.attack_power + "<br>" +
			"Counter Attack: " + character.counter_attack_power);
	});

	//Variables to keep track of what step of the game we're on
	var hero = '';
	var defender = '';

	//Character is clicked on
	$(document).on('click', '.character', function(event){		
		var str_clicked = this.id;
		var clicked_char;
		var enemies = [];

		//If picking hero
		if(hero === ''){
			characters.forEach( function(character){
				if (character.name == str_clicked){
					clicked_char = character;
					moveCharacter(clicked_char, "your-character");	
					hero = clicked_char.name;

				}
				else {
					moveCharacter(character, "enemies-available");
					enemies.push(character);
				}
			});


		}

		//If picking defender
		else if (hero !== '' && defender === ''){
			characters.forEach( function(character){
				if(character.name === str_clicked){
					clicked_char = character;
					moveCharacter(clicked_char, "defender");
					defender = clicked_char.name;
				}
			});
			print("Moving to defender");
		}

		/*enemies.forEach( function (e){
			print(e.name);
		});*/

		
	});


});