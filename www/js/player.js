var player = {
  "life": 100,
  "isReloading": false,
  "ammo": 6,
  "kills": 0
};

var sumLife = function(sum){
  player.life += sum;
  $("#player-health-info").html(player.life);
  $("#player-health-bar img").css("width", player.life + "%")

  
};