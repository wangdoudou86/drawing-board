var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

setCanvasSize(yyy)
listenToMouse(yyy)
//橡皮擦与画笔按钮状态切换
var eraserEnabled = false
eraser.onclick = function () {
  eraserEnabled = true
  items.className = 'items useEraser'
}
brush.onclick = function () {
  eraserEnabled = false
  items.className = 'items'
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
  context.fillStyle = 'black'
  context.arc(x, y, radius, 0, Math.PI * 2)
  context.fill()
}
function drawLine(x1, y1, x2, y2) {
  context.beginPath()
  context.strokeStyle = 'black'
  context.lineWidth = 5
  context.moveTo(x1, y1)
  context.lineTo(x2, y2)
  context.stroke()
  context.closePath()
}

//监听鼠标的动作
function listenToMouse(canvas) {
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