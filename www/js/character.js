var characterPlaceholder = [
  {
    "id": 0,
    "name": "character-0",
    "status": "stopped",
    "character": null,
    "startY": 260,
    "maximumY": 0,
    "currentTimeout": null,
  },
  {
    "id": 1,
    "name": "character-1",
    "status": "stopped",
    "character": null,
    "startY": 260,
    "maximumY": 0,
    "currentTimeout": null,
  },
  {
    "id": 2,
    "name": "character-2",
    "status": "stopped",
    "character": null,
    "startY": 340,
    "maximumY": 220,
    "currentTimeout": null,
  },
  {
    "id": 3,
    "name": "character-3",
    "status": "stopped",
    "character": null,
    "startY": 340,
    "maximumY": 220,
    "currentTimeout": null,
  },
];

var characters = [];
var addCharacter = function(name, y, hp, power, chanceToAppear, prepareSounds, hitSounds){
  
  characters.push({
    "name": name,
    "hp": hp,
    "power": power,
    "chanceToAppear": chanceToAppear,
    "y": y,
    "x": 1000  ,
    "prepareX":  800,
    "hitX": 600,
    "shootX": 400,
    "prepareSounds": prepareSounds,
    "hitSounds": hitSounds
  });

};


addCharacter("bixovinu", -250, 1, 5, 100, ["bichovinu-1.ogg","bichovinu-2.ogg","bichovinu-3.ogg"], ["bichovinu-hit-1.ogg", "bichovinu-hit-2.ogg"]);
addCharacter("cacet", -750, 1, 10, 80, ["cacet-1.ogg","cacet-2.ogg","cacet-3.ogg","cacet-4.ogg"], ["cacet-hit.ogg"]);
addCharacter("morredi", -500,1, 15, 60, ["morrediabo-1.ogg","morrediabo-2.ogg","morrediabo-3.ogg","morrediabo-4.ogg","morrediabo-5.ogg",], ["morrediabo-hit.ogg"]);
addCharacter("ahh", 0, 2, 20, 40, ["negobam-1.ogg", "negobam-2.ogg"],["negobam-hit.ogg"]);
addCharacter("bioca", -1000, 2, 25, 20, ["bioca-1.ogg","bioca-2.ogg","bioca-3.ogg", "bioca-4.ogg", "bioca-5.ogg"], ["bioca-hit-1.ogg", "bioca-hit-2.ogg"]);
addCharacter("paidefamilia", -1250, 3, 30, 10,["paidefamilia-1.ogg"],["paidefamilia-hit-1.ogg","paidefamilia-hit-2.ogg", "paidefamilia-hit-3.ogg"]);





//on character transition (such as move up/down)
$(".character").on("transitionend webkitTransitionEnd oTransitionEnd", function(){
 var placeholder = characterPlaceholder[$(this).data("id")];
 if($(this).hasClass("take-action")){
  $(this).removeClass("take-action");
  placeholder.status = "moved";
  
  //play pepare sound
  var soundI = random(0, placeholder.character.prepareSounds.length - 1);
  playSound(placeholder.character.prepareSounds[soundI], 0);
  
  actionCharacter(placeholder);
 }else if($(this).hasClass("hide")){
  $(this).removeClass("hide");
  placeholder.status = "stopped";
 }
});


var moveCharacter = function(characterPlaceholder, isMoveDown){
  if(isMoveDown == undefined) isMoveDown = false;
  characterPlaceholder.status = "moving";
  var placeholderSelector = $("#" + characterPlaceholder.name);
  var currentTop = placeholderSelector.css("top").replace("%","").replace("px", "");
  if(currentTop == characterPlaceholder.startY && !isMoveDown){
    //so move up
    placeholderSelector.css("top", characterPlaceholder.maximumY + "px");
    placeholderSelector.addClass("take-action");
    characterPlaceholder.status = "moving";
  }else{
    //move down
    placeholderSelector.css("top", characterPlaceholder.startY + "px");
    placeholderSelector.addClass("hide");
  }
};

var actionCharacter = function(characterPlaceholder){
  characterPlaceholder.status = "prepare";
  $("#" + characterPlaceholder.name).css("background-position-x", characterPlaceholder.character.prepareX + "px");

  var isActionShot = random(0, 1);
  var actionTime = random(500, 2000);
  characterPlaceholder.currentTimeout = setTimeout(function(){
    if(isActionShot){
      setCharacterToShoot(characterPlaceholder);
    }else{
      moveCharacter(characterPlaceholder);
    }
  },actionTime);
};

var setCharacterToShoot = function(characterPlaceholder){
    $("#" + characterPlaceholder.name).css("background-position-x", characterPlaceholder.character.shootX + "px");
      characterPlaceholder.status = "will shoot";

      var timeToShoot = random(500, 2000);
      characterPlaceholder.currentTimeout = setTimeout(function(){
        characterPlaceholder.status = "shot";
        playSound("shoot-2.ogg", 2);
        $(".fire[data-id='" + characterPlaceholder.id  + "']").show();
        
        sumLife(-characterPlaceholder.character.power);

        characterPlaceholder.currentTimeout = setTimeout(function(){
          moveCharacter(characterPlaceholder);

          $(".fire[data-id='" + characterPlaceholder.id  + "']").hide();

           playSound("player-hit.ogg", 5);
        }, 500);
      }, timeToShoot);
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
    placeholder.hp = placeholder.character.hp;
    renderPlaceholder(placeholder);
     
    moveCharacter(placeholder);
  }

};


$("#" + characterPlaceholder[0].name).css("top", characterPlaceholder[0].startY + "px");
$("#" + characterPlaceholder[1].name).css("top", characterPlaceholder[1].startY + "px");
$("#" + characterPlaceholder[2].name).css("top", characterPlaceholder[2].startY + "px");
$("#" + characterPlaceholder[3].name).css("top", characterPlaceholder[3].startY + "px");



setTimeout(function(){
  $("#" + characterPlaceholder[0].name).addClass("character-transition");
  $("#" + characterPlaceholder[1].name).addClass("character-transition");
  $("#" + characterPlaceholder[2].name).addClass("character-transition");
  $("#" + characterPlaceholder[3].name).addClass("character-transition");

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



},1000);