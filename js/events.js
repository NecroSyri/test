function events(message){
	var event = message.split(",")[0];
	var param = message.split(",")[1];
	debug("events() - event : "+event+" param : "+param);
	windowEvent(event,param);
	bg.save();
}

function resume(){
	display(bg.d.mon,bg.d.state);
	if(!isNull(bg.d.todo)){
		for(var i=0;i<bg.d.todo.length;i++){
			debug("resume() > "+bg.d.todo[i]);
			windowEvent(bg.d.todo[i],undefined);
			bg.d.todo=null;
		}
	}
}
