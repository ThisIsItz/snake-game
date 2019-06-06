    var lenght = 4;
    var mycanvas = document.getElementById('myCanvas');
    var ctx = mycanvas.getContext('2d');
    
    var snake = [{x:200, y:160}, {x:180, y:160}, {x:160, y:160}, {x:140, y:160}, {x:120, y:160}];    
    var dx = 20;
    var dy = 0;
    var score = 0;
    let changingDirection = false;
    var gameOverSound = new Audio("./sound/gameover.wav")
    var biteSound = new Audio("./sound/bite.mp3")
    
    function make_base(){
        base_image = new Image();
        base_image.src = 'img/serpiente.jpg';
        base_image.onload = function(){
            ctx.drawImage(base_image, 0, 0);
        }
    }   
    make_base();
    
    var brickRowCount = 25;
        var brickColumnCount = 25;
        var brickWidth = 20;
        var brickHeight = 20;
        var brickPadding = 0.1;
        var brickOffsetTop = 0;
        var brickOffsetLeft = 0;
        var bricks = [];
    
    for(c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1};
            }
        }
    
    function drawBricks() {
            for(c=0; c<brickColumnCount; c++) {
                for(r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status == 1){
                        var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#0095DD";
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }
    
    function paintCanvas(){
        ctx.fillStyle = "white";
        ctx.fillRect (0, 0, mycanvas.width, mycanvas.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect (0, 0, mycanvas.width, mycanvas.height);
    }
    
    function paintGameOver(){
        var my_gradient = ctx.createLinearGradient(0, 0, 0, 400);
        my_gradient.addColorStop(0, "#0D83BD");
        my_gradient.addColorStop(0.5, "#0095DD");
        my_gradient.addColorStop(1, "white");
        ctx.fillStyle = my_gradient;
        ctx.fillRect (0, 0, mycanvas.width, mycanvas.height);
        ctx.strokeStyle = 'black';
        ctx.strokeRect (0, 0, mycanvas.width, mycanvas.height);
        
    }
    
    function clearCanvas(){
        ctx.clearRect(0, 0, mycanvas.width, mycanvas.height);
    }
    
    function drawSnakePart(snakePart) {  
        ctx.fillStyle = 'lightgreen';  
        ctx.strokeStyle = 'darkgreen';
        ctx.fillRect(snakePart.x, snakePart.y, 20, 20);  
        ctx.strokeRect(snakePart.x, snakePart.y, 20, 20);}
    
    function drawSnake() {  
        snake.forEach(drawSnakePart);
    }

    function moveSnake(){
        var head = {x: snake[0].x + dx, y: snake[0].y + dy}
        snake.unshift(head);
        var didEatFood = snake[0].x === foodX && snake[0].y === foodY;  
        if (didEatFood){    
            createFood();  
            biteSound.play();
            score += 10;
            document.getElementById('score').innerHTML = "Score = " + score;
        }else {    
            snake.pop();  
        }
    }
    paintCanvas();
    
    function movingStepByStep(){
        if (gameOver()){
            console.log('game over');
            gameOverSound.play();
            paintGameOver();
            snake = [{x:200, y:160},  {x:180, y:160},  {x:160, y:160},  {x:140, y:160},  {x:120, y:160}];
            drawGameOver();
            $('#button').html("Reset");
            $('#button').attr("disabled",false);
            dy = 0;
            dx = 20;
        }else{
        setTimeout(function onSecond(){
            changingDirection = false;
            paintCanvas();drawBricks();drawFood();moveSnake();drawSnake();movingStepByStep();
        }, 300);
        console.log("YE");
        }
    }
    
    function Start(){
        console.log('iniciar');
        $('#button').attr("disabled",true);
        score = 0;
        document.getElementById('score').innerHTML = "Score = " + 0;
                paintGameOver();
                ctx.font = "30px fontGame";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("3", mycanvas.width/2, mycanvas.height/2); 
                console.log('TRES');
            setTimeout(function countdownTwo(){
                paintGameOver();
                ctx.font = "30px fontGame";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("2", mycanvas.width/2, mycanvas.height/2); 
                console.log('DOS');
            }, 800);
            setTimeout(function countdownOne(){
                paintGameOver();
                ctx.font = "30px fontGame";
                ctx.fillStyle = "black";
                ctx.textAlign = "center";
                ctx.fillText("1", mycanvas.width/2, mycanvas.height/2); 
                console.log('UNO');
            }, 1600);
        setTimeout(function beging(){
            movingStepByStep();
        },2000);
    }

    function changeDirection(event){
        const leftKey = 37;
        const rightKey = 39;
        const upKey = 38;
        const downKey = 40;

        
        if (changingDirection) return;
            changingDirection = true;
        
                const keyPressed = event.keyCode;
        
        const goUp = dy === -20;
        const goDown = dy === 20;
        const goLeft = dx === -20;
        const goRight = dx === 20;
        
        if (keyPressed === leftKey && !dx){
            dx = -20;
            dy = 0;
            console.log('left');
        }else if (keyPressed === rightKey && !dx){
            dx = 20;
            dy = 0;
            console.log('right');
        }else if (keyPressed === upKey && !dy){
            dx = 0;
            dy = -20;
            console.log('up');
        }else if (keyPressed === downKey && !dy){
            dx = 0;
            dy = 20;
            console.log('down');
        } 
    }
    
    document.addEventListener("keydown", changeDirection);
    
    function randomTen(min, max) {
        return Math.round((Math.random() * (max-min) + min) / 20) * 20;
    }
    
    function createFood() {
        foodX = randomTen(0, mycanvas.width -20);
        foodY = randomTen(0, mycanvas.height -20);
            snake.forEach(function isFoodOnSnake(part) {    
            var foodIsOnSnake = part.x == foodX && part.y == foodY    
            if (foodIsOnSnake)      
                createFood();  
            });
    }   
    
    function drawFood(){ 
        ctx.fillStyle = 'red'; 
        ctx.strokestyle = 'darkred'; 
        ctx.fillRect(foodX, foodY, 20, 20); 
        ctx.strokeRect(foodX, foodY, 20, 20);
    }
    createFood();
    
    function gameOver() {
        for (let i = 4; i < snake.length; i++) {
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
        }

      const hitLeftWall = snake[0].x < 0;
      const hitRightWall = snake[0].x > mycanvas.width -20;
      const hitTopWall = snake[0].y < 0;
      const hitBottomWall = snake[0].y > mycanvas.height -20;

        return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall
    }
    
    function drawGameOver(){
        ctx.font = "30px fontGame";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", mycanvas.width/2, mycanvas.height/2); 
    }