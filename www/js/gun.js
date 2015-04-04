

var i = 0;
var reloadSprites = [-400,-100,-100,-100,-100,-100,-100];
var shotSprites = [-100,-100,-100];

var shootSound = "shoot-1.ogg";
var reloadingSound = "reloading.ogg";

var shootTime = 100;
var reloadingTime = 100;

var renderGun = function(gunId){
    if(gunId == "handgun"){
        $("#gun").css("background-image","url('img/sprite-handgun.png')");
    }else if(gunId = "shotgun"){
        $("#gun").css("background-image","url('img/sprite-shotgun.png')");
        $("#gun").css("width","140px");
        $("#gun").css("height","150px");

        shotSprites = [-150,-300,-150];
        reloadSprites = [-450,-600,-750,-750,-600,-450];
        reloadingSound = "reloading-2.ogg";
        shootSound = "shoot-3.ogg";
        shootTime = 50;
        reloadingTime = 80;
    }
};

renderGun("shotgun");


var shotAnimation = function(spriteI){
    if(spriteI == undefined) spriteI = 0;

    
    if(spriteI < shotSprites.length){
       setTimeout(function(){
          //var currentY = $("#gun").css("background-position-y").replace("px","").replace("%","");
          $("#gun").css("background-position-y", shotSprites[spriteI] + "px");
          i++;
         shotAnimation(++spriteI);
        }, shootTime);  
     }else{

        setTimeout(function(){

          $("#gun").css("background-position-y", "0px");
        }, shootTime);  
     }
  
};

var reload = function(spriteI){
    if(spriteI == undefined){
      spriteI = 0;
       playSound(reloadingSound , 4);
       player.isReloading = true;
    }


    
    if(spriteI < reloadSprites.length){
       setTimeout(function(){
         
          $("#gun").css("background-position-y",reloadSprites[spriteI] + "px");
          i++;
         reload(++spriteI);
        }, reloadingTime);  
     }else{

        setTimeout(function(){
        $("#reload-button-reloading").hide();
          $("#reload-button-reload").show();
        

          $("#gun").css("background-position-y", "0px");
          player.isReloading = false;
          player.ammo = 6;
        }, reloadingTime);  
     }
};

//reload
$("#reload-button").click(function(){
  if(!player.isReloading){
    $("#reload-button-reloading").show();
    $("#reload-button-reload").hide();

    reload();
  }
  
});

//shoot
$(".character").click(function(characterPlaceholderElement){
  if(player.ammo < 0){
    $("#reload-button").click();
    return;
  }

  if(player.isReloading) return;
  player.ammo -= 1;
  playSound(shootSound  , 4);
  shotAnimation();

   var placeholder = characterPlaceholder[$(characterPlaceholderElement.currentTarget).attr("data-id")];
   //playsound
   var soundI = random(0, placeholder.character.hitSounds.length - 1);
   playSound(placeholder.character.hitSounds[soundI], 1);

    $(".blood[data-id=" + placeholder.id + "]").css("left", characterPlaceholderElement.clientX -50 + "px");
    $(".blood[data-id=" + placeholder.id + "]").css("top", characterPlaceholderElement.clientY - 50 + "px");
    $(".blood[data-id=" + placeholder.id + "]").show();
    setTimeout(function(){
      $(".blood[data-id=" + placeholder.id + "]").hide();
    }, 500);

  if(placeholder.status == "will shoot"){
    placeholder.hp -= 1;

    console.log(placeholder.hp);

    if(placeholder.hp <= 0){
      $("#" + placeholder.name).css("background-position-x", placeholder.character.hitX + "px");
      clearTimeout(placeholder.currentTimeout);

      moveCharacter(placeholder, true);
      
      player.kills += 1;
      console.log("kills: " + player.kills);
    }else{
      //keep stand up
      clearTimeout(placeholder.currentTimeout);
      setCharacterToShoot(placeholder);
    }

  }else if(placeholder.status == "shot"){
    message("already shot!");
  }else{
    message("bad!");
    
    clearTimeout(placeholder.currentTimeout);
    moveCharacter(placeholder, true);
  }

});





  

