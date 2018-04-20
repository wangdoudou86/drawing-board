var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

setCanvasSize(yyy)
listenToUser(yyy)
//切换颜色
var colors = document.getElementById('colors')
black.onclick = function(){
  context.fillStyle = 'black'
  context.strokeStyle = 'black'
  colors.querySelector('.active').classList.remove('active')
  black.classList.add('active') 
}
red.onclick = function(){
  context.fillStyle = 'red'
  context.strokeStyle = 'red' 
  colors.querySelector('.active').classList.remove('active')  
  red.classList.add('active')
}
green.onclick = function(){
  context.fillStyle = 'green'
  context.strokeStyle = 'green'
  colors.querySelector('.active').classList.remove('active')  
  green.classList.add('active')
}
blue.onclick = function(){
  context.fillStyle = 'blue'
  context.strokeStyle = 'blue'
  colors.querySelector('.active').classList.remove('active')  
  blue.classList.add('active') 
}
yellow.onclick = function(){
  context.fillStyle = 'yellow'
  context.strokeStyle = 'yellow'
  colors.querySelector('.active').classList.remove('active')  
  yellow.classList.add('active') 
}
//橡皮擦与画笔按钮状态切换
var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  eraser.classList.add('active')
  pen.classList.remove('active')  
}
pen.onclick = function () {
  eraserEnabled = false
  pen.classList.add('active')
  eraser.classList.remove('active')  
}
//清除当前画布
clear.onclick = function(){
  context.clearRect(0,0,yyy.width,yyy.height)
}
//切换粗细
var lineSize = 5
thin.onclick = function(){
  lineSize = 4
  thick.classList.remove('active')
  thin.classList.add('active')  
}
thick.onclick = function(){
  lineSize = 8  
  thin.classList.remove('active')  
  thick.classList.add('active') 
}
//另存为
download.onclick = function(){
  var url = yyy.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'picture'
  a.target = '_blank'
  a.click()
}  


//设置画布大小
function setCanvasSize(canvas) {
  pageSize()
  window.onresize = function () {
    pageSize()
  }
  function pageSize() {
    var pageWidth = document.documentElement.clientWidth
    var pageHeight = document.documentElement.clientHeight
    canvas.width = pageWidth
    canvas.height = pageHeight
  }
}

//画线画圆
function drawCircle(x, y, radius) {
  context.beginPath()
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.lineWidth = lineSize
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

//监听鼠标的动作
function listenToUser(canvas) {
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)
    canvas.ontouchstart = function(a){
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        
        lastPoint = { x: x, y: y }
      }
    }
    canvas.ontouchmove = function(a){
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      if (!using) { return }   
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      using = false
    }
  }else{
    //非触屏设备
    var using = false
    var lastPoint = { x: undefined, y: undefined }
    //按下鼠标
    canvas.onmousedown = function (a) {
      var x = a.clientX
      var y = a.clientY
      using = true
      if (eraserEnabled) {
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }
    //滑动鼠标
    canvas.onmousemove = function (a) {
      var x = a.clientX
      var y = a.clientY
      if (!using) { return }   //发现没有开启使用，就直接退出去，什么操作也不做
      if (eraserEnabled) {
        //不加这个橡皮擦开启时，不按鼠标直接移动也会清除
        context.clearRect(x - 5, y - 5, 10, 10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    //松开鼠标
    canvas.onmouseup = function () {
      using = false
    }
  
  }
  
 
}