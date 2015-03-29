var playSound = function(soundName){
  var s = new Audio("sound/" + soundName);
  s.load();
  s.play();
};

var random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};