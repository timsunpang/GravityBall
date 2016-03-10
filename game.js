$(document).ready(function() {
  (function() {
      var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
  })();

  function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var canvas = document.getElementById("canvas"),
      ctx = canvas.getContext("2d"),
      width = 600,
      height = 600,
      game = {
        lives: 5,
        playing: false
      },
      level = {
        won: false,
        number: 1
      },
      player = {
        x : 80,
        y : 80,
        width : 50,
        height : 50,
        radius: 30,
        speed: 3,
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

      if (player.paused) {
        player.velX = 0;
        player.velY = 0;
        ctx.font = "50px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("Paused", width/2, height/2);
      } else {
        player.velX *= friction;
        player.velY += gravity;

        player.x += player.velX;
        player.y += player.velY;
      }


      if (player.x >= width-player.radius) {
          player.y = 80;
          player.x = 80;
          player.velX = 0;
          player.velY = 0;
          game.lives--;
      } else if (player.x <= player.radius) {
          player.y = 80;
          player.x = 80;
          player.velX = 0;
          player.velY = 0;
          game.lives--;
      }

      if(player.y >= height-player.radius){
          player.y = 80;
          player.x = 80;
          player.velX = 0;
          player.velY = 0;
          game.lives--;
      } else if (player.y <= player.radius) {
          player.y = 80;
          player.x = 80;
          player.velX = 0;
          player.velY = 0;
          game.lives--;
      };

    if(player.x <= 540 && player.x >= 460 && player.y <= 540 && player.y >= 460){
          player.y = player.y;
          player.x = player.x;
          level.won = true;
      };


    if (player.paused) {
      ctx.font = "50px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Paused", width/2, height/2);
    } else {
      ctx.clearRect(0,0,width,height);

      /* Goal */
      ctx.beginPath();
      ctx.arc(canvas.width - 100, canvas.height - 100, 40, 0, Math.PI*2, false);
      ctx.fillStyle = "black";
      ctx.fill();
      ctx.closePath();


      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, Math.PI*2, false);
      ctx.fillStyle = "blue";
      ctx.fill();
      ctx.closePath();

      ctx.fillStyle = "black";
      ctx.font = "25px Arial";
      ctx.fillText("Lives: " + game.lives, 450, 50);
      ctx.fillText("Level: " + level.number, 450, 80);

      obstacles.forEach(function(obstacle) {
        ctx.fillStyle = "red";
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        if (player.x + player.radius >= obstacle.x && player.x - player.radius <= obstacle.x + obstacle.width
            && player.y + player.radius >= obstacle.y && player.y - player.radius <= obstacle.y + obstacle.height) {
            player.y = 80;
            player.x = 80;
            player.velX = 0;
            player.velY = 0;
            game.lives--;
        }
      });
    };

    if (game.lives === 0) {
      player.velX = 0;
      player.velY = 0;
      ctx.font = "50px Arial";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", width/2, height/2);
    } else if (!level.won) {
      requestAnimationFrame(update);
    } else {
      level.number++;
      player.y = 80;
      player.x = 80;
      player.velX = 0;
      player.velY = 0;
      level.won = false;
      obstacles.push({x: getRandomIntInclusive(150, 450), y: getRandomIntInclusive(150, 450), width: getRandomIntInclusive(20, 50), height: getRandomIntInclusive(20, 50)})
      requestAnimationFrame(update);
    }
  } else {
    ctx.font = "50px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Gravity Ball", width/2, 100);
    ctx.font = "25px Arial";
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
