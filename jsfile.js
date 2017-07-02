

window.addEventListener("load", function () {

    "use strict";
    var c = document.getElementById("canvas"),
        canvas = $('canvas'),
        b = document.getElementById("body"),
        slide = document.getElementById("range"),
        ctx = c.getContext("2d"),
        width,
        height,
        ball = [],
        intervalHandle = null,
        interval = 50,
        num_balls = 15;
        
    

    function canvas_size() {
        canvas.attr('width', $(document).width() - 20);
        canvas.attr('height', $(document).height() - 20);
        width = c.width;
        height = c.height;
    }

    
// the object for each ball
    function Balls(top_pos, left_pos, top, left, size, direction) {
        this.topPosition = top_pos;
        this.leftPosition = left_pos;
        this.leftMovement = left;
        this.topMovement = top;
        this.size = size;
        this.direction = direction;
    }
    
    // clear the canvas then redraw the balls in new places
    function bounceBalls(amount) {
        ctx.clearRect(0, 0, width, height);
        var x;
        for (x = 0; x < amount; x++) {
            if (ball[x].leftPosition < 0 || ball[x].leftPosition > width) {
                ball[x].leftMovement = -ball[x].leftMovement;
            }
            if (ball[x].topPosition < 0 || ball[x].topPosition > height) {
                ball[x].topMovement = -ball[x].topMovement;
            }
            ball[x].leftPosition += ball[x].leftMovement;
            ball[x].topPosition += ball[x].topMovement;
            ctx.fillStyle = "RGBA(0,204,204,0.5)";
            ctx.strokeStyle = "RGBA(0,140,140,1)";
            ctx.lineWidth = 4;
            ctx.beginPath();
            ctx.arc(ball[x].leftPosition, ball[x].topPosition, ball[x].size, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }
    
    // generate a random location for each circle
    function drawCircles(amount) {
        var x,
            top = 1,
            left = 1,
            top_pos,
            left_pos,
            size;
        for (x = 0; x < amount; x++) {
            top_pos = Math.floor((Math.random() * height) + 1);
            left_pos = Math.floor((Math.random() * width) + 1);
            size = Math.floor((Math.random() * 40) + 5);
            left = Math.random();
            top = Math.random();
            ball[x] = new Balls(top_pos, left_pos, top, left, size);
            // draw the first circles
            ctx.fillStyle = "#00CCCC";
            ctx.beginPath();
            ctx.arc(left, top, 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // for changing the amount of balls
    function changeNumber() {
        document.getElementById("number").innerHTML = "Number of balls: " + slide.value;
        drawCircles(slide.value);
        num_balls = slide.value;
    }
    slide.onchange = function () {
       changeNumber();
    };
    slide.oninput = function () {
        changeNumber();
    };
    
    canvas_size();
    c.width = width;
    c.height = height;
    // called at the start so there isn't a wait when page is loaded
    drawCircles(num_balls);
    // loads every 10ms for bounceBalls (to move)
    setInterval(function () {
        bounceBalls(num_balls);
    },interval);
    setTimeout(function () {
        
    }, 5000);
    window.addEventListener("resize", function () {
        canvas_size();
    });
});
