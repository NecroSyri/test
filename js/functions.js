function save(){
	localStorage.setItem("datas",JSON.stringify(d));
}

function load(){
	var tmp = localStorage.getItem("datas");
	if (!isNull(tmp)){
		d = JSON.parse(tmp);
	}
}
