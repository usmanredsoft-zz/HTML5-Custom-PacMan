<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=624, user-scalable=no">
		<meta name="description" content="Pacman Game">
		<meta name="author" content="">
		<title>Pacman</title>
		<!-- Styles -->
			<link rel="stylesheet" href="css/custom.css">
		<!-- Scripts -->
			<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
			<script src="js/jquery.touchSwipe.min.js"></script>
			<script src="js/game.js"></script>
	</head>
	
	<body>
		
		<img id="player" class="asset" src="img/player.png"/>
		<img id="enemy" class="asset" src="img/enemy.png"/>
		<img id="food" class="asset" src="img/food.png"/>
		<img id="sf1" class="asset" src="img/1.png"/>
		<img id="sf2" class="asset" src="img/2.png"/>
		<img id="sf3" class="asset" src="img/3.png"/>
		<img id="sf4" class="asset" src="img/4.png"/>
		<img id="sf5" class="asset" src="img/5.png"/>
		<img id="sf6" class="asset" src="img/6.png"/>
		<img id="sf7" class="asset" src="img/7.png"/>
		<img id="sf8" class="asset" src="img/8.png"/>
		
		<img id="rotate" class="asset" src="img/rotate.png"/>
		
		<div id="centered-block">
			
			<span id="level" class="upper-text">DATES 1/30</span>
			<span id="score" class="upper-text" style="float: right">HASSANAT x0</span><br>
			<img id="background" src="img/map.png"/>
			<canvas id="canvas" width="624" height="656"></canvas>
			<p id="level-notification"></p>
			<p id="start">Start</p>
			<p class="bottom-text">30 DAYS OF IFTAR</p>
		</div>
		
	</body>
	
</html>