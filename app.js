const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time')
const timeEl = document.querySelector('#timer')
const board = document.querySelector('#board')
const scoreEl =  document.querySelector('#score')

let time = 0;
let score = 0;

// Start the game button

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up')
})

// Time buttons

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time_btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
        scoreEl.innerHTML = '00'
    }
})

// Hitting the circle

board.addEventListener('click', event => {
    if(event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
        showScore(score)
    }
})

// Start the game 

function startGame() {
    let countdown = 4
    function startCounter() {
        countdown--;
        board.innerHTML = `<h1>${countdown}</h1>`

        if(countdown <= 0) {
            board.innerHTML = ''
            clearInterval(gameCountdown)
            gameCounter = setInterval(decreaseTime, 1000)
            createRandomCircle()
            circleCreationCounter = setInterval(createRandomCircle, 2000)
            setTime(time)
        }
    }
    const gameCountdown = setInterval(startCounter, 1000)
}

// Decrease time

function decreaseTime() {
    if(time === 0) {
        finishGame()
    } else {
        let current = --time 
        if(current < 10) {
        current = `0${current}`
        }
        setTime(current)
    }
}

// Show time

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

// Show score

function showScore(score) {
    if(score > 9) {
        scoreEl.innerHTML = `${score}`
    } else {
        scoreEl.innerHTML = `0${score}`
    }
}

// End the game

function finishGame() {
    board.innerHTML = `<h1>Score: <span class="primary">${score}</span></h1><button class="btn" id="btn">Try again</button>`

    clearInterval(gameCounter)
    clearInterval(circleCreationCounter)
    
    const btn = document.querySelector('#btn')
    btn.addEventListener('click', () => {
        board.innerHTML = '';
        screens[1].classList.remove('up')
        
        score = 0;
    })
}

// Circles creation

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${x}px`
    circle.style.left = `${y}px`
    circle.style.background = getRandomColor()

    board.appendChild(circle)
    setInterval(function() {
        circle.style.display = 'none'
    }, 3000)
}

// Random circles colors

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}
