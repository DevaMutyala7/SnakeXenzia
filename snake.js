const container = document.querySelector('#container')
let snakesquare = []
let currentsnake = [2,1,0]
let direction = 1;
let tail = 0;
let speed = 0.8
let intervalTime = 1000
let timerId = 0
let num =0
let score =0

let scorespan = document.getElementById('score')
scorespan.innerText = score

const createGrid = () =>{
    for(let i =0; i<100; i++)
    {
        const div = document.createElement("div")

        div.classList.add("field")

        container.appendChild(div)

        snakesquare.push(div)

    }
}

createGrid()

currentsnake.forEach(div => snakesquare[div].classList.add("active"))
 
const move =  () =>{

    if(
        (currentsnake[0] % 10 === 0 && direction === -1)||
        (currentsnake[0] % 10 === 9 && direction === 1) ||
        (currentsnake[0] - 10 < 0 && direction === -10) ||
        (currentsnake[0] + 10 >= 100 && direction === 10) ||
        snakesquare[currentsnake[0] + direction].classList.contains("active")
    )
    {
         gameOver()
         return
    }
    
    let tail = currentsnake.pop()

    snakesquare[tail].classList.remove("active")

    currentsnake.unshift(currentsnake[0] + direction)

    snakesquare[currentsnake[0]].classList.add("active")

    if(snakesquare[currentsnake[0]].classList.contains("apple"))
    {
        score++
        scorespan.innerText=score
        snakesquare[currentsnake[0]].classList.remove("apple")
        snakesquare[tail].classList.add("active")
        currentsnake.push(tail)
        generateApple()
        clearInterval(timerId)
        intervalTime = intervalTime * speed
        timerId = setInterval(move,intervalTime)
    }

}


const control = (e) =>{
    if(e.keyCode == 40)
    {       
        direction = 10;
    }
    else if(e.keyCode == 38)
    {  
        direction = -10
    }
    else if(e.keyCode == 37)
    {  
        direction = -1
    }
    else if(e.keyCode == 39)
    {     
        direction = 1
    }
}

const button = document.querySelector("#start")
button.addEventListener("click",()=>{
    document.getElementById('msg').style.display="none"
    score=0
    scorespan.innerText = score
    clearInterval(timerId)
    currentsnake.forEach(item=>snakesquare[item].classList.remove("active"))
    snakesquare[num].classList.remove("apple")
    currentsnake = [2,1,0]
    speed = 0.9
    intervalTime = 1000
    timerId = 0
    direction=1;
    generateApple()
    currentsnake.forEach(item=>snakesquare[item].classList.add("active"))
    timerId = setInterval(move,intervalTime)    
})

const generateApple = () =>{
    num = Math.floor(Math.random() * 100)
    snakesquare[num].classList.add("apple")
}


generateApple()
document.addEventListener("keyup",control)

function gameOver(){
    document.getElementById('msg').style.display="flex"
    return clearInterval(timerId)
}

document.getElementById("close").addEventListener("click",()=>{
    document.getElementById('msg').style.display="none"
})