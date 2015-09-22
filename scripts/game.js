'use strict';

var Player = function (x, y, world) {
	var _x = x;
	var _y = y;
	var _size = 5;
	var _speed = 10; 

	var draw = function () {
		world.context.beginPath();
		world.context.fillStyle = '#000000';
		world.context.arc(_x, _y, _size, 0, 2 * Math.PI);
		world.context.fill();
		world.context.closePath();
	};

	var erase = function () {
		world.context.beginPath();
		world.context.fillStyle = '#FFFFFF';
		world.context.arc(_x, _y, _size + 1, 0, 2 * Math.PI);
		world.context.fill();
		world.context.closePath();
	}

	var setupEvents = function () {
		document.onkeydown = function (e) {
			e = e || window.event;
			if ([37, 38, 39, 40].indexOf(parseInt(e.keyCode)) !== -1) {
				erase();
			}
			if (parseInt(e.keyCode) === 37 && _x-_speed >= 0) {
				_x -= _speed;
			} else if (parseInt(e.keyCode) === 39 && _x+_speed <= world.canvas.width) {	
				_x += _speed;
			} else if (parseInt(e.keyCode) === 38 && _y-_speed >= 0) {
				_y -= _speed;
			} else if (parseInt(e.keyCode) === 40 && _y+_speed <= world.canvas.height) {
				_y += _speed;
			}
			draw();
		};
	};
	
	draw();
	setupEvents();

	return {
		// an API to interact with the player instance
	};
};

var Zombie = function (x, y, world) {
	var _x = x;
	var _y = y;
	var _size = 5;
	var _speed = 10; 
	var _activity = 10; //How often the zombie doesn't move. Must be at least 3.
	var _move_speed = 100; //How often in milliseconds the zombie moves

	var draw = function () {
		world.context.beginPath();
		world.context.fillStyle = 'red';
		world.context.arc(_x, _y, _size, 0, 2 * Math.PI);
		world.context.fill();
		world.context.closePath();
	};

	var erase = function () {
		world.context.beginPath();
		world.context.fillStyle = '#FFFFFF';
		world.context.arc(_x, _y, _size + 1, 0, 2 * Math.PI);
		world.context.fill();
		world.context.closePath();
	};

	var move = function () {
		erase();
		var rand = Math.floor(Math.random() * _activity);
		if(rand == 0 && (_x+_size)-_speed > 0){
			_x -= _speed;
		}else if(rand == 1 && (_x+_size)+_speed < parseInt(world.canvas.width)) {
			_x += _speed;
		}else if(rand == 2 && (_y+_size)-_speed > 0){
			_y -= _speed;
		}else if(rand == 3 && (_y+_size)+_speed < parseInt(world.canvas.height)) {
			_y += _speed;
		}
		draw();
	};
	
	draw();
	setInterval(function () {
		move();
	}, _move_speed);
	
};

var ZombieGame = function (canvasid) {
	var properties = {
		background: '#FFFFFF',
		width: 500,
		height: 500
	};
	var canvas = document.getElementById(canvasid);
	var context = canvas.getContext('2d');
	canvas.style.background = properties.background;
	canvas.setAttribute('width', properties.width);
	canvas.setAttribute('height', properties.height);
	var world = {
		canvas: canvas,
		context: context
	};
	var addZombies = function (number) {
		var zom = [];
		for (var i = 0; i < number; i++) { 
			var z = new Zombie(Math.floor((Math.random() * canvas.width) + 50), Math.floor((Math.random() * canvas.height) + 50), world)
			zom.push("a");
		}
		return zom;
	}
	
	var player = new Player(5, 5, world);
	var zombies = addZombies(12);
	
};

var game = new ZombieGame('gamecanvas');