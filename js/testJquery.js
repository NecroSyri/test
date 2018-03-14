if(!window.jQuery){
  chrome.runtime.sendMessage("jquery");
}else{
  if(!window.jQuery.ui){
    chrome.runtime.sendMessage("jqueryui");
  }
}
