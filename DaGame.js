var P1 = [1,0]
var P2 = [2,0]
const dim = 3

function movePlayer(dir, p){
  return tile[p[0]][p[1]][dir];
}

var tile = new Array(dim);
for(var i = 0; i < dim; i++)
  tile[i] = new Array(dim);

//  {
//   for(var j = 0; j < dim; j++){
//     if(i == 0){
//       if(j > 1)          tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//       else if(j < dim-1) tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//       else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//     }
//     else if (i == dim-1){
//       if(j > 1)          tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//       else if(j < dim-1) tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//       else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//     }
//     else {
//       if(j > 1)          tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//       else if(j < dim-1) tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//       else               tile[i][j] = {left:[i,j-1], right:[i,j+1], up:[i-1,j], down:[i+1,j]}
//     }
//
//   }
// }


var tile = new Array(dim);
for(var i = 0; i < dim; i++) {
  tile[i] = new Array(dim);
  for(var j = 0; j < dim; j++){
    tile[i][j] = {left:[i,(j+(dim-1))%dim], right:[i,(j+1)%dim], up:[(i+(dim-1))%dim,j], down:[(i+1)%dim,j]}
  }
}

tile[0][0] = {left:[0,2], right:[0,0], up:[2,0], down:[1,0]}
tile[0][1] = {left:[0,1], right:[0,1], up:[1,2], down:[1,1]}
tile[0][2] = {left:[0,2], right:[0,2], up:[0,0], down:[1,2]}
tile[1][0] = {left:[1,0], right:[1,0], up:[0,0], down:[2,0]}
tile[1][1] = {left:[1,1], right:[1,1], up:[0,1], down:[2,1]}
tile[1][2] = {left:[1,2], right:[0,1], up:[0,2], down:[1,2]}
tile[2][0] = {left:[2,2], right:[2,0], up:[1,0], down:[0,0]}
tile[2][1] = {left:[2,1], right:[2,2], up:[1,1], down:[2,1]}
tile[2][2] = {left:[2,1], right:[2,0], up:[2,2], down:[2,2]}

[P1,P2] = move("left", P1, P2)
console.log(P2)
//alert([P1, P2])
