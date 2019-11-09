const dim = 3
var WIN_CONDITION
const tileSize = 80;
const playerSize = tileSize/4;
const centering = ((tileSize/2) - (playerSize/2)); // Centers the square
var gameFinished

function sayHi(){alert("HI")}

function checkGameOver(){
  coordP1 = [ myGameArea.P1.i, myGameArea.P1.j ]
  coordP2 = [ myGameArea.P2.i, myGameArea.P2.j ]
  if(pointsEqual(coordP1, WIN_CONDITION[0]) && pointsEqual(coordP2, WIN_CONDITION[1])) gameFinished = true
  if(pointsEqual(coordP2, WIN_CONDITION[0]) && pointsEqual(coordP1, WIN_CONDITION[1])) gameFinished = true
}

function pointsEqual(p1,p2){
  if(p1[0] == p2[0] && p1[1] == p2[1]) return true
  else return false
}

function genSphere(){
  tile = new Array(dim);
  for(var i = 0; i < dim; i++) {
    tile[i] = new Array(dim);
    for(var j = 0; j < dim; j++){
      tile[i][j] = {left:[i,(j+(dim-1))%dim], right:[i,(j+1)%dim], up:[(i+(dim-1))%dim,j], down:[(i+1)%dim,j]}
    }
  }
  return tile
}

function component(width, height, color, i,j) {
    this.width = width;
    this.height = height;
    this.i = i;
    this.j = j;
    this.x = coordPos(j);
    this.y = coordPos(i);
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function coordPos(pos) {
    return ((2*pos)+1)*centering + (pos)*playerSize;
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = dim * tileSize;
        this.canvas.height = dim * tileSize;
        this.context = this.canvas.getContext("2d");

        this.P1.update()
        this.P2.update()
        myGameArea.draw();

        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        // this.interval = setInterval(updateGameArea, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    draw : function() {
        for (var p = 0; p <= this.canvas.width+tileSize; p += tileSize) {
            this.context.moveTo(0.5 + p, 0);
            this.context.lineTo(0.5 + p, this.canvas.height);
        }
        for (var p = 0; p <= this.canvas.height+tileSize; p += tileSize) {
            this.context.moveTo(0, 0.5 + p);
            this.context.lineTo(this.canvas.width, 0.5 + p);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();
    },
    tile : genSphere(),
    makeMove : function (dir) {
      var temp1 = this.tile[this.P1.i][this.P1.j][dir]
      var temp2 = this.tile[this.P2.i][this.P2.j][dir]
      if(temp1[0] != temp2[0] || temp1[1] != temp2[1]){
        this.P1.i = temp1[0]
        this.P1.j = temp1[1]
        this.P1.x = coordPos(this.P1.j)
        this.P1.y = coordPos(this.P1.i)

        this.P2.i = temp2[0]
        this.P2.j = temp2[1]
        this.P2.x = coordPos(this.P2.j)
        this.P2.y = coordPos(this.P2.i)

        checkGameOver()
      }
    },
    P1 : new component(playerSize,playerSize,"red",1,0),
    P2 : new component(playerSize,playerSize,"blue",2,0)
}

function updateGameArea(dir) {
    myGameArea.clear();
    myGameArea.makeMove(dir);
    myGameArea.P1.update();
    myGameArea.P2.update();
    myGameArea.draw();
    if(gameFinished) document.getElementById("WIN").innerHTML = "YOU WIN!";
}

function startGame() {
    myGameArea.start();
    gameFinished = false
}

document.onkeydown = function(event) {
  if(!gameFinished){
    switch (event.keyCode) {
        case 37:
            updateGameArea('left');
            break;
        case 38:
            updateGameArea('up');
            break;
        case 39:
            updateGameArea('right');
            break;
        case 40:
            updateGameArea('down');
            break;
   }
  }
};
