/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	levels = __webpack_require__(1);

	$(document).ready(function() {
	  (function() {
	      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	      window.requestAnimationFrame = requestAnimationFrame;
	  })();

	  var lvlNumToObj = function(num) {
	    return levels[num];
	  };

	  var canvas = document.getElementById("canvas"),
	      ctx = canvas.getContext("2d"),
	      width = 700,
	      height = 600,
	      game = {
	        retries: 0,
	        playing: false,
	        over: false
	      },
	      currentLevel = {
	        won: false,
	        number: 1
	      };
	      currentLevel.level = lvlNumToObj(currentLevel.number);
	    var  player = {
	        x : currentLevel.level.startX,
	        y : currentLevel.level.startY,
	        width : 50,
	        height : 50,
	        radius: 30,
	        speed: 2.8,
	        velX: 0,
	        velY: 0,
	        pauseVelX: null,
	        pauseVelY: null,
	        paused: false
	      },
	      keys = [],
	      obstacles = [],
	      pauseHeld = false,
	      friction = 0.8,
	      gravity = 0.5;

	  canvas.width = width;
	  canvas.height = height;

	  var nextLevel = function() {
	    currentLevel.number++;
	  };

	  function update(){
	    if (game.playing){
	    // check keys
	      if (keys[38]) {
	          // up arrow
	         player.velY = -player.speed*2;
	      }
	      if (keys[39]) {
	          // right arrow
	          if (player.velX < player.speed) {
	              player.velX++;
	          }
	      }
	      if (keys[37]) {
	          // left arrow
	          if (player.velX > -player.speed) {
	              player.velX--;
	          }
	      }
	      if (keys[32] && !pauseHeld) {
	          // space
	          pauseHeld = true;
	          if (player.paused) {
	            player.velX = player.pauseVelX;
	            player.velY = player.pauseVelY;
	          } else {
	            player.pauseVelX = player.velX;
	            player.pauseVelY = player.velY;
	          };
	          player.paused = !player.paused;
	      }

	      if (player.paused || game.over) {
	        player.velX = 0;
	        player.velY = 0;
	      } else {
	        player.velX *= friction;
	        player.velY += gravity;

	        player.x += player.velX;
	        player.y += player.velY;
	      }


	      if (player.x >= width-player.radius) {
	          player.y = currentLevel.level.startY;
	          player.x = currentLevel.level.startX;
	          player.velX = 0;
	          player.velY = 0;
	          game.retries++;
	      } else if (player.x <= player.radius) {
	          player.y = currentLevel.level.startY;
	          player.x = currentLevel.level.startX;
	          player.velX = 0;
	          player.velY = 0;
	          game.retries++;
	      }

	      if(player.y >= height-player.radius){
	          player.y = currentLevel.level.startY;
	          player.x = currentLevel.level.startX;
	          player.velX = 0;
	          player.velY = 0;
	          game.retries++;
	      } else if (player.y <= player.radius) {
	          player.y = currentLevel.level.startY;
	          player.x = currentLevel.level.startX;
	          player.velX = 0;
	          player.velY = 0;
	          game.retries++;
	      };

	    if(player.x <= currentLevel.level.goalX + 40 && player.x >= currentLevel.level.goalX - 40 && player.y <= currentLevel.level.goalY + 40 && player.y >= currentLevel.level.goalY - 40){
	          player.y = player.y;
	          player.x = player.x;
	          currentLevel.won = true;
	      };


	    if (player.paused) {
	      ctx.font = "50px Ubuntu";
	      ctx.fillStyle = "white";
	      ctx.textAlign = "center";
	      ctx.fillText("Paused", width/2, height/2);
	    } else {
	      ctx.clearRect(0,0,width,height);

	      /* Goal */
	      var grd = ctx.createRadialGradient(currentLevel.level.goalX, currentLevel.level.goalY, 40, currentLevel.level.goalX, currentLevel.level.goalY, 30);
	      // white
	      grd.addColorStop(0, '#ffffff');
	      // black
	      grd.addColorStop(1, '#000000');

	      ctx.beginPath();
	      ctx.arc(currentLevel.level.goalX, currentLevel.level.goalY, 40, 0, Math.PI*2, false);
	      ctx.fillStyle = grd;
	      ctx.fill();
	      ctx.closePath();

	      ctx.fillStyle = "white";
	      ctx.font = "20px Ubuntu";
	      ctx.fillText("Retries: " + game.retries, 630, 50);
	      ctx.fillText("Level: " + currentLevel.number, 630, 80);


	    if (currentLevel.level.obstacles.length > 0) {
	      currentLevel.level.obstacles.forEach(function(obstacle) {
	        grd=ctx.createLinearGradient(obstacle.x,obstacle.y,obstacle.x + obstacle.width, obstacle.y + obstacle.height);
	        grd.addColorStop(0, '#FF0000');
	        grd.addColorStop(1,"#C40E0E");

	        ctx.fillStyle = grd;
	        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
	        if (player.x + player.radius >= obstacle.x && player.x - player.radius <= obstacle.x + obstacle.width
	          && player.y + player.radius >= obstacle.y && player.y - player.radius <= obstacle.y + obstacle.height) {
	            player.y = currentLevel.level.startY;
	            player.x = currentLevel.level.startX;
	            player.velX = 0;
	            player.velY = 0;
	            game.retries++;
	          }
	        });
	      };

	    if (currentLevel.level.switches.length > 0) {
	      currentLevel.level.switches.forEach(function(button) {
	        ctx.beginPath();
	        if (!button.on) {
	          ctx.arc(button.switchX, button.switchY, 25, 0, Math.PI*2, false);
	          ctx.fillStyle = "yellow";
	          ctx.fill();
	          ctx.closePath();

	          ctx.fillRect(button.gateX, button.gateY, button.gateWidth, button.gateHeight);
	          if (player.x + player.radius >= button.gateX && player.x - player.radius <= button.gateX + button.gateWidth
	            && player.y + player.radius >= button.gateY && player.y - player.radius <= button.gateY + button.gateHeight) {
	              player.y = currentLevel.level.startY;
	              player.x = currentLevel.level.startX;
	              player.velX = 0;
	              player.velY = 0;
	              game.retries++;
	            }

	        } else {
	          ctx.arc(button.switchX, button.switchY, 25, 0, Math.PI*2, false);
	          ctx.fillStyle = "lightgreen";
	          ctx.fill();
	          ctx.closePath();
	        };
	        if (player.x <= button.switchX + 25 && player.x >= button.switchX - 25
	          && player.y <= button.switchY + 25 && player.y >= button.switchY - 25) {
	            if (!button.on) {button.on = true};
	          }
	        });
	      };
	    }

	    // create radial gradient
	    grd = ctx.createRadialGradient(player.x, player.y, player.radius, player.x, player.y, player.radius - 20);
	    // light blue
	    grd.addColorStop(0, '#1aa3ff');
	    // dark blue
	    grd.addColorStop(1, '#004CB3');

	    ctx.beginPath();
	    ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2, false);
	    ctx.fillStyle = grd;
	    ctx.fill();
	    ctx.closePath();

	      if (game.over) {
	        ctx.font = "50px Ubuntu";
	        ctx.fillStyle = "white";
	        ctx.textAlign = "center";
	        ctx.fillText("Thanks for Playing!", width/2, 100);
	      }
	      else if (!currentLevel.won) {
	        requestAnimationFrame(update);
	      } else {
	      if (levels[currentLevel.number + 1]){
	        currentLevel.number++;
	        currentLevel.level = lvlNumToObj(currentLevel.number);
	        player.y = currentLevel.level.startY;
	        player.x = currentLevel.level.startX;
	        player.velX = 0;
	        player.velY = 0;
	        currentLevel.won = false;
	      } else {
	        game.over = true;
	      };
	      requestAnimationFrame(update);
	    }
	  } else {
	    ctx.clearRect(0,0,width,height);
	    ctx.font = "50px Ubuntu";
	    ctx.fillStyle = "white";
	    ctx.textAlign = "center";
	    ctx.fillText("GravityBall", width/2, 100);
	    ctx.font = "25px Ubuntu";
	    ctx.fillText("Use the arrow keys to direct the blue ball into", width/2, 200);
	    ctx.fillText("the black hole, while avoiding red blocks!", width/2, 250);
	    ctx.fillText("Press any key to begin!", width/2, 400);
	    requestAnimationFrame(update);
	  }
	  };

	  document.body.addEventListener("keydown", function(e) {
	      e.preventDefault();
	      keys[e.keyCode] = true;
	      if (!game.playing) {
	        game.playing = true;
	      }
	  });

	  document.body.addEventListener("keyup", function(e) {
	      keys[e.keyCode] = false;
	      pauseHeld = false;
	  });


	  window.addEventListener("load",function(){
	      update();
	  });

	});


