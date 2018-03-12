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
  popinSize.width=$("#popin").width();
  popinSize.height=$("#popin").height();
  popinSize.left=parseInt($("#popin").css("left").replace("px",""));
  popinSize.right=parseInt($("#popin").css("right").replace("px",""));
  popinSize.top=parseInt($("#popin").css("top").replace("px",""));
  popinSize.bottom=parseInt($("#popin").css("bottom").replace("px",""));

  $("#popin").draggable({disabled: true});
  $(".popin__button--close").on("click",function(){$("#popin").remove();});
  //$(".popin__button--move").on("mousedown",function(){move=true;$("#popin").draggable("enable");});
  $(".popin__button--move").on("mousedown",function(){dragOn();});
  //$(".popin__button--resize").on("mousedown",function(){toggleResize()});
  //$(".popin__resizer--tl").on("mousedown",function(){resize="tl";});
  //$(".popin__resizer--tr").on("mousedown",function(){resize="tr";});
  //$(".popin__resizer--bl").on("mousedown",function(){resize="bl";});
  //$(".popin__resizer--br").on("mousedown",function(){resize="br";});
  $(document).on("mouseup",function(){endEvents()});
}

function dragOn(){
  move=true;
  $("#popin").draggable("enable");
}
function dragOff(){
  console.log("off");
  $("#popin").draggable("disable");
}

function endEvents(){
  if(move){
    dragOff();
  }
  if(resize!=""){
    resize="";
  }
}

function toggleResize(){
  if($(".popin__resizer").css("display")=="none"){
    //not resize
    $(".popin__resizer").show();
    $("#popin").css("border-color","#08f");
  }else{
    //resize
    $(".popin__resizer").hide();
    $("#popin").css("border-color","#000");
  }
}

function mouseMove(){
  if(move){
	debugPos();

    $("#popin").css("width","unset");
    $("#popin").css("height","unset");
    var buttonWidthHalf = $(".popin__button--move").css("width").replace("px","")/2;
    var buttonHeighthHalf = $(".popin__button--move").css("height").replace("px","")/2;
    var buttonLeft = $(".popin__button--move").position().left;
    var buttonTop = $(".popin__button--move").position().top;
    var buttonMargin = $(".popin__button").css("margin").replace("px","");

    popinSize.left = mouse.x-buttonWidthHalf-buttonLeft-buttonMargin;
    popinSize.top = mouse.y-$(window).scrollTop()-buttonHeighthHalf-buttonTop-buttonMargin;
    popinSize.right = $("body").width() - (popinSize.left + popinSize.width) - 20;
    popinSize.bottom = $("body").height() - (popinSize.top + popinSize.height) + 20;

    $("#popin").css("left",popinSize.left);
    $("#popin").css("top",popinSize.top);
    $("#popin").css("right",popinSize.right);
    $("#popin").css("bottom",popinSize.bottom);
  }
  if(resize!=""){
    switch(resize){
      case "tl":
    	debugPos();
        $("#popin").css("width","unset");
        $("#popin").css("height","unset");
        $("#popin").css("left",mouse.x+"px");
        $("#popin").css("top",(mouse.y-$(window).scrollTop())+"px");
      break;
      case "tr":
      break;
      case "bl":
      break;
      case "br":
      break;
    }
  }
}

function mouseMoveold(){
	if(resize){
			var max = $("body").width()-mouse.x;
			if(max<mouse.y){
				max = mouse.y;
			}
			if(max>580){
				max=580;
			}
			if(max<64){
				max=64;
			}
			$("body").width(max);
			$("body").height(max);
			$("#screen").width($("body").width());
			$("#screen").height($("body").height());
			if($("#statsZone").is(":visible")){
				$("body").height(max+statsZoneHeight);
			}
	}
}
function resizeOn(){
	resize=true;
}
function resizeOff(){
	if(resize){
		resize=false;
		bg.d.bodyWidth = $("body").width();
		if($("#statsZone").is(":visible")){
			bg.d.bodyHeight = $("body").height()-statsZoneHeight;
		}else{
			bg.d.bodyHeight = $("body").height();
		}
		bg.save();
	}
}
