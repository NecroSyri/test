//GLOBAL
var currentTab;
var popinTab;


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
	currentTab = obj.tabId;
	if(popinTab != null && popinTab != undefined){
		 togglePopin(popinTab);
	}
});

function togglePopin(tabid){
	if(tabid == null || tabid == undefined){
		popinTab = currentTab;
		chrome.tabs.executeScript(null,{file: "js/jquery-3.2.1.min.js"});
		chrome.tabs.insertCSS(null,{file: 'css/popin.css'});
		chrome.tabs.executeScript(tabid,{code:"var closePopin=false;"},function(){
			chrome.tabs.executeScript(tabid,{file: "js/popin.js"});
		});
	}else{
		chrome.tabs.executeScript(tabid,{code:"var closePopin=true;"},function(){
			chrome.tabs.executeScript(tabid,{file: "js/popin.js"});
		});
		popinTab=null;
	}
}
