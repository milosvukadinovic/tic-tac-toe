// this is the game board
const gameBoard = () => {

    const _board = [0,1,2,3,4,5,6,7,8];
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8]
    ];

    const setMark = (mark,index) => {
      if (typeof _board[index] === "number"){
      _board[index] = mark;
      return true;
    }else{
      return false;
    }}
  
    const checkIfFull = () => _board.every(element => typeof element === "string");
     
    const getBoard = () => _board;

    const checkForWinner = (mark,currentPlayer)=> {
      return winningCombos.some(combo => combo.every(e => currentPlayer.moves.includes(e)));
    }

    return { getBoard, setMark, checkIfFull,checkForWinner };
}
const playerFactory = (name, mark) => {
    const moves=[];
    const play = (index,_board) => {
      a=_board.setMark( this.mark,index);
      if(a){
        moves.push(index);
        return a}
        else{
          return a
        }
      
    };
    const getName = () => name;
    const getMark = () => mark;
    const setName = (n) => { name = n;}
    return{ getName, getMark, setName , play, moves};
  };
const gameControlls = (board,firstPlayer,secondPlayer) => {
  let currentPlayer = firstPlayer;

  const getCurrentPlayer = () => currentPlayer;
  const setCurrentPlayer = (p) => currentPlayer = p;
  const getFirstPlayer = () => firstPlayer;
  const getSecondPlayer = () => secondPlayer;

  const playerMove = (index,event) => {
        //const isMarkSet = board.setMark(getCurrentPlayer().getMark(),index,currentPlayer)
        const isMarkSet = getCurrentPlayer().play(index,board);
        if(isMarkSet){
              event.target.innerText = getCurrentPlayer().getMark();

            if(board.checkForWinner(getCurrentPlayer().getMark(),getCurrentPlayer())){
              freezeButtons();
              setTimeout(function(){alert(getCurrentPlayer().getName() +" is the winner hurray")},50);
              
            }else{
              getCurrentPlayer().getMark() == 'X' ? setCurrentPlayer(secondPlayer) : setCurrentPlayer(firstPlayer);
            }

            if(board.checkIfFull()){
              freezeButtons();
                setTimeout( function(){alert("It's a draw, please reset the game")},50);
                
              }

        } else{

          setTimeout( function() {alert('That position is taken')},50);
        }

  };

  const namesAreSet = () => {
    return firstPlayer.getName().length > 0 && secondPlayer.getName().length > 0;
  }
  return{playerMove,getFirstPlayer,getSecondPlayer,getCurrentPlayer,namesAreSet};
}




 // DOM part
 const initModal = () =>  {

   const modal = document.getElementById("myModal");
   const closeBtnspan = document.getElementsByClassName("close")[0];
   const submitBtn = document.getElementById('submitBtnPlayers');

   return{modal,closeBtnspan,submitBtn}
 }

const freezeButtons = () =>{
  for(let box of grid.boxes){
    box.removeEventListener('click', listener);
}
}

 const domBoard = () =>{
   const gridBoard = document.getElementsByClassName('gridBoard')[0];
   const boxes = document.getElementsByClassName('box');
   const resetBtn = document.getElementById('resetGameBtn');
   return {gridBoard,boxes,resetBtn}
 }

// Starting point of the game
 const grid = domBoard();

 const modalDialog = initModal();

 const game = gameBoard();
 const firstPlayer = playerFactory('','X');
 const secondPlayer = playerFactory('','O');

 const controlls = gameControlls(game,firstPlayer,secondPlayer);






 // When the user clicks anywhere outside of the modal, close it
 window.onclick = (event) => {
   if (event.target == modalDialog) {
      modalDialog.modal.style.display = "none";
   }
 };

 // When the user clicks the button, open the modal
 document.getElementById('newGameBtn').addEventListener('click',()=>{
   modalDialog.modal.style.display = "inline";
 })

 // When the user clicks on <span> (x), close the modal
 modalDialog.closeBtnspan.onclick = function() {
   modalDialog.modal.style.display = "none";
 }



 modalDialog.submitBtn.addEventListener('click',function(){
   const firstPlayerName = document.getElementById('firstPlayerNameInput');
   const secondPlayerName = document.getElementById('secondPlayerNameInput');

   if(firstPlayerName.value.trim().length > 0 && secondPlayerName.value.trim().length > 0){
     setPlayersNameOnBoard(firstPlayerName.value.trim(),secondPlayerName.value.trim())

     controlls.getFirstPlayer().setName(firstPlayerName.value.trim());
     controlls.getSecondPlayer().setName(secondPlayerName.value.trim());
   }

   firstPlayerName.value = '';
   secondPlayerName.value = '';

   modalDialog.modal.style.display = 'none';
 });

 function setPlayersNameOnBoard(firstPlayerName,secondPlayerName){
   document.getElementById('first-player').innerText = firstPlayerName;
   document.getElementById('second-player').innerText = secondPlayerName;

 }

function listener(){
  

    const  index = event.target.getAttribute('index');

    if(controlls.namesAreSet()){

      controlls.playerMove(parseInt(index),event);
    }else{
      alert("Please click new game button set your names to start a game")
    }



}

 for(let box of grid.boxes){

    box.addEventListener('click',listener)
}

 grid.resetBtn.addEventListener('click',() => {
      location.reload();
 });
