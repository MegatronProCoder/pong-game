import Ball from './ball.js'
import Paddle from './paddle.js'

const ball = new Ball(document.querySelector('.ball'))
const userPaddle = new Paddle(document.querySelector('.left.paddle'))
const computerPaddle = new Paddle(document.querySelector('.right.paddle'))
const computerScore = document.querySelector('.computer-score')
const playerScore = document.querySelector('.player-score')

let startTime 
function update(time){
    if(startTime != null){
        let delta = time - startTime   

        ball.update(delta , [userPaddle.rect() , computerPaddle.rect()])  
        computerPaddle.update(delta , ball.y)
        const hue = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--hue'))
        document.documentElement.style.setProperty('--hue' , hue + (delta*0.002))
    }
    if(ball.rect().right >= window.innerWidth || ball.rect().left <= 0){
        GameOver()
    }
    startTime = time
    window.requestAnimationFrame(update)
}

function GameOver(){
    handleLoss()
    ball.reset()
    computerPaddle.reset()
}

function handleLoss() {
    if (ball.rect().right >= window.innerWidth) {
        // Computer lost
        computerScore.textContent = 1 + parseInt(computerScore.textContent);
    } else if (ball.rect().left <= 0) {
        // Player lost
        playerScore.textContent = 1 + parseInt(playerScore.textContent);
    }
}


document.addEventListener('mousemove' , e =>{
    userPaddle.position = ( e.clientY / window.innerHeight) * 100
})

window.requestAnimationFrame(update)
