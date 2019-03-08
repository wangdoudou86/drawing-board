var yyy = document.getElementById('xxx')
var context = yyy.getContext('2d')

setCanvasSize(yyy)
listenToUser(yyy)
//切换颜色
var colors = document.getElementById('colors')
colors.addEventListener('click',function(e){
  let eClick = e.target
  let color = eClick.id
  context.fillStyle = color
  context.strokeStyle = color
  colors.querySelector('.active').classList.remove('active')
  eClick.classList.add('active') 
})

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
  // context.clearRect(0,0,yyy.width,yyy.height) 这种方法保存图片时背景会变透明
  context.fillStyle = "white"
  context.beginPath() 
  context.fillRect(0,0,yyy.width,yyy.height)  
  context.closePath() 
}
//切换粗细
var lineSize = 5
var sizes = document.querySelector('#sizes')
var sizeLi = sizes.querySelectorAll('li')
for(let i=0;i<sizeLi.length;i++){
  sizeLi[i].addEventListener('click',function(){
      switch(this.className){
        case 'thin':
         lineSize = 4
         break;
        case 'middle':
         lineSize = 5
         break;
        case 'thick':
         lineSize = 8
         break;
      }
      sizes.querySelector('.active').classList.remove('active')
      this.classList.add('active')  
  })
}


//下载到本地
download.onclick = function(){
  var url = yyy.toDataURL('image/png')
  var a = document.createElement('a')
  document.body.appendChild(a)
  a.href = url
  a.download = 'picture'
  // a.target = '_blank'
  a.click()
}  


//设置画布大小
function setCanvasSize(canvas) {
  pageSize()
  window.onresize = pageSize
  
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
//橡皮擦
function clearP(x,y,w,h){
  context.clearRect(x - 5, y - 5, w, h)
}

//监听鼠标的动作
function listenToUser(canvas) {
  if(document.body.ontouchstart !== undefined){
    //触屏设备
    var painting = false
    var lastPoint = { x: undefined, y: undefined }
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)
    canvas.ontouchstart = function(a){
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      painting = true
      if (eraserEnabled) {
        clearP(x,y,10,10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }
    canvas.ontouchmove = function(a){
      var x = a.touches[0].clientX
      var y = a.touches[0].clientY
      if (!painting)  return    
      if (eraserEnabled) {
        clearP(x,y,10,10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    canvas.ontouchend = function(){
      painting = false
    }
  }else{
    //非触屏设备
    var painting = false
    var lastPoint = { x: undefined, y: undefined }
    context.fillStyle = 'white'
    context.fillRect(0,0,canvas.width,canvas.height)
    //按下鼠标
    canvas.onmousedown = function (a) {
      var x = a.clientX
      var y = a.clientY
      painting = true
      if (eraserEnabled) {
        clearP(x,y,10,10)
      } else {
        lastPoint = { x: x, y: y }
      }
    }
    //滑动鼠标
    canvas.onmousemove = function (a) {
      var x = a.clientX
      var y = a.clientY
      if (!painting)  return    //发现没有开启使用，就直接退出去，什么操作也不做
      if (eraserEnabled) {
        //不加这个橡皮擦开启时，不按鼠标直接移动也会清除
        clearP(x,y,10,10)
      } else {
        var newPoint = { x: x, y: y }
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
        lastPoint = newPoint
      }
    }
    //松开鼠标
    canvas.onmouseup = function () {
      painting = false
    }
  }
}