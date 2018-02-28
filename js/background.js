//GLOBAL
var currentTab;
var popinTab;
var injected = [];

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
	var popinPath = chrome.runtime.getURL("pages/popin.html");
	if(tabid == null || tabid == undefined){
		popinTab = currentTab;
		if(injected[currentTab]!=true){
			chrome.tabs.executeScript(null,{file: "js/jquery-3.2.1.min.js"});
			chrome.tabs.insertCSS(null,{file: 'css/popin.css'});
			injected[currentTab]=true;
		}
		chrome.tabs.executeScript(tabid,{code:"var closePopin=false;var popinPath=\""+popinPath+"\";"},function(){
			chrome.tabs.executeScript(tabid,{file: "js/popin.js"});
		});
	}else{
		chrome.tabs.executeScript(tabid,{code:"var closePopin=true;"},function(){
			chrome.tabs.executeScript(tabid,{file: "js/popin.js"});
		});
		popinTab=null;
	}
}
