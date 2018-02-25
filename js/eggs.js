function eggsSelect(){
	if(bg.d.egg<bg.d.eggsList.length-1){
		bg.d.egg++
	}else{
		bg.d.egg=0;
	}
	display(bg.d.eggsList[bg.d.egg],bg.d.state);
	debug("eggsSelect() - egg : "+bg.d.eggsList[bg.d.egg]);
	bg.save();
}
function eggsConfirm(){
	bg.d.process = "menu";
	bg.d.egg = bg.d.eggsList[bg.d.egg];
	bg.d.mon = bg.d.egg;
	bg.save();
	debug("d.mon : "+bg.d.mon);
	toggleChooseArrows(false);
	bg.setTimer(5,"eggShake");
	bg.setTimer(10,"eggHatch");
}
function eggsCancel(){

}

function eggChoose(){
	if(isNull(bg.d.eggsList)){
		debug("eggChoose() - first play");
		//first play
		bg.d.eggsList = ["v1","v2","v3","v4","v5"];
		bg.save();
	}
	bg.d.process="eggs";
	bg.d.stage="Egg";
	bg.d.egg=0;
	bg.d.state="fix"
	bg.save();
	debug("eggChoose() - toggleChooseArrows");
	toggleChooseArrows(true);
	display(bg.d.eggsList[bg.d.egg],bg.d.state);
}

function eggShake(){
	bg.d.state ="shake";
	bg.save();
	display(bg.d.mon,bg.d.state);
}

function eggHatch(){
	bg.d.state="hatch";
	bg.save();
	display(bg.d.mon,bg.d.state);
}

function eggHatching(){
	bg.digivolve();
}
