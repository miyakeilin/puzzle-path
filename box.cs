public class box {
  boolean mine;
  boolean colored;

  public box(boolean isMine){
    colored = false;
    if(isMine) mine = true;
    else mine = false;
  }

  public int colorIn(){
    if(mine) return 0;
    else colored = true;
    return 1;
  }
}
