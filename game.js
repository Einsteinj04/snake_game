const canvas = document.getElementById('game_board')
const ctx = canvas.getContext('2d')
const CANVAS_WIDTH = canvas.width;
const CANVAS_HEIGHT = canvas.height;
const snakeXsize = CANVAS_WIDTH/20
const snakeYsize = CANVAS_HEIGHT/20
const step = 1;
const SIZE = 20;
let foodX = Math.floor(Math.random() * SIZE)
let foodY = Math.floor(Math.random() * SIZE);
let snakeDirection;
let snakeLength = 0;
let snakeParts = [{snakeX:0,snakeY:0}]
let score = 0
let gulp = new Audio('gulp.mp3')
const failgame = new Audio('failgame.mp3')
let gameOver = false

const isGameOver = () =>{
    ctx.fillStyle = "#71d841";
    ctx.font = "bold 70px Space Grotesk";
    ctx.fillText(`GAME OVER`, (canvas.width/2) - 190, canvas.height/2);
    failgame.play()
    gameOver = true
}
const drawSnake = () =>{
    ctx.beginPath()
    ctx.fillStyle = "white";
    ctx.font = "bold 18px Space Grotesk";
    // 'Space Grotesk', sans-serif
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 20);
    ctx.fillStyle = '#1B998B'
    snakeParts.forEach((parts) => {
        ctx.fillRect( parts.snakeX * SIZE, parts.snakeY * SIZE,snakeXsize,snakeYsize)
    })
    ctx.closePath()

}
const drawFood = () =>{
    ctx.beginPath()
    ctx.fillStyle = '#CC2936'
    ctx.fillRect(foodX * SIZE, foodY * SIZE,snakeXsize,snakeYsize)
    if(snakeParts[0].snakeX == foodX && snakeParts[0].snakeY == foodY){
        gulp.play()
        score++
        foodX = Math.floor(Math.random() * SIZE)
        foodY = Math.floor(Math.random() * SIZE);


        for(let i = 0; i < snakeParts.length; i++){ // This is to make sure that the food doesn't overlap with the snake body
            if(snakeParts[i].snakeX == foodX && snakeParts[i].snakeY == foodY){
                foodX = Math.floor(Math.random() * SIZE)
                foodY = Math.floor(Math.random() * SIZE);
            } 
        }
    } else{
        snakeParts.pop()
    }
    ctx.closePath()
}
const checkCollision = () => {
   if(snakeParts[0].snakeX < 0 || snakeParts[0].snakeX > (SIZE-1)){
      isGameOver()
    }
    if(snakeParts[0].snakeY < 0 || snakeParts[0].snakeY > (SIZE-1)){
        isGameOver()
    }
    for(let i = 1; i < snakeParts.length; i++){ //To check if the snake collides with itself
        if(snakeParts[i].snakeX == snakeParts[0].snakeX && snakeParts[i].snakeY == snakeParts[0].snakeY){
            isGameOver()
        } 
    }
}
const setDirection = () =>{
    let snakeHead = {...snakeParts[0]}
    switch(snakeDirection){
        case 'Up':
            snakeHead.snakeY-=step;
            break
        case 'Down':
            snakeHead.snakeY+=step;
            break
        case 'Right':
            snakeHead.snakeX+=step;
            break
        case 'Left':
            snakeHead.snakeX-=step;
            break
    }
    snakeParts.unshift(snakeHead)
}
const gameLoop = () =>{
     setTimeout(() => {
        ctx.clearRect(0,0,CANVAS_WIDTH,CANVAS_HEIGHT)
    checkCollision()
        drawSnake()
        setDirection()
         drawFood()
    if(gameOver == false){
        requestAnimationFrame(gameLoop)
    }
    }, 1000/10);
}
requestAnimationFrame(gameLoop)

// CONTROLS
const directionHandler = (e) => {
    if(e.key == 'ArrowUp' && snakeDirection != 'Down'){
       snakeDirection = 'Up'
    }if(e.key == 'ArrowLeft' && snakeDirection != 'Right'){
      snakeDirection = 'Left'
    }if(e.key == 'ArrowRight' && snakeDirection != 'Left'){
      snakeDirection = 'Right'
    }if(e.key == 'ArrowDown' && snakeDirection != 'Up'){
       snakeDirection = 'Down'
    }
 }
 
document.addEventListener('keydown',directionHandler)
