function (){
  var currentLevel = {
    number: 0,
    level: nextLevel()
  };

  var levels = {
    1: {
      text: "This is lvl1"
    },
    2: {
      text: "This is lvl2"
    },
    3: {
      text: "This is lvl3"
    },
    4: {
      text: "This is lvl4"
    },
    5: {
      text: "This is lvl5"
    }
  };

  var lvlNumToObj = function(num) {
    return levels[num];
  };

  var nextLevel = function() {
    currentLevel.number++;
    lvlNumToObj(currentLevel.number);
  };

  var play = function(){
    while (currentLevel.number <= 5){
      console.log(currentLevel.level.text);
      nextLevel();
    }
  };

  play();
}()
