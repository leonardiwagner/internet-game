

var shoot = function(nextPictureX){

  if(nextPictureX < 800){
    setTimeout(function(){
      $(".gun").css("background-position-x", nextPictureX + "px");
      shoot(nextPictureX + 20);

    },200);
  }
  

};

shoot(0);