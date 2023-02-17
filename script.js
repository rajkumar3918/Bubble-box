var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var coordinates = {
    x : undefined,
    y : undefined
}
window.addEventListener('mousemove',(event)=>{
    coordinates.x = event.x;
    coordinates.y = event.y;
})

var colorArray = [
    "rgb(3, 90, 120)",
    "deepskyblue",
    "rgb(174, 250, 61)",
    "rgb(49, 51, 52)",
];

function Circle(x, y, dx, dy, radius, minradius){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minradius = minradius
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)] ;

    this.draw = function(){
        
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = "black";
        c.stroke();
        c.fillStyle = this.color
        c.fill()
    }

    this.move = function(){
                
        if(this.x + radius > window.innerWidth || this.x - radius < 0){
            this.dx = -this.dx
        }

        if(this.y + radius > window.innerHeight || this.y - radius < 0){
        this.dy = -this.dy
        }

        this.x += this.dx;
        this.y += this.dy;

        if(coordinates.x - this.x < 50 && coordinates.x - this.x > -50 && coordinates.y - this.y <50 && coordinates.y - this.y > -50 && this.radius < 30 ){
            this.radius +=1;
        }else if(this.radius > this.minradius) {
            this.radius -=1;
        }

        this.draw();
    }

}

var circleArray = [];

for(var i=0; i< 1000; i++){

    var x = Math.random()*(window.innerWidth - radius*2) + radius;
    var y = Math.random()*(window.innerHeight - radius*2) + radius;
    var radius = 6;
    var dx = (Math.random()*2)+0.2;
    var dy = (Math.random()*2)+0.2;
    var minradius = Math.random()*5 + 1;
    circleArray.push(new Circle(x, y, dx, dy, radius, minradius));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(var i=0; i < circleArray.length; i++){

        circleArray[i].move();
    }
    
}
animate();