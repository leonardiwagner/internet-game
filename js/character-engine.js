var characters = [
  {
    "name": "character-0",
    "status": "stopped"
  },
  {
    "name": "character-1",
    "status": "stopped"
  },
  {
    "name": "character-2",
    "status": "stopped"
  },
  {
    "name": "character-3",
    "status": "stopped"
  },
];


var runCharacter = function(){

};

var startCharacter = function(characterId){
  characters[characterId].status = "running";

};

 var random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};