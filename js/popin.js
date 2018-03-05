var mouse={};
var resize=false;
var move=false;

if($("#popin").length<1 && !closePopin){
  $("body").append("<div id='popin'></div>");
  $("#popin").load(popinPath,function(){main();});
}else{
  $("#popin").remove();
}

function main(){
  $(".popin__button--close").on("click",function(){$("#popin").remove();});
  $(".popin__button--move").on("mousedown",function(){startMove()});
  $(document).on("mouseup",function(){endEvents()});
  $(document).mousemove(function(event){
		mouse.x=event.pageX;
		mouse.y=event.pageY;
		mouseMove();
	});
}

function startMove(){
  move=true;
}

function endEvents(){
  if(move){
    move=false;
  }
}

function mouseMove(){
  if(move){
    $("#popin").css("left",mouse.x-($(".popin__button--move").css("width").replace("px","")/2)-$(".popin__button--move").position().left-$(".popin__button").css("margin").replace("px",""));
    $("#popin").css("top",mouse.y-$(window).scrollTop()-($(".popin__button--move").css("height").replace("px","")/2)-$(".popin__button--move").position().top-$(".popin__button").css("margin").replace("px",""));
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
