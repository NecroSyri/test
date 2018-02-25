function setTimer(time,name){
  load();
  if(isNull(d.timers)){
    d.timers=[];
  }
  d.timers.push([time,name]);
  debug("setTimer() - d.timers : "+d.timers);
  save();
  triggerEvent("load");
}

function triggerEvent(message){
  var event = message.split(",")[0];
  var param = message.split(",")[1];
  debug("triggerEvent() - event : "+event+" param : "+param);
  windowEvent(event,param);
  chrome.extension.sendMessage(message);
}

// EGG

function eggShake(){
  d.state="shake";
  save();
}

function eggHatch(){
  d.state="hatch";
  save();
}
