

var i = 0;
var reloadSprites = [-400,-100,-100,-100,-100,-100,-100];
var shotSprites = [-100,-100,-100];


var shotAnimation = function(spriteI){
    if(spriteI == undefined) spriteI = 0;

    
    if(spriteI < shotSprites.length){
       setTimeout(function(){
          var currentY = $("#gun").css("background-position-y").replace("px","").replace("%","");
          $("#gun").css("background-position-y", (parseInt(currentY) + shotSprites[spriteI]) + "%");
          i++;
         shotAnimation(++spriteI);
        }, 100);  
     }else{

        setTimeout(function(){

          $("#gun").css("background-position-y", "0px");
        }, 100);  
     }
  
};

var reload = function(spriteI){
    if(spriteI == undefined){
      spriteI = 0;
       playSound("reloading.ogg", 4);
       player.isReloading = true;
    }


    
    if(spriteI < reloadSprites.length){
       setTimeout(function(){
          var currentY = $("#gun").css("background-position-y").replace("px","").replace("%","");
          $("#gun").css("background-position-y", (parseInt(currentY) + reloadSprites[spriteI]) + "%");
          i++;
         reload(++spriteI);
        }, 200);  
     }else{

        setTimeout(function(){
        $("#reload-button-reloading").hide();
          $("#reload-button-reload").show();
        

          $("#gun").css("background-position-y", "0px");
          player.isReloading = false;
          player.ammo = 6;
        }, 200);  
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
  player.ammo -= 1;
  if(player.ammo < 0){
    $("#reload-button").click();
    return;
  }

  if(player.isReloading) return;

  playSound("shoot-1.ogg", 4);
  shotAnimation();



   var placeholder = characterPlaceholder[$(characterPlaceholderElement.currentTarget).attr("data-id")];
   //playsound
   var soundI = random(0, placeholder.character.hitSounds.length - 1);
   playSound(placeholder.character.hitSounds[soundI], 1);

    $(".blood[data-id=" + placeholder.id + "]").css("left", characterPlaceholderElement.clientX -50 + "px");
    $(".blood[data-id=" + placeholder.id + "]").css("top", characterPlaceholderElement.clientY - 50 + "px");
    $(".blood[data-id=" + placeholder.id + "]").show();
    clearTimeout(placeholder.currentTimeout);
    setTimeout(function(){
      $(".blood[data-id=" + placeholder.id + "]").hide();
      moveCharacter(placeholder);

    }, 500);
    
   
  if(placeholder.status == "will shoot"){
    $("#" + placeholder.name).css("background-position-x", placeholder.character.hitX + "px");
    player.kills += 1;
    console.log("kills: " + player.kills);



  }else if(placeholder.status == "shot"){
    message("already shot!");
  }else{
    message("bad!");

    $("#" + placeholder.name).css("background-position-x", placeholder.character.hitX + "px");
  }

});




  

