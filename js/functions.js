function save(){
	localStorage.setItem("datas",JSON.stringify(popinSize));
}

function load(){
	var tmp = localStorage.getItem("datas");
	if (!isNull(tmp)){
		popinSize = JSON.parse(tmp);
	}
}
