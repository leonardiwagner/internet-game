var characterPlaceholder = [
  {
    "id": 0,
    "name": "character-0",
    "status": "stopped",
    "character": null,
    "startY": 210,
    "maximumY": 60,
    "currentTimeout": null,
  },
  {
    "id": 1,
    "name": "character-1",
    "status": "stopped",
    "character": null,
    "startY": 210,
    "maximumY": 60,
    "currentTimeout": null,
  },
  {
    "id": 2,
    "name": "character-2",
    "status": "stopped",
    "character": null,
    "startY": 474,
    "maximumY": 320,
    "currentTimeout": null,
  },
  {
    "id": 3,
    "name": "character-3",
    "status": "stopped",
    "character": null,
    "startY": 474,
    "maximumY": 320,
    "currentTimeout": null,
  },
];



var characters = [];

var addCharacter = function(name, y, x, prepareX, hitX, shootX, prepareSounds, hitSounds){

  characters.push({
    "name": name,
    "y": y,
    "x": x + 15,
    "prepareX": prepareX + 15,
    "hitX": hitX,
    "shootX": shootX + 10,
    "prepareSounds": prepareSounds,
    "hitSounds": hitSounds
  });

};


addCharacter("paidefamilia", -1163, 80, -180, -390, -570,["paidefamilia-1.ogg"],["paidefamilia-hit-1.ogg","paidefamilia-hit-2.ogg", "paidefamilia-hit-3.ogg"]);
addCharacter("bioca", -930, 80, -180, -390, -570, ["bioca-1.ogg","bioca-2.ogg","bioca-3.ogg", "bioca-4.ogg", "bioca-5.ogg"], ["bioca-hit-1.ogg", "bioca-hit-2.ogg"]);
addCharacter("bixovinu", -235, 80, -180, -390, -570, ["bichovinu-1.ogg","bichovinu-2.ogg","bichovinu-3.ogg"], ["bichovinu-hit-1.ogg", "bichovinu-hit-2.ogg"]);
addCharacter("cacet", -699, 80, -180, -390, -570, ["cacet-1.ogg","cacet-2.ogg","cacet-3.ogg","cacet-4.ogg"], ["cacet-hit.ogg"]);
addCharacter("morredi", -460, 80, -180, -390, -570, ["morrediabo-1.ogg","morrediabo-2.ogg","morrediabo-3.ogg","morrediabo-4.ogg","morrediabo-5.ogg",], ["morrediabo-hit.ogg"]);
addCharacter("ahh", 0, 80, -180, -390, -570,["negobam-1.ogg", "negobam-2.ogg"],["negobam-hit.ogg"]);









var moveCharacter = function(characterPlaceholder, moveY, isToMoveDown){
  characterPlaceholder.status = "moving";
  if(moveY == undefined && isToMoveDown == undefined) {
    var currentTop  = $("#" + characterPlaceholder.name).css("top").replace("px","");
    if(currentTop == characterPlaceholder.startY){
       //play pepare sound
       var soundI = random(0, characterPlaceholder.character.prepareSounds.length - 1);
       playSound(characterPlaceholder.character.prepareSounds[soundI], 0);

      isToMoveDown = false;
      moveY = characterPlaceholder.startY;

      
    }else{
      isToMoveDown = true;
      moveY = characterPlaceholder.maximumY;
    }
  }

  var hasToMove = false;
  if(isToMoveDown){
    moveY += 10;
    if(moveY < characterPlaceholder.startY){
      hasToMove = true;
    }
  }else{

    moveY -= 10;  
    if(moveY > characterPlaceholder.maximumY){
      hasToMove = true;
    }
    
  }
  
  if(hasToMove){
    characterPlaceholder.currentTimeout =  setTimeout(function(){
      $("#" + characterPlaceholder.name).css("top", moveY + "px");
      moveCharacter(characterPlaceholder, moveY, isToMoveDown);
    }, 10);
  }else{
    if(isToMoveDown){
      $("#" + characterPlaceholder.name).css("top", characterPlaceholder.startY + "px");
      characterPlaceholder.status = "stopped";
      
      
      /*
      characterPlaceholder.currentTimeout =  setTimeout(function(){
       // moveCharacter(characterPlaceholder);
      },500);*/
    }else{
      characterPlaceholder.status = "showing";
      actionCharacter(characterPlaceholder);
    }
  }
};





var actionCharacter = function(characterPlaceholder, callback){
  characterPlaceholder.status = "prepare";
  $("#" + characterPlaceholder.name).css("background-position-x", characterPlaceholder.character.prepareX + "px");

  var isActionShot = random(0, 1);
  var actionTime = random(500, 2000);
  characterPlaceholder.currentTimeout = setTimeout(function(){
    if(isActionShot){
      $("#" + characterPlaceholder.name).css("background-position-x", characterPlaceholder.character.shootX + "px");
      characterPlaceholder.status = "will shoot";

      var timeToShoot = random(500, 2000);
      characterPlaceholder.currentTimeout = setTimeout(function(){
        characterPlaceholder.status = "shot";
        playSound("shoot-2.ogg", 2);
        $(".fire[data-id='" + characterPlaceholder.id  + "']").show();
        
        sumLife(-10);

        characterPlaceholder.currentTimeout = setTimeout(function(){
          moveCharacter(characterPlaceholder);

          $(".fire[data-id='" + characterPlaceholder.id  + "']").hide();

           playSound("player-hit.ogg", 5);
        }, 500);
      }, timeToShoot);

    }else{
      moveCharacter(characterPlaceholder);
    }
  },actionTime);

};



var message = function(text){
  $("#message").html(text);
};




var getRandomCharacter = function(){
  var randomCharacterIndex = random(0, characters.length - 1);
  return characters[randomCharacterIndex];
};

var getRandomPlaceholderStopped = function(){
  var randomPlaceholderId = random(0, characterPlaceholder.length - 1);
  return characterPlaceholder[randomPlaceholderId];
};

var renderPlaceholder = function(placeholder){
  $("#" + placeholder.name).css("top", placeholder.startY + "px");
  $("#" + placeholder.name).css("background-position-x", placeholder.character.x + "px");
  $("#" + placeholder.name).css("background-position-y", placeholder.character.y + "px");
};

var getCharactersMovingCount = function(){
  var count = 0;
  for(var i = 0; i < characterPlaceholder.length; i++){
    if(characterPlaceholder[i].status != "stopped"){
      count ++;
    }
  }

  return count;
};


var setCharacterToMove = function(maxCharactersAtSameTime){
  if(getCharactersMovingCount() < maxCharactersAtSameTime){
    var placeholder = getRandomPlaceholderStopped();
    placeholder.character = getRandomCharacter();
    renderPlaceholder(placeholder);
     
    
    moveCharacter(placeholder);
  }

};



setInterval(function(){
  var characters = 0;
  if(player.kills < 3){
    characters = 1;
  }else if(player.kills < 7){
    characters = 2;
  }else if(player.kills < 10){
    characters = 3;
  }else{
    characters = 4;
  }

  setCharacterToMove(characters);
}, 1000);









/*

for(var i = 0; i < characters.length; i++){
  moveCharacter(characters[i]); 
}

var moveCharacterToWindow = function(currentTop){
 
  
};



    
    var takeDecision = function(character){
      setTimeout(function(){
        $(character).addClass("prepare");

        takeAction(character);
      }, 1000);
    };

    var takeAction = function(character){
      setTimeout(function(){
        $(character).removeClass("prepare");
        $(character).addClass("hit");
      }, 1000);
    };

    moveCharacterToWindow(250);
    */