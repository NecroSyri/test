chrome.commands.onCommand.addListener(function(command) {
	switch(command){
		case "toggle-popin":
			togglePopin();
		break;
		default:
			console.log('Command:', command);
		break;
	}
});

chrome.tabs.onActivated.addListener(function(obj){
	if($("#popin").length>=1){
	  $("#popin").remove();
		alert("change");
	}
});

function togglePopin(){
	chrome.tabs.executeScript(null,{file: "js/jquery-3.2.1.min.js"});
	chrome.tabs.insertCSS(null,{file: 'css/popin.css'});
	chrome.tabs.executeScript(null,{file: "js/popin.js"});
}
