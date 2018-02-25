function countSeconds(t1,t2){
	t1 = new Date(t1);
	t2 = new Date(t2);
	var dif = t1.getTime() - t2.getTime();
	var Seconds_from_T1_to_T2 = dif / 1000;
	var Seconds_Between_Dates = Math.floor(Math.abs(Seconds_from_T1_to_T2));
	return Seconds_Between_Dates;
}

function save(){
	localStorage.setItem("datas",JSON.stringify(d));
	debug("save() - d : "+JSON.stringify(d));
}

function load(){
	var tmp = localStorage.getItem("datas");
	if (!isNull(tmp)){
		d = JSON.parse(tmp);
		debug("load() - d : "+JSON.stringify(d));
	}else{
		debug("load() - d : empty");
	}
}

function notification(title,message,icon){
	var opt = {
			type: "basic",
			title: title,
			message: message,
			iconUrl: icon
	}
	chrome.notifications.create(opt, function(createdId) {
		var handler = function(id) {
			if(id == createdId) {
				navigate(url);
				chrome.notifications.clear(id);
				chrome.notifications.onClicked.removeListener(handler);
			}
		}});
}

function call(isCalling){
	if(isCalling){
		chrome.browserAction.setIcon({path: "../img/call1.png"});//set white
		if(showNotifications){
			notification("Call","You've been called !","../img/call1.png");
		}
	}else{
		chrome.browserAction.setIcon({path: "../img/ico/16-w.png"});
	}
}

function random(min,max){
	return min + Math.floor(Math.random() * max);
}

function isNull(o){
	if(o==null || o=="null" || o==undefined || o=="undefined"){
		return true;
	}else{
		return false;
	}
}

function windowEvent(event,param){
  if(!isNull(window[event])){
    if(isNull(param)){
      window[event]();
    }else{
      window[event](param);
    }
  }else{
    debug("window["+event+"] not exist")
  }
}

// DEBUG LOG
function debug(message){
	if(debugMode){
		console.log(message);
	}
}
