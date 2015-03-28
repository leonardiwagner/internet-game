var characters = [];

var addCharacter = function(name, y, x, prepareX, hitX, shootX){

  characters.push({
    "name": name,
    "y": y,
    "x": x,
    "prepareX": prepareX,
    "hitX": hitX,
    "shootX": shootX
  });

};

addCharacter("ahh", 0, 80, -180, -390, -570);
addCharacter("bixovinu", -235, 80, -180, -390, -570);
addCharacter("morredi", -460, 80, -180, -390, -570);
addCharacter("cacet", -699, 80, -180, -390, -570);
addCharacter("bioca", -930, 80, -180, -390, -570);
addCharacter("paidefamilia", -1163, 80, -180, -390, -570);