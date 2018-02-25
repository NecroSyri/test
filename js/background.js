var debugMode=true;
/*
 Object d :
  d.mon - name of mon
	d.egg - name of egg
	d.stage - egg/baby...
  d.state - animation state (idle/taining/eating...)
	d.process - current process
  d.menu - selected menu
  d.timers - array of timers [time_untill_event,"event_name"]
  d.screenHeight
  d.screenWidth
  d.opacity
  d.lastTime
  d.pause
  d.eggsList
 */
var d = {};
var popup=false;
var popupPort;
chrome.runtime.onConnect.addListener(function(port) {
	//on popup open
	if(port.name == "P1") {
		popup=true;
		init();
		popupPort = port;
		//on popup close
		popupPort.onDisconnect.addListener(function() {
			popup=false;
			d.lastTime=new Date();
			save();
		});
	}
});
//tick every seconds
setInterval(function(){tick()}, 1000);
function tick(){
	//if there's timers, run trough all of them, decrement them, if they reach 0, trigger event
	if(d.timers!=null){
		for(i=0;i<d.timers.length;i++){
			d.timers[i][0]--
			if(d.timers[i][0]<=0){
				if(popup){
					debug("tick() - d.timers["+i+"][1]"+d.timers[i][1]);
					triggerEvent(d.timers.splice(i,1)[0][1]);
				}else{
					if(isNull(d.todo)){
						d.todo=[];
					}
					d.todo.push(d.timers.splice(i,1)[0][1]);
					debug("tick() - d.todo : "+d.todo);
					save();
				}
			}
		}
	}
}

function init(){
	load();
	d.menus=["stats","food","train","battle","clean","light","heal","album","connection"];
	save();
}

function popupReady(){
  if(isNull(d.mon)){
    debug("init() - d.mon null > eggChoose()");
    triggerEvent("eggChoose");
  }else{
    //resume
		triggerEvent("resume");
    debug("init() - resume - d.mon : "+d.mon);
  }
}

function getLastTime(){
	return d.lastTime;
}

function reset(){
	d={};
}
