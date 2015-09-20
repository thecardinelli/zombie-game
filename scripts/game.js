'use strict';

var Player = function (x, y, world) {
	var _x = x;
	var _y = y;
	var _size = 5;
	var _speed = 15;

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
			if (parseInt(e.keyCode) === 37) {
				_x -= _speed;
			} else if (parseInt(e.keyCode) === 39) {
				_x += _speed;
			} else if (parseInt(e.keyCode) === 38) {
				_y -= _speed;
			} else if (parseInt(e.keyCode) === 40) {
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

var ZombieGame = function (canvasid) {
	var background = '#FFFFFF'
	var canvas = document.getElementById(canvasid);
	var context = canvas.getContext('2d');
	canvas.style.background = background;
	var world = {
		canvas: canvas,
		context: context
	};
	var player = new Player(0, 0, world);
};

var game = new ZombieGame('gamecanvas');