/***/ },
/* 1 */
/***/ function(module, exports) {

	var dummy = {
	  1: {
	    startX: 80,
	    startY: 80,
	    goalX: 400,
	    goalY: 400,
	    obstacles: [],
	    switches: []
	  }
	};

	var levels = {
	  1: {
	    startX: 80,
	    startY: 80,
	    goalX: 400,
	    goalY: 400,
	    obstacles: [],
	    switches: []
	  },
	  2: {
	    startX: 80,
	    startY: 80,
	    goalX: 250,
	    goalY: 250,
	    obstacles: [],
	    switches: []
	  },
	  3: {
	    startX: 80,
	    startY: 80,
	    goalX: 500,
	    goalY: 50,
	    obstacles: [{x: 250, y: 0, width: 20, height: 300}],
	    switches: []
	  },
	  4: {
	    startX: 80,
	    startY: 80,
	    goalX: 500,
	    goalY: 500,
	    obstacles: [{x: 350, y: 300, width: 20, height: 300}, {x: 150, y: 0, width: 20, height: 300}],
	    switches: []
	  },
	  5: {
	    startX: 80,
	    startY: 80,
	    goalX: 530,
	    goalY: 530,
	    obstacles: [{x: 0, y: 180, width: 400, height: 20}, {x: 300, y: 380, width: 400, height: 20}],
	    switches: []
	  },
	  6: {
	    startX: 80,
	    startY: 520,
	    goalX: 650,
	    goalY: 150,
	    obstacles: [{x: 150, y: 0, width: 20, height: 350},
	                {x: 150, y: 500, width: 20, height: 170},
	                {x: 350, y: 0, width: 20, height: 100},
	                {x: 350, y: 250, width: 20, height: 350},
	                {x: 550, y: 0, width: 20, height: 450},
	              ],
	    switches: []
	  },
	  7: {
	    startX: 80,
	    startY: 520,
	    goalX: 640,
	    goalY: 550,
	    obstacles: [{x: 550, y: 480, width: 20, height: 120}],
	    switches: [{on: false, switchX: 250, switchY: 250, gateX: 570, gateY: 480, gateWidth: 130, gateHeight: 20}]
	  },
	  8: {
	    startX: 600,
	    startY: 500,
	    goalX: 350,
	    goalY: 250,
	    obstacles: [{x: 285, y: 180, width: 20, height: 130},
	                {x: 395, y: 180, width: 20, height: 130},
	                {x: 285, y: 300, width: 130, height: 20},
	                {x: 340, y: 300, width: 20, height: 300}
	                ],
	    switches: [{on: false, switchX: 200, switchY: 500, gateX: 285, gateY: 180, gateWidth: 130, gateHeight: 20}]
	  }
	};

	module.exports = levels;


/***/ }
/******/ ]);