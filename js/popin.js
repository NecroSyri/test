var mouse={};
var resize=false;
var move=false;
var resize="";
var popinSize={};
var d= {};

if($("#popin").length<1 && !closePopin){
  $("body").append("<div id='popin'></div>");
  $("#popin").load(popinPath,function(){main();});
}else{
  $("#popin").remove();
}

function main(){


  popinSize.width=$("#popin").width();
  popinSize.height=$("#popin").height();
  popinSize.left=parseInt($("#popin").css("left").replace("px",""));
  popinSize.right=parseInt($("#popin").css("right").replace("px",""));
  popinSize.top=parseInt($("#popin").css("top").replace("px",""));
  popinSize.bottom=parseInt($("#popin").css("bottom").replace("px",""));

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
}

function opacity(ui){
  $("#popin").css("opacity",ui.value/100);
}

function toggleMove(){
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
