// GLOBAL
var currentTab;
var popinTab;
var injected = [];
// Get extension path of popin.html
var popinPath = chrome.runtime.getURL("pages/popin.html");

// LISTENERS
// Commands - hotkey
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

// Tab change
chrome.tabs.onActivated.addListener(function(obj){
	currentTab = obj.tabId;
	// If popin exists somewhere, toggle off
	if(popinTab != null && popinTab != undefined){
		 togglePopin(popinTab);
	}
});

// Messages
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    switch(message){
			case "jquery":
				injectJquery();
			break;
			case "jqueryui":
				injectJqueryui();
			break;
			case "bootstrap":
				injectBootstrap();
			break;
			default:
				console.log(message+" - "+sender+" - "+sendResponse);
			break;
		}
});

/*
	Toggle the popin
	@parameter {string} tabid - ID of the tab where to toggle popin
*/
function togglePopin(tabid){
	// If !tab,
	if(tabid == null || tabid == undefined){
		popinTab = currentTab;
		if(injected[currentTab]!=true){
			chrome.tabs.executeScript(null,{file:"js/testJquery.js"});
			chrome.tabs.insertCSS(null,{file: 'css/popin.css'});
			injected[currentTab]=true;
		}else{
			chrome.tabs.executeScript(currentTab,{code:"var closePopin=false;var popinPath=\""+popinPath+"\";"},function(){
				chrome.tabs.executeScript(currentTab,{file: "js/popin.js"});
			});
		}
	}else{
		chrome.tabs.executeScript(tabid,{code:"var closePopin=true;"},function(){
			chrome.tabs.executeScript(tabid,{file: "js/popin.js"});
		});
		popinTab=null;
	}
}

function injectJquery(){
	chrome.tabs.executeScript(null,{file: "js/jquery-3.2.1.min.js"},function(){
		chrome.tabs.executeScript(null,{file:"js/testJquery.js"});
	});
}

function injectJqueryui(){
	chrome.tabs.insertCSS(null,{file: 'css/jquery-ui.min.css'});
	chrome.tabs.executeScript(null,{file: "js/jquery-ui.min.js"},function(){
		chrome.tabs.executeScript(currentTab,{code:"var closePopin=false;var popinPath=\""+popinPath+"\";"},function(){
			chrome.tabs.executeScript(currentTab,{file: "js/functions.js"},function(){
				chrome.tabs.executeScript(currentTab,{file: "js/popin.js"});
			});
		});
	});
}
