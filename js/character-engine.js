


var runCharacter = function(){

};

var startCharacter = function(characterId){
  characters[characterId].status = "running";

};

 var random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};