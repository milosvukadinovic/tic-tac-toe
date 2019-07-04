const GameBoard = ( ()=>{
    
    let CurrentBoard = document.querySelectorAll('.Box');

    let Board = [["","",""],
                 ["","",""],
                 ["","",""]];

    function ChangeBoard(row,column,mark){
       Board[row][column] = mark;
    }


    const isFull = () => {
        const a = Board.filter(a => a === "_");
        if (a.length === 0) {
          return true;
        }
        return false;
      };



// after every move either check if win, check if draw ( have a counter for 9 spaces, or check if board is full)

const playerFactory = (name, mark) => {
    return{name,mark};
  };

  CheckWin = (mark)=>{
    
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

//Add Marker to Boxs
CurrentBoard.forEach((Box)=>{
  Box.addEventListener('click',()=>{
      let nth_child = Box.getAttribute('data-number');
      if(Player1.Chance === "0" && Box.innerHTML === "<h1> </h1>"){
          var row  = Math.floor(Number(nth_child/3));
          var column = nth_child%3;
          ChangeBoard(row,column,0);
            Box.innerHTML = '<h1>o</h1';
          Player1.Chance = "1";
          Player2.Chance = "0";
          Total_Boxes_Got_Filled += 1;
          if(Total_Boxes_Got_Filled > 4){
              if(CheckWin("0")){
                  console.log("Player1 Won");
                  Total_Boxes_Got_Filled = 0;
                  info_about_user.innerHTML = '<p>'+firstPlayerName.value+' Won...</p>';
                  ResetAll();
                  return true;
              }
          }
          info_about_user.innerHTML = '<p>'+secondPlayerName.value+' playing...</p>';
      }
      else if(Player2.Chance === "0" && Box.innerHTML === "<h1> </h1>"){
          var row  = Math.floor(Number(nth_child/3));
          var column = nth_child%3;
          ChangeBoard(row,column,1);
          Box.innerHTML = '<h1>x</h1';
          Player1.Chance = "0";
          Player2.Chance = "1";

          Total_Boxes_Got_Filled += 1;
          if(Total_Boxes_Got_Filled > 4){
              if(CheckWin("1")){
                  Total_Boxes_Got_Filled = 0;
                  info_about_user.innerHTML = '<p>'+secondPlayerName.value+' Won...</p>';
                  ResetAll();
                  return true;
              }
          }
          info_about_user.innerHTML = '<p>'+firstPlayerName.value+' playing...</p>';
      }
      if(Total_Boxes_Got_Filled == 9){
          Total_Boxes_Got_Filled = 0;
          info_about_user.innerHTML = '<p>Draw...</p>';
          ResetAll();
          return true;
      }
  });
})();
