function generateRandomColor(){
  var hexArray = [1,2,3,4,5,6,7,8,9,"A","B","C","D","E","F"];
  var hex = "#"

  for(var i = 0; i < 6; i++){
    var randomIndex = Math.floor(Math.random() * hexArray.length);
    hex += hexArray[randomIndex];
  }
  return hex;
}

const canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var ctx = canvas.getContext("2d");

var mouse = {
  x: undefined,
  y: undefined
}

var maxRadius = 30;

window.addEventListener("mousemove", function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

window.addEventListener("resize", function(){
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  init();
});

function Circle(x,y,radius,dx,dy,color){
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.dx = dx;
  this.dy = dy;
  this.color = color;
  this.minRadius = radius;

  this.draw = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  this.update = function(){
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }

    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }

    this.x = this.x + this.dx;
    this.y = this.y + this.dy;

    //interactivity

    if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50){
      if(this.radius < maxRadius){
        this.radius += 10;
      }
    }else if(this.radius > this.minRadius){
      this.radius -= 1;
    }
    this.draw();
  }
}

var circleArray = [];

function init(){
  console.log("asdasd")
  circleArray = [];
  for(var i = 0; i<800; i++)
  {
    var radius = Math.random() * 3 + 1;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var color = generateRandomColor();
    circleArray.push(new Circle(x,y,radius,dx,dy,color));
  }
}


function animate(){
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  for(var i = 0; i <circleArray.length; i++){
    circleArray[i].update();
  }
}

init();
animate();

