public class board{
  box table [][];
  int topNums [];
  int sideNums [];
  int maxBoxes;
  int numMines;

  public board(int dimension){
    table = new box[dimension][dimension];
    for(int i = 0; i < dimension; i++){
      topNums[i] = 0;
      sideNums[i] = 0;
    }
  }
}
