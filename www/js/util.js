var channel = [
  {
    "audioObject": null, // character sound
    "isPlaying": false
  },
  {
    "audioObject": null, // character sound 2 (hit)
    "isPlaying": false
  },
  {
    "audioObject": null, // character sound 3 (gunshot)
    "isPlaying": false
  },
  {
    "audioObject": null, // secondary character
    "isPlaying": false
  },
  {
    "audioObject": null, // player sound (gunshot)
    "isPlaying": false
  },
  {
    "audioObject": null, // player sound 2 (hit)
    "isPlaying": false
  },
  {
    "audioObject": null, //message sound
    "isPlaying": false
  }
];


var playSound = function(soundName, channelIndex){

  var isDevice = window.device != undefined;

  var audioObject = channel[channelIndex].audioObject;
  if(audioObject != null){
    audioObject.pause();
  }

  if(isDevice){
    channel[channelIndex].audioObject = new Media("/android_asset/www/sound/" + soundName, function(){
      channel[channelIndex].audioObject.release();
      channel[channelIndex].audioObject = null;
    }, function(){
      channel[channelIndex].audioObject.release();
      channel[channelIndex].audioObject = null;
    });

    channel[channelIndex].audioObject.play();
  }else{
    channel[channelIndex].audioObject = new Audio("sound/" + soundName);
    channel[channelIndex].audioObject.load();
    channel[channelIndex].audioObject.play();
  }
  
};

var random = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};