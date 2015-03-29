var characterPlaceholder = [
  {
    "id": 0,
    "name": "character-0",
    "status": "stopped",
    "character": null,
    "startY": 100,
    "maximumY": 17,
    "currentTimeout": null,
  },
  {
    "id": 1,
    "name": "character-1",
    "status": "stopped",
    "character": null,
    "startY": 100,
    "maximumY": 17,
    "currentTimeout": null,
  },
  {
    "id": 2,
    "name": "character-2",
    "status": "stopped",
    "character": null,
    "startY": 400,
    "maximumY": 228,
    "currentTimeout": null,
  },
  {
    "id": 3,
    "name": "character-3",
    "status": "stopped",
    "character": null,
    "startY": 400,
    "maximumY": 228,
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





characterPlaceholder[0].character = characters[0];
characterPlaceholder[1].character = characters[1];
characterPlaceholder[2].character = characters[2];
characterPlaceholder[3].character = characters[3];

var renderCharacterPlaceholer = function(){
  for(var i = 0; i < characterPlaceholder.length; i++){
    var currentCharacter = characterPlaceholder[i].character;
    $("#" + characterPlaceholder[i].name).css("top", characterPlaceholder[i].startY + "px");
    $("#" + characterPlaceholder[i].name).css("background-position-x", currentCharacter.x + "px");
    $("#" + characterPlaceholder[i].name).css("background-position-y", currentCharacter.y + "px");
  }

};


var moveCharacter = function(characterPlaceholder, moveY, isToMoveDown){
  characterPlaceholder.status = "moving";
  if(moveY == undefined && isToMoveDown == undefined) {
    var currentTop  = $("#" + characterPlaceholder.name).css("top").replace("px","");
    if(currentTop == characterPlaceholder.startY){
       //play pepare sound
       var soundI = random(0, characterPlaceholder.character.prepareSounds.length - 1);
       playSound(characterPlaceholder.character.prepareSounds[soundI]);

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
      characterPlaceholder.currentTimeout =  setTimeout(function(){
        moveCharacter(characterPlaceholder);
      },500);
    }else{
      characterPlaceholder.status = "showing";
      actionCharacter(characterPlaceholder);
    }
  }
};





var actionCharacter = function(characterPlaceholder){
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
        playSound("shoot-2.ogg");
        $(".fire[data-id='" + characterPlaceholder.id  + "']").show();
        
        sumLife(-10);

        characterPlaceholder.currentTimeout = setTimeout(function(){
          moveCharacter(characterPlaceholder);

          $(".fire[data-id='" + characterPlaceholder.id  + "']").hide();

           playSound("hit.ogg");
        }, 500);
      }, timeToShoot);

    }else{
      moveCharacter(characterPlaceholder);
    }
  },actionTime);

};

$(".character").click(function(characterPlaceholderElement){

  playSound("shoot-1.ogg");
  shotAnimation();



   var placeholder = characterPlaceholder[$(characterPlaceholderElement.currentTarget).attr("data-id")];
   //playsound
   var soundI = random(0, placeholder.character.hitSounds.length - 1);
   playSound(placeholder.character.hitSounds[soundI]);

    $(".blood[data-id=" + placeholder.id + "]").css("left", characterPlaceholderElement.clientX -50 + "px");
    $(".blood[data-id=" + placeholder.id + "]").css("top", characterPlaceholderElement.clientY - 50 + "px");
    $(".blood[data-id=" + placeholder.id + "]").show();
    clearTimeout(placeholder.currentTimeout);
    setTimeout(function(){
      $(".blood[data-id=" + placeholder.id + "]").hide();
      moveCharacter(placeholder);

    }, 500);
    
   
  if(placeholder.status == "will shoot"){

    message("good!");



  }else if(placeholder.status == "shot"){
    message("already shot!");
  }else{
    message("bad!");

    $("#" + placeholder.name).css("background-position-x", placeholder.character.hitX + "px");
  }

});

var message = function(text){
  $("#message").html(text);
};


renderCharacterPlaceholer();

moveCharacter(characterPlaceholder[0]);
moveCharacter(characterPlaceholder[1]);
moveCharacter(characterPlaceholder[2]);
moveCharacter(characterPlaceholder[3]);


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