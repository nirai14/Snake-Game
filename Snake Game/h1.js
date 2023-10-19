let gameBoard=document.getElementById("gameBoard");
const context=gameBoard.getContext('2d');
let scoreVal=document.getElementById('scoreVal');
let newGame=document.getElementById("newGame");

let width=gameBoard.width
let height=gameBoard.height
let unit=20

let score=0

let fruitX;
let fruitY;

let xVel=20
let yVel=0

 let active=true
 let started=false
let paused=false

let snake=[
  {x:unit*3 ,y:0},
  {x:unit*2,y:0},
  {x:unit,y:0},
  {x:0,y:0},
]

window.addEventListener('keydown',keypress)
gameStart()

function gameStart(){
context.fillStyle="brown"
context.fillRect(0,0,width,height)
createFruit();
displayfruit();
displaySnake();

}

function clearBoard(){
  context.fillStyle="brown"
context.fillRect(0,0,width,height)
}

//display x and y axis in multiples of unit=20 only then it'll display it properly
//only then it stays inside the conatainer
function createFruit(){
  fruitX=Math.floor(Math.random()*width/unit)*unit
 fruitY=Math.floor(Math.random()*height/unit)*unit
}

function displayfruit(){
    context.fillStyle='orange'
    context.fillRect(fruitX,fruitY,unit,unit)
} 

function displaySnake(){
  context.fillStyle="yellow";
  context.strokeStyle="blue"
  snake.forEach(snakePart=>{
context.fillRect(snakePart.x,snakePart.y,unit,unit);
context.strokeRect(snakePart.x,snakePart.y,unit,unit);
  })
}

 function moveSnake(){
let head={x:snake[0].x+xVel,y:snake[0].y+yVel}
snake.unshift(head)
if(snake[0].x===fruitX && snake[0].y===fruitY){
score += 1
scoreVal.textContent=score
createFruit()
}
else snake.pop()
 }
 //for continueos movement of snake 
function newTick(){
  if(active && !paused){
  setTimeout(()=>{
    clearBoard()
displaySnake();
displayfruit()
moveSnake();
gameOver()
newTick()
  },320)
}

else if(!active){
  clearBoard()
  context.fillStyle="white"
  context.textAlign="center"
  context.fillText("Game over!",width/2,height/2)
context.font="50px bold serif"
}
}


function keypress(event){
 if(!started){
  started=true
newTick()
 }
  if(event.keyCode===32){
    if(!paused) {
      paused=true
    }

    else{
       paused=false
       newTick()
      }
  }
let left=37;
let up=38;
let right=39;
let down=40;
 
if(event.keyCode==left && xVel!=unit){
  xVel=-unit
  yVel=0
}
if(event.keyCode==right && xVel!=-unit ){
  xVel=unit
  yVel=0
}
if(event.keyCode==up && yVel!=unit){
  xVel=0
  yVel=-unit
}
if(event.keyCode==down && yVel!=-unit){
  xVel=0
  yVel=unit
}
}

function gameOver(){
  if(snake[0].x<0||snake[0].x>=width ||snake[0].y<0 ||snake[0].y>height ){
    active=false;
  }
}

newGame.addEventListener("click",()=>{
 clearBoard()
 snake=[
  {x:unit*3 ,y:0},
  {x:unit*2,y:0},
  {x:unit,y:0},
  {x:0,y:0},
]

score=0
xVel=20
yVel=0
started=false
active=true
paused=false
scoreVal.innerHTML=score 

gameStart();

})
