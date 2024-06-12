
var myGamePiece;
var replacementBlock;
let cooldown = 0;
let TetrisMusic = document.getElementById("TetrisMusic")
var blocks = [];
var grid = [];

function startGame() {
    myGamePiece = new component(20, 20, "red", 0, 0);
    for (let i = 0; i < 20; i++) {
        grid[i] = [];
        for (let j = 0; j < 10; j++) {
            grid[i][j] = 0;
        }
    }
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
       // TetrisMusic.play();
        TetrisMusic.volume = 0.7;
       
        this.canvas.width = 100;
        this.canvas.height = 200;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 10);
        this.interval = setInterval(blockFall, 200)
        this.interval = setInterval(inputLag, 200)
        this.context.fillRect(10,10,10,10)
        window.addEventListener('keydown', function (e) {
            myGameArea.key = e.keyCode;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.key = false;
        })
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.update = function(){1
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.fillRect(myGamePiece.x,myGamePiece.y,10,10)
    }
    this.newPos = function() {
        if (myGameArea.key && myGameArea.key == 37 && cooldown == 0 && myGamePiece.x != 0) {myGamePiece.x += -10, cooldown = 1;}
        if (myGameArea.key && myGameArea.key == 39  && cooldown == 0 && myGamePiece.x != 80) {myGamePiece.x += 10, cooldown = 1;}     
    }
}

function newBlock(width, height, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;  
    console.log(myGamePiece.x, myGamePiece.y)
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    }



function updateGameArea() {

    myGameArea.clear();
    myGamePiece.update();
    for (let i = 0; i < blocks.length; i++) {
        blocks[i].update();
    }
    myGamePiece.newPos();    
    myGamePiece.update();
}
function blockFall() {
    if (myGamePiece.y < 180 && canMove(myGamePiece.x,myGamePiece.y,"square")==true) {
        canMove(myGamePiece.x,myGamePiece.y,"square")
        myGamePiece.y += 10;
      //  console.log(myGamePiece.x,myGamePiece.y)
    } else {
   
        let gridX = myGamePiece.x / 10;
        let gridY = myGamePiece.y /10 + 1;

        grid[gridY][gridX] = 1;
        grid[gridY-1][gridX] = 1;
        grid[gridY][gridX+1] = 1;
        grid[gridY-1][gridX+1] = 1;
        console.log(grid)
        blocks.push(new component(myGamePiece.width, myGamePiece.height, "green", myGamePiece.x, myGamePiece.y));
   myGamePiece.y = 0;
   myGamePiece.x = 50;
}}

function canMove(x,y,Shape) {
    let gridxtest = myGamePiece.x / 10;
    let gridytest = myGamePiece.y /10 + 1;
console.log(gridytest,gridxtest)
if (grid[gridytest+1][gridxtest] == 1 || grid[gridytest+1][gridxtest+1] == 1) {
    console.log("sii")
    return false;
}
else {return true;
    console.log("no")
}
}

function inputLag() {
    cooldown = 0;   
}

