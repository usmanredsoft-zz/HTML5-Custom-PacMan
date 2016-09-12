$(function(){
	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	
	var map = [
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1],
	[1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1],
	[1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1],
	[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
	[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
	];
	
	var monster_list = [0, 0, 0, 0];
	
	var x = 32 + 16;
	var y = 32 + 16;
	var tilex = 1;
	var tiley = 1;
	
	var player_speed = 4.0;
	var distance = 32;
	
	var current_key = 0;
	var current_dir = 3;
	var next_dir = 3;
	
	var score = 0;
	var level = 1;
	
	var current_player_animation = 0;
	
	var player_animation_ticks = 0;
	
	var monster_speed = 1.0;
	
	var sound_food = null;

	var food_amount = 0;
	
	var pause = true;
	//----------------------------------------------------------------------------------------------------------------
	
	$(window).resize(function(){
		resizeGame();
	});
	
	$(window).keydown(function(event){
		current_key = event.which;
	});
	
	function isMobile()
	{
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) return true;
		return false;
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function game()
	{
		draw();
		if (!pause) process();
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function draw()
	{
		ctx.clearRect(0, 0, c.width, c.height);
		
		// draw foods
		for (yy = 1; yy <= 20; yy ++)
			for (xx = 1; xx <= 19; xx ++)
				if (map[yy][xx] == 2)
					ctx.drawImage(food, xx * 32 - 13, yy * 32 - 13);
				else if (map[yy][xx] > 2)
					ctx.drawImage(document.getElementById("sf" + String(map[yy][xx] - 2)), xx * 32 - 24, yy * 32 - 24);
					
		// draw player
		ctx.drawImage(player, current_player_animation * 32, (3 - current_dir) * 32, 32, 32, x - 40, y - 40, 32, 32);
		
		// draw monsters
		for (i = 0; i < 4; i ++)
		{
			ctx.drawImage(enemy, monster_list[i].current_animation * 32, monster_list[i].dir * 32, 32, 32, monster_list[i].x - 40, monster_list[i].y - 40, 32, 32);
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function process()
	{
		processKeys();
		processPlayer();
		processMonsters();
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function processKeys()
	{
		if (current_key == 38) next_dir = 0;
		if (current_key == 40) next_dir = 1;
		if (current_key == 37) next_dir = 2;
		if (current_key == 39) next_dir = 3;
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function processPlayer()
	{
		processAnimation();
		processMovement();
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function processAnimation()
	{
		player_animation_ticks ++;
		if (player_animation_ticks == 3)
		{
			player_animation_ticks = 0;
			current_player_animation += 1;
			if (current_player_animation > 2) current_player_animation = 0;
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function processMovement()
	{
		if ( (current_dir == 0 && next_dir == 1) || (current_dir == 1 && next_dir == 0) || (current_dir == 2 && next_dir == 3) || (current_dir == 3 && next_dir == 2)) 
		{
			current_dir = next_dir;
			if (current_dir == 0) distance = (y - 16) - posToTile(y - 16) * 32;
			if (current_dir == 1) distance = posToTile(y + 16) * 32 + 32 - (y + 16);
			
			if (current_dir == 2) distance = (x - 16) - posToTile(x - 16) * 32;
			if (current_dir == 3) distance = posToTile(x + 16) * 32 + 32 - (x + 16);
		}
		
		if (current_dir == 0) moveUp();
		if (current_dir == 1) moveDown();
		if (current_dir == 2) moveLeft();
		if (current_dir == 3) moveRight();
		
		if (playerChangedTile())
			checkFoodCollision();
		
		if (distance <= 0)
		{
			distance += 32;
			tryToChangeDir();
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function playerChangedTile()
	{
		var old_tilex = tilex;
		var old_tiley = tiley;
		
		tilex = posToTile(x);
		tiley = posToTile(y);
		
		if ((tilex != old_tilex) || (tiley != old_tiley))
			return true;
		else
			return false;
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function checkFoodCollision()
	{
		if ( map[tiley][tilex] == 2 )
		{
			food_amount --;
			map[tiley][tilex] = 0;
			score += 1;
			updateScore();
			//sound_food.play();
			if (food_amount == 0)
				levelUp();
		} else if (map[tiley][tilex] > 2)
		{
			food_amount --;
			score += 100;
			updateScore();
			if (food_amount == 0)
				levelUp();
			else
			{
				var ft = map[tiley][tilex];
				var fn = "";
				if (ft == 3) fn = "SAMOSA!";
				else if (ft == 4) fn = "FALUDA!";
				else if (ft == 5) fn = "WATERMELON!";
				else if (ft == 6) fn = "RICE!";
				else if (ft == 7) fn = "WARAKENAB!";
				else if (ft == 8) fn = "KANAFEH!";
				else if (ft == 9) fn = "MILK!";
				else if (ft == 10) fn = "DATES!";
				
				$("#level-notification").html(fn + " 100 points!");
				
				$("#level-notification").stop(false, true);
				$("#level-notification").show();
				$("#level-notification").fadeOut(2100);
			}
			map[tiley][tilex] = 0;
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function tryToChangeDir()
	{
		if (current_dir == next_dir)
			return false;
		
		if ( (next_dir == 0 && walkablePos(x, y - player_speed - 16)) ||
			 (next_dir == 1 && walkablePos(x, y + player_speed + 16)) ||
			 (next_dir == 2 && walkablePos(x - player_speed - 16, y)) ||
			 (next_dir == 3 && walkablePos(x + player_speed + 16, y)))
		{
			current_dir = next_dir;
			return true;
		}
		
		return false;
	}

	//----------------------------------------------------------------------------------------------------------------
	
	function posToTile(pos)
	{
		return (Math.floor(pos / 32));
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	// MOVEMENT
	function moveUp()
	{
		if ( walkablePos(x, y - player_speed - 16) )
		{
			y -= player_speed;
			distance -= player_speed;
		}
		else
		{
			y = Math.floor(y / 32) * 32 + 16;
			distance = 0;
		}
	}
	
	function moveDown()
	{
		if ( walkablePos(x, y + player_speed + 16) )
		{
			y += player_speed;
			distance -= player_speed;
		}
		else
		{
			y = Math.floor(y / 32) * 32 + 16;
			distance = 0;
		}
	}
	
	function moveLeft()
	{
		if ( walkablePos(x - player_speed - 16, y) )
		{
			x -= player_speed;
			distance -= player_speed;
		}
		else
		{
			x = Math.floor(x / 32) * 32 + 16;
			distance = 0;
		}
	}
	
	function moveRight()
	{
		if ( walkablePos(x + player_speed + 16, y) )
		{
			x += player_speed;
			distance -= player_speed;
		}
		else
		{
			x = Math.floor(x / 32) * 32 + 16;
			distance = 0;
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function walkablePos(x, y)
	{
		var tx = Math.floor(x / 32);
		var ty = Math.floor(y / 32);
		if (map[ty][tx] == 1)
			return false;
		else
			return true;
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function spawnFood()
	{
		for (yy = 1; yy <= 20; yy ++)
			for (xx = 1; xx <= 19; xx ++)
				if (map[yy][xx] == 0)
				{
					map[yy][xx] = 2;
					food_amount ++;
				}
				
		map[1][1] = 0;
		
		map[16][3] = 0;
		map[3][15] = 0;
		map[3][16] = 0;
		map[3][17] = 0;
		
		map[4][15] = 0;
		map[4][16] = 0;
		map[4][17] = 0;
		
		map[8][17] = 0;
		
		food_amount -= 9;
	}
	
	function spawnSpecialFood()
	{
		for (i = 0; i < 8; i ++)
		{
			var x_pos = 0;
			var y_pos = 0;
			
			do
			{
				var okay = true;
				
				var x_pos = Math.floor( Math.random() * 19 + 1 );
				var y_pos = Math.floor( Math.random() * 17 + 4 );
				
				if ( map[y_pos][x_pos] != 0 ) okay = false;
				else if (y_pos == 1 && x_pos == 1) okay = false;
				else if (y_pos == 16 && x_pos == 3) okay = false;
				else if (y_pos == 3 && x_pos == 15) okay = false;
				else if (y_pos == 3 && x_pos == 16) okay = false;
				else if (y_pos == 3 && x_pos == 17) okay = false;
				else if (y_pos == 4 && x_pos == 15) okay = false;
				else if (y_pos == 4 && x_pos == 16) okay = false;
				else if (y_pos == 4 && x_pos == 17) okay = false;
				else if (y_pos == 8 && x_pos == 17) okay = false;
			} while (okay != true);
			
			map[y_pos][x_pos] = i + 3;
			food_amount ++;
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	//-------------------------------------- MONSTERS
	
	function processMonsters()
	{
		processMonstersMovement();
		checkPlayerCollisions();
		processMonstersAnimations();
	}
	
	function processMonstersMovement()
	{
		for (i = 0; i < 4; i ++)
		{
			if (monster_list[i].dir == 0)
			{
				monster_list[i].y -= monster_speed;
				monster_list[i].distance -= monster_speed;
			}
			
			if (monster_list[i].dir == 1)
			{
				monster_list[i].y += monster_speed;
				monster_list[i].distance -= monster_speed;
			}
			
			if (monster_list[i].dir == 2)
			{
				monster_list[i].x -= monster_speed;
				monster_list[i].distance -= monster_speed;
			}
			
			if (monster_list[i].dir == 3)
			{
				monster_list[i].x += monster_speed;
				monster_list[i].distance -= monster_speed;
			}
			
			if (monster_list[i].distance <= 0)
			{
				monster_list[i].distance = 32;
				
				monster_list[i].x = Math.floor(monster_list[i].x / 32) * 32 + 16;
				monster_list[i].y = Math.floor(monster_list[i].y / 32) * 32 + 16;
				
				//try to change direction
				
				var available_directions = [];
				
				if ( walkablePos(monster_list[i].x, monster_list[i].y - monster_speed - 16) && monster_list[i].dir != 1) available_directions.push(0);
				if ( walkablePos(monster_list[i].x, monster_list[i].y +  monster_speed + 16) && monster_list[i].dir != 0) available_directions.push(1);
				if ( walkablePos(monster_list[i].x -  monster_speed - 16, monster_list[i].y) && monster_list[i].dir != 3) available_directions.push(2);
				if ( walkablePos(monster_list[i].x + monster_speed + 16, monster_list[i].y) && monster_list[i].dir != 2) available_directions.push(3);
				
				

				if (available_directions.length != 0)
					monster_list[i].dir = available_directions[ Math.floor(Math.random() * available_directions.length) ];
				else
				{
					if (monster_list[i].dir == 0) monster_list[i].dir = 1;
					else if (monster_list[i].dir == 1) monster_list[i].dir = 0;
					else if (monster_list[i].dir == 2) monster_list[i].dir = 3;
					else if (monster_list[i].dir == 3) monster_list[i].dir = 2;
				}
				
			}
		}
	}
	
	function processMonstersAnimations()
	{
		for (i = 0; i < 4; i ++)
		{
			monster_list[i].animation_ticks ++;
			if (monster_list[i].animation_ticks == 3)
			{
				monster_list[i].animation_ticks = 0;
				monster_list[i].current_animation ++;
				if (monster_list[i].current_animation == 4)
					monster_list[i].current_animation = 0;
				
			}
		}
	}
	
	function checkPlayerCollisions()
	{
		for (i = 0; i < 4; i ++)
		{
			if ( Math.sqrt( Math.pow(monster_list[i].x - x, 2) + Math.pow(monster_list[i].y - y, 2) ) < 28.0)
				die();
		}
	}
	
	function monster(m_x, m_y, m_dir) // constructor
	{
		this.tilex = m_x;
		this.tiley = m_y;
		this.x = m_x * 32 + 16;
		this.y = m_y * 32 + 16;
		this.dir = m_dir;
		this.current_animation = 0;
		this.animation_ticks = 0;
		this.distance = 32;
	}
	
	function spawnMonsters()
	{
		monster_list[0] = new monster(9, 2, 1);
		monster_list[1] = new monster(1, 5, 1);
		monster_list[2] = new monster(1, 20, 3);
		monster_list[3] = new monster(19, 10, 0);
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	
	function updateScore()
	{
		$("#score").html("HASSANAT x" + score);
		$("#level").html("DATES " + level + "/30");
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function resizeGame()
	{
		var window_width = $(window).width();
		var window_height = $(window).height();
		
		var camvas_width = c.style.width;
		var camvas_height = c.style.height;
		
		if (isMobile())
		{
			if (window.innerHeight > window.innerWidth)
			{
				$("body").css("background-color", "rgb(41, 41, 41)");
				$("#rotate").hide();
				$("#centered-block").stop().show();
				// portrait view
			} else
			{
				//landscape view - notification needed, game works only on portrait
				$("#centered-block").hide();
				$("#rotate").css("height", window_height);
				$("#rotate").css("position", "absolute");
				$("#rotate").css("left", window_width / 2 - 160);
				$("body").css("background-color", "black");
				$("#rotate").stop().show();
			}
		} else
		{
			// computer
			
		}
	}
	
	//----------------------------------------------------------------------------------------------------------------
	
	function clearMap()
	{
		for (yy = 1; yy <= 20; yy ++)
			for (xx = 1; xx <= 19; xx ++)
				if (map[yy][xx] != 1)
					map[yy][xx] = 0;
	}
	
	function initAll()
	{
		resizeGame();
		startLevel(level);
		setInterval(game, 20);
	}
	
	function levelUp()
	{
		if (level < 30)
		{
			level++;
			startLevel(level);
			updateScore();
			
			$("#level-notification").html("Well done! " + String(30 - level + 1) + " to go");
			$("#level-notification").stop(false, true);
			$("#level-notification").show();
			$("#level-notification").fadeOut(4000);
		} else
		{
			$("#level-notification").html("Wonderful! You've completed all 30 days!");
			$("#level-notification").stop(false, true);
			$("#level-notification").show();
		}
	}
	
	function die()
	{
		pause = true;
		$("#level-notification").html("Daylight strikes! <span style='color: red'>Try again</span>");
		$("#level-notification").stop(false, true).show();
		
		
	}
	
	$("#level-notification").click(function(){
		if (pause)
		{
			$(this).stop(false, true).fadeOut(300);
			level = 1;
			score = 0;
			startLevel(level);
			updateScore();
			pause = false;
			
		}
	});
	
	function startLevel(lvl)
	{
		x = 32 + 16;
		y = 32 + 16;
		tilex = 1;
		tiley = 1;
		distance = 32;
		current_dir = 3;
		next_dir = 3;
		
		food_amount = 0;
		
		clearMap();
		for (i = 0; i < 4; i ++)
		{
			delete monster_list[i];
		}
		spawnSpecialFood();
		spawnFood();
		spawnMonsters();
		
		monster_speed = 1.0 + level * 0.12;
	}
	
	 $(document).swipe( {
        //Generic swipe handler for all directions
        swipe:function(event, direction, dist, duration, fingerCount, fingerData) {
			if (direction == "up") next_dir = 0;
			if (direction == "down") next_dir = 1;
			if (direction == "left") next_dir = 2;
			if (direction == "right") next_dir = 3;
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:30
      });
	
	//----------------------------------------------------------------------------------------------------------------

	initAll();
	
	$("#start").click(function(){
		pause = false;
		sound_food = new Audio("sfx/dot.mp3");
		// make sound volume 0 and then to max
		//sound_food.play();
		//setInterval(function(){  sound_food.currentTime = 0.1; sound_food.play();  }, 1000);
		$(this).hide();
	});
	
	
});