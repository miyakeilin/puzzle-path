var myGuy = [1,2]
const dim = 3

function move(dir){
  return tile[myGuy[0]][myGuy[1]][dir];
}

var tile = new Array(dim);
for(var i = 0; i < dim; i++) {
  tile[i] = new Array(dim);
  for(var j = 0; j < dim; j++){
    tile[i][j] = {left:[i,j], up:[i+1,j], down:[i-1,j], right:[i,j+1]}
  }
}

myGuy = move("up");
