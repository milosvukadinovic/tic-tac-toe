const GameBoard = ( ()=>{

    let CurrentBoard = document.querySelectorAll('.Box');

    let Board = [["","",""],
                 ["","",""],
                 ["","",""]];

    function ChangeBoard(row,column,mark){
       Board[row][column] = mark;
    }

});

const playerFactory = (name, mark) => {
    return{name,mark};
  };

  Check_The_Winning_Status = (mark)=>{

    for(var i = 0 ; i < 3 ; i++){
        if(Board[i][0] == mark && Board[i][1] == mark && Board[i][2] == mark){return true;}
    }

   for(var i = 0 ; i < 3 ; i++){
        if(Board[0][i] == mark && Board[1][i] == mark && Board[2][i] == mark){  return true;}
    }

   if(Board[0][0] == mark && Board[1][1] == mark && Board[2][2] == mark){ return true;}
   if(Board[0][2] == mark && Board[1][1] == mark && Board[2][0] == mark){return true;}
    return false;
}
