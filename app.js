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

const startGame = () => {
    getPlayersNames();


};



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


 // DOM part
 function initModal() {

   const newGameBtn  = document.getElementById('newGameBtn');
   const modal = document.getElementById("myModal");
   const span = document.getElementsByClassName("close")[0];
   const submitBtn = document.getElementById('submitBtnPlayers');

 return{newGameBtn,modal,span,submitBtn}
 }

 const modalDialog = initModal();

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = (event) => {
   if (event.target == modalDialog) {
     modalDialog.modal.style.display = "none";
   }
 };

 // When the user clicks the button, open the modal
 modalDialog.newGameBtn.onclick = () => {
   modalDialog.modal.style.display = "inline";
 }

 // When the user clicks on <span> (x), close the modal
 modalDialog.span.onclick = function() {
   modalDialog.modal.style.display = "none";
 }



 modalDialog.submitBtn.addEventListener('click',function(){
   const firstPlayerName = document.getElementById('firstPlayerNameInput');
   const secondPlayerName = document.getElementById('secondPlayerNameInput');
   setPlayersNameOnBoard(firstPlayerName.value,secondPlayerName.value)
   modalDialog.modal.style.display = 'none';
 });

 function setPlayersNameOnBoard(firstPlayerName,secondPlayerName){
   document.getElementById('first-player').innerText = firstPlayerName;
   document.getElementById('second-player').innerText = secondPlayerName;

 }

 function playersNamesAreSet(){
   const player1 = document.getElementById('first-player').innerText;
   const player2 = document.getElementById('second-player').innerText;
   return  player1.trim().length  > 0 || player2.trim().length > 0;
 }

 const board = () =>{
   const gridBoard = document.getElementsByClassName('gridBoard')[0];
   const boxes = document.getElementsByClassName('box');
   const resetBtn = document.getElementById('resetGameBtn');
   return {gridBoard,boxes,resetBtn}
 }

 const grid = board();

 for(let box of grid.boxes){

    box.addEventListener('click',(event)=>{
      if(playersNamesAreSet()){
        const  x = event.target.getAttribute('data-x')
        const  y = event.target.getAttribute('data-y')
        event.target.innerText = "X"
        console.log(`x: ${x} y:${y}`);
        // TODO send the data to the logic side
      } else{
       modalDialog.modal.style.display = "inline";
      }


   })
 }

 grid.resetBtn.addEventListener('click',(event) => {
   for(let box of grid.boxes){
     box.innerText = ''
   }
   setPlayersNameOnBoard('','')
   // TODO reset the board on the logic side

 })
