const gameBoard = ( ()=>{

    let currentBoard = document.querySelectorAll('.box');

    let board = [ [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                  [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                {mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}]];

    function changeBoard(row,column,mark){
       board[row][column] = mark;
    }


    const isFull = () => {
        const a = board.filter(a => a === "");
        if (a.length === 0) {
          return true;
        }
        return false;
      };




// after every move either check if win, check if draw ( have a counter for 9 spaces, or check if board is full)

const playerFactory = (name, mark) => {
    return{name,mark};
  };

  let players=[];
  checkWin = (mark)=>{

    for(var i = 0 ; i < 3 ; i++){
        if(board[i][0] == mark && board[i][1] == mark && board[i][2] == mark){return true;}
    }

   for(var i = 0 ; i < 3 ; i++){
        if(board[0][i] == mark && board[1][i] == mark && board[2][i] == mark){  return true;}
    }

   if(board[0][0] == mark && board[1][1] == mark && board[2][2] == mark){ return true;}
   if(board[0][2] == mark && board[1][1] == mark && board[2][0] == mark){return true;}
    return false;
}

})();



const startGame = (name1,name2) => {
    let turn=1;
    setPlayersNames(name1,name2);
    // do we need this function?
    const playerMove = (x,y) => {
        mark = turn===1 ? "X": "O" ;
        addMark(mark,x,y);
        checkWin(mark);
        isFull();
        turnCheck(turn)
    };

    const addMark = (mark,x,y) => {
    
        board[x][y].mark=mark;
        board[x][y].checked=true;
    
    };
    
    const turnCheck =(turn) => {
    
        turn = turn===1 ? 2 : 1 ;
        return turn;
    };
    
    
    const setPlayersNames= (name1,name2) => {
    
      let player1 = playerFactory(name1,'X');
      let player2 = playerFactory(name2,'O');
        players.push(player1);
        players.push(player2);
      return {name1,name2};
    };


};





const resetBoard = () => {
    let board = [ [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                  [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                {mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}]];
    return board;
            };

/*
  init game (); gets first player name second player name
  1. sets turn to the first playe
  2. waits for the player to clck a box
  3. when the player clicks a box it will trigger its method
  4. the method sets the players mark to the box also get x and y of the box to
  set it on the 2d array of the logic part
  5. check if we have a win if not gives the turn to the second player
  2



 */
