var characterPlaceholder = [
  {
    "name": "character-0",
    "status": "stopped",
    "character": null,
    "startY": 100,
    "maximumY": 17,
    "shotTimeout": null,
  },
  {
    "name": "character-1",
    "status": "stopped",
    "character": null,
    "startY": 100,
    "maximumY": 17,
    "shotTimeout": null,
  },
  {
    "name": "character-2",
    "status": "stopped",
    "character": null,
    "startY": 400,
    "maximumY": 228,
    "shotTimeout": null,
  },
  {
    "name": "character-3",
    "status": "stopped",
    "character": null,
    "startY": 400,
    "maximumY": 228,
    "shotTimeout": null,
  },
];

var player = {
  "life": 100,
};

var characters = [];

var addCharacter = function(name, y, x, prepareX, hitX, shootX){

  characters.push({
    "name": name,
    "y": y,
    "x": x + 15,
    "prepareX": prepareX + 15,
    "hitX": hitX,
    "shootX": shootX + 10,
  });

};

addCharacter("ahh", 0, 80, -180, -390, -570);
addCharacter("bixovinu", -235, 80, -180, -390, -570);
addCharacter("morredi", -460, 80, -180, -390, -570);
addCharacter("cacet", -699, 80, -180, -390, -570);
addCharacter("bioca", -930, 80, -180, -390, -570);
addCharacter("paidefamilia", -1163, 80, -180, -390, -570);

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
    setTimeout(function(){
      $("#" + characterPlaceholder.name).css("top", moveY + "px");
      moveCharacter(characterPlaceholder, moveY, isToMoveDown);
    }, 10);
  }else{
    if(isToMoveDown){
      $("#" + characterPlaceholder.name).css("top", characterPlaceholder.startY + "px");
      characterPlaceholder.status = "stopped";
      setTimeout(function(){
        moveCharacter(characterPlaceholder);
      },500);
    }else{
      characterPlaceholder.status = "showing";
      actionCharacter(characterPlaceholder);
    }
  }
};



var random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

var actionCharacter = function(characterPlaceholder){
  characterPlaceholder.status = "prepare";
  $("#" + characterPlaceholder.name).css("background-position-x", characterPlaceholder.character.prepareX + "px");

  var isActionShot = random(0, 1);
  var actionTime = random(500, 2000);
  setTimeout(function(){
    if(isActionShot){
      $("#" + characterPlaceholder.name).css("background-position-x", characterPlaceholder.character.shootX + "px");
      characterPlaceholder.status = "will shoot";

      var timeToShoot = random(500, 2000);
      characterPlaceholder.shotTimeout = setTimeout(function(){
        characterPlaceholder.status = "shot";
        $("#" + characterPlaceholder.name).css("background-position-x", (characterPlaceholder.character.shootX + 30) + "px");
        player.life -= 10;
        $("#player-life").html(player.life);

        setTimeout(function(){moveCharacter(characterPlaceholder);}, 500);
      }, timeToShoot);

    }else{
      moveCharacter(characterPlaceholder);
    }
  },actionTime);

};

$(".character").click(function(characterPlaceholderElement){

  shotAnimation();

   var placeholder = characterPlaceholder[$(characterPlaceholderElement.currentTarget).attr("data-id")];
   
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
/*
moveCharacter(characterPlaceholder[0]);
moveCharacter(characterPlaceholder[1]);
moveCharacter(characterPlaceholder[2]);
moveCharacter(characterPlaceholder[3]);
*/

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