

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
    if(spriteI == undefined) spriteI = 0;


    
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
        }, 200);  
     }
};

//reload
$("#reload-button").click(function(){
  $("#reload-button-reloading").show();
  $("#reload-button-reload").hide();

  reload();
});




  

