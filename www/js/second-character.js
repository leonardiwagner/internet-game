var characters = [];

var addCharacter = function(name, x, sound){
  characters.push({
    "name": name,
    "x": x + 15,
    "sound": sound
  });
};

addCharacter("errou", 0,"secondary-character-errou.ogg");
addCharacter("queloucura", 200,"secondary-character-queloucura.ogg");
addCharacter("secondary-character-caraio.ogg", 400,"secondary-character-caraio.ogg");
addCharacter("soufoda", 600,"secondary-character-soufoda.ogg");

var rollSecondCharacter = function(name){

};


var moveCharacter = function(characterPlaceholder, moveY, isToMoveDown){
  if(moveY == undefined && isToMoveDown == undefined) {
    var currentTop  = $("#secondary-character").css("bottom").replace("px","");
    if(currentTop == -200){
       //play pepare sound
       var soundI = random(0, characterPlaceholder.character.prepareSounds.length - 1);
      // playSound(characterPlaceholder.character.prepareSounds[soundI]);

      isToMoveDown = false;
      moveY = -200;
    }else{
      isToMoveDown = true;
      moveY = 200;
    }
  }

  var hasToMove = false;
  if(isToMoveDown){
    moveY += 10;
    if(moveY < -200){
      hasToMove = true;
    }
  }else{

    moveY -= 10;  
    if(moveY > -200){
      hasToMove = true;
    }
    
  }
  
  if(hasToMove){
    setTimeout(function(){
      $("#" + characterPlaceholder.name).css("top", moveY + "px");
      moveCharacter(characterPlaceholder, moveY, isToMoveDown);
    }, 10);
  }else{
    if(isToMoveDown){
      $("#" + characterPlaceholder.name).css("top", characterPlaceholder.startY + "px");
      setTimeout(function(){
        moveCharacter(characterPlaceholder);
      },500);
    }else{
      actionCharacter(characterPlaceholder);
    }
  }
};

