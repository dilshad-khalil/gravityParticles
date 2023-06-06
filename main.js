const canvas = document.getElementById("canvas");
const c = canvas.getContext("2d");

//getting window width and window height
let winWidth = window.innerWidth;
let winHeight = window.innerHeight;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//setting mouse cordinate
let Mouse = {
    x: undefined,
    y: undefined
};

let hue = 0;

//empty array to store the particles data
const parArray = [];

let temp = 0;


canvas.addEventListener('click', function(event) {
    Mouse.x = event.x;
    Mouse.y = event.y;
    for (let i = 0; i < 1; i++) {
        parArray.push(new particles());
    }
})

//generate particles on mouseMove 
canvas.addEventListener('mousemove', function(event) {
    //assigning the Mouse x to the current x position on the screen same for y
    Mouse.x = event.x;
    Mouse.y = event.y;
    //adding 1 particle a time
    for (let i = 0; i < 1; i++) {
        parArray.push(new particles());
    }
    temp += 1;

})

canvas.addEventListener('pointerover', function(event) {
    //assigning the Mouse x to the current x position on the screen same for y
    Mouse.x = event.x;
    Mouse.y = event.y;
    //adding 1 particle a time
    for (let i = 0; i < 1; i++) {
        parArray.push(new particles());
    }
    temp += 1;

})


//particle class
class particles {
    constructor() {

            this.x = Mouse.x;
            this.y = Mouse.y;
            this.radius = Math.random() * 10 + 5;
            this.dx = Math.random() * 3 - 1.5;
            this.dy = Math.random() * 3;
            this.gravity = (Math.random() * 0.4) + 0.6;
            this.color = `hsl(${hue} , 100% , 50%)`;

        }
        //a draw funciton to draw the array content
    draw() {
            c.beginPath();
            c.fillStyle = this.color;
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.fill();
        }
        //updating the draw
    update() {
        this.y += this.dy;
        if (this.y > winHeight - this.radius) {
            this.dy = -this.dy;
        } else {
            this.dy += 1;
            this.dy *= this.gravity;
        }
    }
}


//specific function for hadnling the particles and finding the distance between them
function handleParticles() {
    for (let i = 0; i < parArray.length; i++) {
        parArray[i].draw();
        parArray[i].update();

        //to cancele gravity

        // if (parArray[i].y > winHeight - parArray[i].radius) {
        //     parArray.splice(i, 1);
        //     i--;
        // }



        for (let j = i; j < parArray.length; j++) {
            const dx = parArray[i].x - parArray[j].x;
            const dy = parArray[i].y - parArray[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 100) {
                c.beginPath();
                c.strokeStyle = parArray[i].color;
                c.lineWidth = parArray[i].radius / 6;
                c.moveTo(parArray[i].x, parArray[i].y);
                c.lineTo(parArray[j].x, parArray[j].y);
                c.stroke();
            }
        }
    }



    if (temp > 200) {
        for (let i = 0; i < 200; i++) {
            parArray.shift();
        }
        temp = 0;
    }

}

function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = "rgba(0,0,0,0.3)";
    c.fillRect(0, 0, winWidth, winHeight);
    handleParticles()
    hue += 0.5;
}
animate()