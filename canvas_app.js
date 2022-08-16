var canvas,
    context,
    dragging = false, 
    dragStartLocation,
    snapshot;

function getCanvasCoordinates(event) {
    var x = event.clientX - canvas.getBoundingClientRect().left;
    var y = event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function takeSnapShot() {
    snapshot = context.getImageData(0, 0, canvas.width, canvas.height);
}

function restoreSnapShot() {
    context.putImageData(snapshot, 0, 0);
}

function drawLine(position) {
    context.beginPath();
    context.moveTo(dragStartLocation.x, dragStartLocation.y);
    context.lineTo(position.x, position.y); 
    context.stroke(); 
}

function drawCircle(position) { 
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    context.arc(dragStartLocation.x, dragStartLocation.y, radius, 0, 2 * Math.PI);
}


function drawEllipse(position) {
  var w = position.x - dragStartLocation.x ;
  var h = position.y - dragStartLocation.y  ;
    var radius = Math.sqrt(Math.pow((dragStartLocation.x - position.x), 2) + Math.pow((dragStartLocation.y - position.y), 2));
    context.beginPath();
    
    var cw = (dragStartLocation.x > position.x) ? true : false;

    console.log(cw);
    context.ellipse(dragStartLocation.x, dragStartLocation.y, Math.abs(w), Math.abs(h), 0, 2 * Math.PI, false);
}


function drawRect(position) {
  console.log(position.x, dragStartLocation.x);
    var w = position.x - dragStartLocation.x ;
    var h = position.y - dragStartLocation.y  ;
    context.beginPath();
    context.rect(dragStartLocation.x, dragStartLocation.y, w, h);
}

function drawSquare(position) {
    console.log(position.x, dragStartLocation.x);
      var w = position.x - dragStartLocation.x ;
      var h = position.y - dragStartLocation.y  ;
      context.beginPath();
      context.rect(dragStartLocation.x, dragStartLocation.y, w, w);
  }

function draw(position) {
    var fillBox = document.getElementById("fillBox")
        , shape = document.querySelector('input[type="radio"][name="shape"]:checked').value;
    

    if (shape === "circle") {
        drawCircle(position);
    }
    if (shape === "square") {
        drawSquare(position);
    }
    if (shape === "line") {
        drawLine(position);
    }
    if (shape === "ellipse") {
        drawEllipse(position);
    }
    if (shape === "rect") {
        drawRect(position);
    }
    if (fillBox.checked) {
        context.fill();
    } else {
        context.stroke();
    }
}

function dragStart(event) {
    dragging = true;
    dragStartLocation = getCanvasCoordinates(event);
    takeSnapShot();
}

function drag(event) {
    var position;
    if (dragging === true) {
        restoreSnapShot();
        position = getCanvasCoordinates(event);
        draw(position);
    }
}

function dragStop(event) {
    dragging = false; 
    restoreSnapShot();
    var position = getCanvasCoordinates(event);
    draw(position);
}

function changeLineWidth() {
    context.lineWidth = this.value;
    event.stopPropagation();
}

function changeFillStyle() {
    context.fillStyle = this.value;
    event.stopPropagation();
}

function changeStrokeStyle() {
    context.strokeStyle = this.value;
    event.stopPropagation();
}

function eraseCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    document.getElementById("canvas").style.backgroundColor="#FFFFFF";

}


function init() {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');


    var lineWidth = document.getElementById('lineWidth'),
        fillColor = document.getElementById('fillColor'),
        strokeColor = document.getElementById('strokeColor'),
        clearCanvas = document.getElementById('clearCanvas');
   
    context.lineWidth = lineWidth.value;

    context.fillStyle = fillColor.value;

    canvas.addEventListener('mousedown', dragStart, false);
    canvas.addEventListener('mousemove', drag, false);
    canvas.addEventListener('mouseup', dragStop, false);
    lineWidth.addEventListener('input', changeLineWidth, false);
    fillColor.addEventListener('input', changeFillStyle, false);
    strokeColor.addEventListener('input', changeStrokeStyle, false);
    clearCanvas.addEventListener('click', eraseCanvas, false);
}

window.addEventListener('load', init, false);

  
var pink= document.getElementById("chPink");
{
    pink.addEventListener("click", function(e)
    {
     document.getElementById("canvas").style.backgroundColor="#F6DAE4";
    })
}
 
var mint= document.getElementById("chMint");
{
    mint.addEventListener("click", function(e)
    {
     document.getElementById("canvas").style.backgroundColor="#D4F0F7";
    })
}

var lavender= document.getElementById("chLavender");
{
    lavender.addEventListener("click", function(e)
    {
     document.getElementById("canvas").style.backgroundColor="#D0D5F7";
    })
}

var blue= document.getElementById("chBlue");
{
    blue.addEventListener("click", function(e)
    {
     document.getElementById("canvas").style.backgroundColor="#B8CFEC";
    })
}

var blue= document.getElementById("chPeach");
{
    blue.addEventListener("click", function(e)
    {
     document.getElementById("canvas").style.backgroundColor="#FFE5B4";
    })
}

  var button=document.getElementById('save');
  button.addEventListener('click', function(ev){
      const a=document.createElement("a");
      a.href=canvas.toDataURL();
      a.download="canvas.png";
      a.click();
  });