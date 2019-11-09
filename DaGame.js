var myGuy = [1,2]
const dim = 3

function move(dir){
  return tile[myGuy[0]][myGuy[1]][dir];
}

var tile = new Array(dim);
for(var i = 0; i < dim; i++) {
  tile[i] = new Array(dim);
  for(var j = 0; j < dim; j++){
    if(i == 0){
      if(j > 1)          tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      else if(j < dim-1) tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
    }
    else if (i == dim-1){
      if(j > 1)          tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      else if(j < dim-1) tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
    }
    else {
      if(j > 1)          tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      else if(j < dim-1) tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
      else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
    }

  }
}

myGuy = move("up");
