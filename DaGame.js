/*const dim = 3
var P1, P2, tile, WIN_CONDITION

function movePlayer(dir, p){
  return tile[p[0]][p[1]][dir];
}

function move(dir){
  P1 = movePlayer(dir, P1)
  P2 = movePlayer(dir, P2)
}

function gameOver(){
  var x = 0
  console.log(P1, P2)
  console.log(WIN_CONDITION[0], WIN_CONDITION[1])
  if(P1[0] == WIN_CONDITION[0][0] && P1[1] == WIN_CONDITION[0][1] && P2[0] == WIN_CONDITION[1][0] && P2[1] == WIN_CONDITION[1][1]) alert("YOU WIN")
  if(P2[0] == WIN_CONDITION[0][0] && P2[1] == WIN_CONDITION[0][1] && P1[0] == WIN_CONDITION[1][0] && P1[1] == WIN_CONDITION[1][1]) alert("YOU WIN")
}

function genPuzzle1(){
  P1 = [1,0]
  P2 = [2,0]
  WIN_CONDITION = [[0,0],[0,2]]

  tile = new Array(dim);
  for(var i = 0; i < dim; i++)
    tile[i] = new Array(dim);
  tile[0][0] = {left:[0,2], right:[0,0], up:[2,0], down:[1,0]}
  tile[0][1] = {left:[0,1], right:[0,1], up:[1,2], down:[1,1]}
  tile[0][2] = {left:[0,2], right:[0,2], up:[0,0], down:[1,2]}
  tile[1][0] = {left:[1,0], right:[1,0], up:[0,0], down:[2,0]}
  tile[1][1] = {left:[1,1], right:[1,1], up:[0,1], down:[2,1]}
  tile[1][2] = {left:[1,2], right:[0,1], up:[0,2], down:[1,2]}
  tile[2][0] = {left:[2,2], right:[2,0], up:[1,0], down:[0,0]}
  tile[2][1] = {left:[2,1], right:[2,2], up:[1,1], down:[2,1]}
  tile[2][2] = {left:[2,1], right:[2,0], up:[2,2], down:[2,2]}
}

function genArena(){
  tile = new Array(dim);
  for(var i = 0; i < dim; i++){
    for(var j = 0; j < dim; j++){
      if(i == 0){
        if(j == 0)          tile[i][j] = {left:[i,j], right:[i,j+1], up:[i,j], down:[i+1,j]}
        else if(j == dim-1) tile[i][j] = {left:[i,j-1], right:[i,j], up:[i,j], down:[i+1,j]}
        else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i,j], down:[i+1,j]}
      }
      else if (i == dim-1){
        if(j == 0)          tile[i][j] = {left:[i,j], right:[i,j+1], up:[i-1,j], down:[i,j]}
        else if(j == dim-1) tile[i][j] = {left:[i,j-1], right:[i,j], up:[i-1,j], down:[i,j]}
        else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i,j]}
      }
      else {
        if(j == 0)          tile[i][j] = {left:[i,j], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
        else if(j == dim-1) tile[i][j] = {left:[i,j-1], right:[i,j], up:[i-1,j], down:[i+1,j]}
        else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      }
    }
  }
}

function genTorus(){
  tile = new Array(dim);
  for(var i = 0; i < dim; i++) {
    tile[i] = new Array(dim);
    for(var j = 0; j < dim; j++){
      tile[i][j] = {left:[i,(j+(dim-1))%dim], right:[i,(j+1)%dim], up:[(i+(dim-1))%dim,j], down:[(i+1)%dim,j]}
    }
  }
}


genPuzzle1()
move("up")
move("left")
move("down")
move("down")
move("down")
move("up")

gameOver()
*/

// Code for reading arrow key presses
document.onkeydown = function(event) {
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
};

// Constants
const dim = 3;
const tileSize = 80; // Tile size always 80 just cause
const playerSize = tileSize/4; // Square will be a quarter of the size of the tile
const centering = ((tileSize/2) - (playerSize/2)); // Centers the square (can't do circle because it is a canvas within a canvas)

// Function that returns a tuple of the real coordinates x, y with i, j input
function coordTuple(posX,posY) {
  var positionX = ((2*posY)+1)*centering + (pos)*playerSize;
  var positionY = ((2*posX)+1)*centering + (pos)*playerSize;
  return [positionX,positionY];
}
// Function that returns a single real coordinate with i or j input
function coordPos(pos) {
  return ((2*pos)+1)*centering + (pos)*playerSize;
}

function startGame() {
  myGameArea.start();
  myGamePiece = new component(playerSize,playerSize,"red",1,1);
  myGamePiece2 = new component(playerSize,playerSize,"blue",0,0);
}   

var myGameArea = {
  canvas : document.createElement("canvas"),
  start : function() {
      this.canvas.width = dim * tileSize; // canvas is function of tile size and dimensions
      this.canvas.height = dim * tileSize;
      this.context = this.canvas.getContext("2d");
      myGameArea.draw(); // Function is later in the class, draws the borders

      document.body.insertBefore(this.canvas, document.body.childNodes[0]); //idk
      this.interval = setInterval(updateGameArea, 20);
  },
  clear : function() {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  draw : function() { // draws the borders
      for (var p = 0; p <= this.canvas.width+tileSize; p += tileSize) {
          this.context.moveTo(p, 0);
          this.context.lineTo(p, this.canvas.height);
      }
      for (var p = 0; p <= this.canvas.height+tileSize; p += tileSize) {
          this.context.moveTo(0, p);
          this.context.lineTo(this.canvas.width, p);
      }
      this.context.strokeStyle = "black";
      this.context.stroke();
      //this.interval = setInterval(updateGameArea, 100);
  }
}

function component(width, height, color, j, i) {
  this.width = width;
  this.height = height;
  this.i = i;
  this.j = j;
  this.x = coordPos(i);
  this.y = coordPos(j);
  this.update = function() {
      ctx = myGameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  this.newPos = function(dir) {
          if (dir == "up") {
              this.j -= 1;
              this.y = coordPos(this.j);
          } else if (dir == "down") {
              this.j += 1;
              this.y = coordPos(this.j);
          } else if (dir == "left") {
              this.i -= 1;
              this.x = coordPos(this.i);
          } else if (dir == "right") {
              this.i += 1;
              this.x = coordPos(this.i);                        
          } else {
              // stay the same position
          }
  }
}

function updateGameArea(direction) {
  myGameArea.clear();
  // Red game piece movement
  myGamePiece.newPos(direction);
  myGamePiece.update();
  // Blue game piece movement
  myGamePiece2.newPos(direction);
  myGamePiece2.update();
  myGameArea.draw();
}
