
const gameBoard = ( ()=>{

    let currentBoard = document.querySelectorAll('.box');

    let board = [ [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                  [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                {mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}]];

    function changeBoard(row,column,mark){
       board[row][column] = mark;
    }


    const isFull = () => {
        const a = board.filter(a => a === "_");
        if (a.length === 0) {
          return true;
        }
        return false;
      };




// after every move either check if win, check if draw ( have a counter for 9 spaces, or check if board is full)

const playerFactory = (name, mark) => {
    return{name,mark};
  };

  checkWin = (mark)=>{

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

})();
const startGame = () => {
    getPlayersNames();
    

};




const addmark = (mark,x,y,turn) => {
    let box= document.get;
    
    box.textContent=mark;
    turn=turnCheck(turn);
    return turn;
};

const turnCheck =(turn) => {

    turn = turn===1 ? 2 : 1 ;
    return turn;
};


const getPlayersNames= () => {

  let name1 = document.getElementById('firstPlayerNameInput');
  let name2 = document.getElementById('secondPlayerNameInput');
  return {name1,name2};
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
