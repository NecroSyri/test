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

function togglePopin(){
	//alert("toggle");
}
