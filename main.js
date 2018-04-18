var yyy = document.getElementById('xxx')


var context = yyy.getContext('2d')


pageSize()
window.onresize = function(){
   pageSize()
} 
var painting = false
var lastPoint = {x:undefined,y:undefined}

function pageSize(){
  var pageWidth = document.documentElement.clientWidth
  var pageHeight = document.documentElement.clientHeight
  yyy.width = pageWidth
  yyy.height = pageHeight
}
//按下鼠标

yyy.onmousedown = function(a){
 painting = true
   var x = a.clientX
    var y = a.clientY
    lastPoint = {x:x,y:y}
    drawCircle(x,y,2)
}



//滑动鼠标
yyy.onmousemove = function(a){
  if(painting){
    var x = a.clientX
    var y = a.clientY
    var newPoint = {x:x,y:y}
    drawCircle(x,y,2)        
    drawLine (lastPoint.x,lastPoint.y,newPoint.x,newPoint.y)
    lastPoint = newPoint
  }

  
}

//松开鼠标
yyy.onmouseup = function(){
  painting = false
}
function drawCircle(x,y,radius){
  context.beginPath()
  context.fillStyle = 'black'
  context.arc(x,y,radius,0,Math.PI * 2)
  context.fill()
}
function drawLine(x1,y1,x2,y2){
  context.beginPath()
  context.strokeStyle = 'black'
  context.lineWidth = 5
  context.moveTo(x1,y1)
  
  context.lineTo(x2,y2)
  context.stroke()
  context.closePath()
  
}



