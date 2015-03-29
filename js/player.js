var player = {
  "life": 100,
};

var sumLife = function(sum){
  player.life += sum;
  $("#player-life").html(player.life);
  $("#player-health-bar-fill").css("width", player.life + "%")
};