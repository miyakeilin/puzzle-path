const dim = 3
var WIN_CONDITION
const tileSize = 80;
const playerSize = tileSize / 4;
const centering = ((tileSize / 2) - (playerSize / 2)); // Centers the square
var gameFinished

function checkGameOver() {
  coordP1 = [myGameArea.P1.i, myGameArea.P1.j]
  coordP2 = [myGameArea.P2.i, myGameArea.P2.j]
  if (pointsEqual(coordP1, WIN_CONDITION[0]) && pointsEqual(coordP2, WIN_CONDITION[1])) gameFinished = true
  if (pointsEqual(coordP2, WIN_CONDITION[0]) && pointsEqual(coordP1, WIN_CONDITION[1])) gameFinished = true
}

function pointsEqual(p1, p2) {
  if (p1[0] == p2[0] && p1[1] == p2[1]) return true
  else return false
}

function genArena() {
  WIN_CONDITION = [
    [1, 2],
    [0, 2]
  ]

  tile = new Array(dim);
  for (var i = 0; i < dim; i++) {
    tile[i] = new Array(dim);
    for (var j = 0; j < dim; j++) {
      if (i == 0) {
        if (j == 0) tile[i][j] = {
          left: [i, j],
          right: [i, j + 1],
          up: [i, j],
          down: [i + 1, j]
        }
        else if (j == dim - 1) tile[i][j] = {
          left: [i, j - 1],
          right: [i, j],
          up: [i, j],
          down: [i + 1, j]
        }
        else tile[i][j] = {
          left: [i, j - 1],
          right: [i, j + 1],
          up: [i, j],
          down: [i + 1, j]
        }
      } else if (i == dim - 1) {
        if (j == 0) tile[i][j] = {
          left: [i, j],
          right: [i, j + 1],
          up: [i - 1, j],
          down: [i, j]
        }
        else if (j == dim - 1) tile[i][j] = {
          left: [i, j - 1],
          right: [i, j],
          up: [i - 1, j],
          down: [i, j]
        }
        else tile[i][j] = {
          left: [i, j - 1],
          right: [i, j + 1],
          up: [i - 1, j],
          down: [i, j]
        }
      } else {
        if (j == 0) tile[i][j] = {
          left: [i, j],
          right: [i, j + 1],
          up: [i - 1, j],
          down: [i + 1, j]
        }
        else if (j == dim - 1) tile[i][j] = {
          left: [i, j - 1],
          right: [i, j],
          up: [i - 1, j],
          down: [i + 1, j]
        }
        else tile[i][j] = {
          left: [i, j - 1],
          right: [i, j + 1],
          up: [i - 1, j],
          down: [i + 1, j]
        }
      }
    }
  }
  return tile
}

function component(width, height, color, i, j) {
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
  return ((2 * pos) + 1) * centering + (pos) * playerSize;
}

var myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = dim * tileSize;
    this.canvas.height = dim * tileSize;
    this.context = this.canvas.getContext("2d");

    this.P1.update()
    this.P2.update()
    myGameArea.draw();

    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    // this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
  draw: function() {

    this.context.moveTo(5, 0);
    this.context.lineTo(5, tileSize * 3);
    this.context.moveTo(5, 5);
    this.context.lineTo(tileSize * 3, 5);
    this.context.moveTo(tileSize * 3, tileSize * 3 - 5);
    this.context.lineTo(5, tileSize * 3 - 5);
    this.context.moveTo(tileSize * 3 - 5, 5);
    this.context.lineTo(tileSize * 3 - 5, tileSize * 3 - 5);
    this.context.strokeStyle = "black";
    this.context.lineWidth = 10;
    this.context.stroke();
  },
  tile: genArena(),
  makeMove: function(dir) {
    var temp1 = this.tile[this.P1.i][this.P1.j][dir]
    var temp2 = this.tile[this.P2.i][this.P2.j][dir]
    if (temp1[0] != temp2[0] || temp1[1] != temp2[1]) {
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
  P1: new component(playerSize, playerSize, "red", 1, 0),
  P2: new component(playerSize, playerSize, "blue", 2, 0)
}

function updateGameArea(dir) {
  myGameArea.clear();
  myGameArea.makeMove(dir);
  myGameArea.P1.update();
  myGameArea.P2.update();
  myGameArea.draw();
  if (gameFinished) document.getElementById("WIN").innerHTML = "YOU WIN!";
}

function startGame() {
  myGameArea.start();
  gameFinished = false
}

document.onkeydown = function(event) {
  if (!gameFinished) {
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