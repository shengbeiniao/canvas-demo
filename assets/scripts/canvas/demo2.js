/**
 * CreateDate 12/15/15
 * Author frank.zhang
 * Description
 */

'use strict';
var canvas=document.getElementById('canvas');

var pencil=document.getElementById('pencil');
var eraser=document.getElementById('eraser');
var snapshot=document.getElementById('snapshot');
var share=document.getElementById('share');
var rtn=document.getElementById('rtn');

var preview=document.getElementById('preview');
var previewWrapper=document.getElementsByClassName('preview-wrapper')[0];

canvas.width=window.innerWidth;
canvas.height=window.innerHeight*0.9;
var ctx=canvas.getContext('2d');

var sx= 0,sy=0;
ctx.strokeStyle='white';
ctx.lineCap='round';

//1.draw,2.erase
var state= 1;

var lineWidth=1;
var eraserSize=10;
var black=true;

function draw(sx,sy,dx,dy){
  ctx.beginPath();
  ctx.lineWidth=lineWidth;
  ctx.moveTo(sx,sy);
  ctx.lineTo(dx,dy);
  ctx.stroke();
}

function erase(x,y){
  ctx.save();
  ctx.arc(x,y,eraserSize,0,2*Math.PI);
  ctx.clip();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.restore();
}

canvas.addEventListener('touchstart',function(e){
  sx=e.touches[0].pageX;
  sy=e.touches[0].pageY;
});

canvas.addEventListener('touchmove',function(e){
  var dx=e.touches[0].pageX;
  var dy=e.touches[0].pageY;
  switch (state){
    case 1:{
      draw(sx,sy,dx,dy);
      break;
    }
    case 2:{
      erase(dx,dy);
      break;
    }
    default :return false;
  }
  sx=dx;
  sy=dy;
});

$('.pencil .drag').bind('touchmove',function(e){
  var x=e.touches[0].pageX;
  var y=e.touches[0].pageY;
  var clientRect=$(this).parent().get(0).getBoundingClientRect();
  var left=clientRect.left;
  var top=clientRect.top;
  x=x-left;
  y=y-top;
  if(y>=10&&y<=150){
    $(this).css('top',y+'px');
    lineWidth=Math.round(y/10);
    console.log(lineWidth);
  }
});

$('.eraser .drag').bind('touchmove',function(e){
  var x=e.touches[0].pageX;
  var y=e.touches[0].pageY;
  var clientRect=$(this).parent().get(0).getBoundingClientRect();
  var left=clientRect.left;
  var top=clientRect.top;
  x=x-left;
  y=y-top;
  if(y>=10&&y<=150){
    $(this).css('top',y+'px');
    eraserSize=y;
    console.log(lineWidth);
  }
});

$('.menu').click(function(){
  $(this).siblings().removeClass('active');
  $(this).addClass('active');
  $('.bar-wrapper.active').removeClass('active');
  $(this).find('.bar-wrapper').addClass('active');
});

$('.background').bind('click',function(){
  black=!black;
  ctx.save();
  ctx.rect(0,0,canvas.width,canvas.height);
  ctx.clip();
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(black){
    $('.background span').text('白板');
  }else{
    $('.background span').text('黑板');
    ctx.fillStyle='white';
    ctx.fill();
  }
  ctx.restore();
});

$('.pencil').bind('click',function(){
  state=1;
});

$('.eraser').bind('click',function(){
  state=2;
});

$('.snapshot').bind('click',function(){
  var imageData=canvas.toDataURL('image/jpeg');
  preview.setAttribute('src',imageData);
  previewWrapper.style.display='block';
});

rtn.onclick=function(){
  previewWrapper.style.display='none';
};
