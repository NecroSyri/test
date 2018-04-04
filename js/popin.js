/* OLD
var mouse={};
var resize=false;
var move=false;
var resize="";
var popinSize={};

if($("#popin").length<1 && !closePopin){
  $("body").append("<div id='popin'></div>");
  $("#popin").load(popinPath,function(){main();});
}else{
  $("#popin").remove();
}

function main(){

  loadPopin();

  $("#popin").draggable({disabled: true});
  $("#popin").resizable({
    handles: "ne, nw, se, sw",
    minHeight : 50,
    minWidth : 100,
    aspectRatio : true,
    autoHide : true,
    disabled:true
  });
  $(".popin__slider").slider({value:100,min:10,change: function( event, ui ) {opacity(ui);},slide: function( event, ui ) {opacity(ui);}});
  $(".popin__slider").toggle();
  $(".popin__movebar").toggle();

  $(".popin__button--close").on("click",function(){$("#popin").remove();});
  $(".popin__button--edit").on("click",function(){$(".popin__slider").toggle();toggleResize();toggleMove();});
  $(".popin__movebar").on("mousedown",function(){dragOn();});
  $(document).on("mouseup",function(){endEvents()});
}

function dragOn(){
  move=true;
  $("#popin").draggable("enable");
}
function dragOff(){
  move=false;
  $("#popin").draggable("disable");
}

function endEvents(){
  if(move){
    dragOff();
  }
  if(resize){
    savePopin();
  }
}

function savePopin(){
  popinSize.top=$("#popin").css("top");
  popinSize.left=$("#popin").css("left");
  popinSize.width=$("#popin").css("width");
  popinSize.height=$("#popin").css("height");
  popinSize.opacity=$("#popin").css("opacity");
  save();
}

function loadPopin(){
  load();
  $("#popin").css("top",popinSize.top);
  $("#popin").css("left",popinSize.left);
  $("#popin").css("width",popinSize.width);
  $("#popin").css("height",popinSize.height);
  $("#popin").css("opacity",popinSize.opacity);
}

function opacity(ui){
  $("#popin").css("opacity",ui.value/100);
}

function toggleMove(){
  if(resize){
    resize=false;
  }else{
    resize=true;
  }
  if($(".popin__resizer").css("display")=="none"){
    $(".popin__button").css("top","0%");
  }else{
    $(".popin__button").css("top","-10%");
  }
  $(".popin__movebar").toggle();
}

function toggleResize(){
  if($(".popin__resizer").css("display")=="none"){
    //not resize
    $(".popin__resizer").show();
    $("#popin").css("border-color","#08f");
    $( "#popin" ).resizable({
      handles: "ne, nw, se, sw",
      disabled:false
    });
  }else{
    //resize
    $(".popin__resizer").hide();
    $("#popin").css("border-color","#000");
    $( "#popin" ).resizable({
      handles: "",
      disabled: "true"
    });
  }
}

$('body').on('mousewheel', function(event) {
  if($(".popin__slider").css("display") != "none"){
    event.preventDefault();
    val = $(".popin__slider").slider("value");
    if(event.originalEvent.wheelDelta /120 > 0) {
      val+=5;
    }else{
      val-=5;
    }
    if(val>100)val=100;
    if(val<10)val=10;
    $( ".popin__slider" ).slider("value", val);
  }
});


function save(){
	localStorage.setItem("datas",JSON.stringify(popinSize));
}

function load(){
	var tmp = localStorage.getItem("datas");
	if (!isNull(tmp)){
		popinSize = JSON.parse(tmp);
	}
}

function isNull(o){
  if(o == null || o == "" || o == undefined){
    return true;
  }
  return false;
}
*/
