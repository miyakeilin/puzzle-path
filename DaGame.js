const dim = 3
var WIN_CONDITION
const tileSize = 80;
const playerSize = tileSize/4;
const centering = ((tileSize/2) - (playerSize/2)); // Centers the square
var gameFinished

function sayHi(){alert("HI")}

function checkGameOver(){
  if(P1[0] == WIN_CONDITION[0][0] && P1[1] == WIN_CONDITION[0][1] && P2[0] == WIN_CONDITION[1][0] && P2[1] == WIN_CONDITION[1][1]) gameFinished = true
  if(P2[0] == WIN_CONDITION[0][0] && P2[1] == WIN_CONDITION[0][1] && P1[0] == WIN_CONDITION[1][0] && P1[1] == WIN_CONDITION[1][1]) gameFinished = true
  alert("YOU WIN!")
}

function genPuzzle1(){
  //P1 = [1,0]
  //P2 = [2,0]
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

  return tile
}

function genPuzzle2(){
  WIN_CONDITION = [[0,0],[0,2]]

  tile = new Array(dim);
  for(var i = 0; i < dim; i++)
    tile[i] = new Array(dim);

  tile[0][0] = {left:[3,1], right:[0,0], up:[2,3], down:[1,0]}
  tile[0][1] = {left:[0,1], right:[0,1], up:[3,0], down:[1,1]}
  tile[0][2] = {left:[0,2], right:[0,2], up:[1,3], down:[1,2]}
  tile[0][3] = {left:[0,2], right:[0,2], up:[3,2], down:[1,3]}

  tile[1][0] = {left:[1,0], right:[1,1], up:[0,0], down:[2,0]}
  tile[1][1] = {left:[1,0], right:[1,1], up:[0,1], down:[1,1]}
  tile[1][2] = {left:[1,2], right:[1,2], up:[0,2], down:[2,2]}
  tile[1][3] = {left:[1,3], right:[0,2], up:[0,3], down:[1,3]}

  tile[2][0] = {left:[2,0], right:[2,0], up:[1,0], down:[3,0]}
  tile[2][1] = {left:[2,1], right:[2,2], up:[2,1], down:[3,1]}
  tile[2][2] = {left:[2,1], right:[2,3], up:[1,2], down:[2,2]}
  tile[2][3] = {left:[2,2], right:[0,0], up:[2,3], down:[2,3]}

  tile[3][0] = {left:[0,1], right:[3,0], up:[2,0], down:[3,3]}
  tile[3][1] = {left:[3,1], right:[3,1], up:[2,1], down:[0,0]}
  tile[3][2] = {left:[3,2], right:[3,3], up:[3,2], down:[0,3]}
  tile[3][3] = {left:[3,2], right:[3,0], up:[2,3], down:[3,3]}

  return tile
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
  return tile
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
    this.move = function(dir) {
      [this.i,this.j] = myGameArea.tile[this.j][this.i]['left'] //IF UP DOWN LEFT PROBLEM MAYBE SWITCH I AND J?
      console.log(this)
      this.x = coordPos(this.i)
      this.y = coordPos(this.j)
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
    tile : genPuzzle1(),
    P1 : new component(playerSize,playerSize,"red",0,0)

}

function updateGameArea(dir) {
    myGameArea.clear();
    myGameArea.P1.move(dir);
    myGameArea.P1.update();
    myGameArea.draw();
}

function startGame() {
    myGameArea.start();
    gameFinished = false
}

document.onkeydown = function(event) {
  //if(!gameFinished){
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
   // }
  }
};
