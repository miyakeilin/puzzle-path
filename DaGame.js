const dim = 3
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
