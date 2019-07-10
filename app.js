// this is the game board
const gameBoard = () => {

    const board = [0,1,2,3,4,5,6,7,8];
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
      console.log('this here should work')
      console.log(game.board[index]);
      if(typeof game.board[index] == "number") {
        game.board[index] = mark;
        return true;
       }
       return false;
      }
  
    const checkIfFull = () => {
      console.log('shit here odnt work');
      console.log(game.board[0]);
      a=game.board.every(element => typeof element == 'string');
      console.log(a);
      return a;
    }
    const getBoard = () => game.board;

    const checkForWinner = (mark,currentPlayer)=> {
      return winningCombos.some(combo => combo.every(e => currentPlayer.moves.includes(e)));
    }

    return { getBoard, setMark, checkIfFull,checkForWinner, board };
}
const playerFactory = (name, mark) => {
    const moves=[];
    const play = (index,board) => {
      a=game.setMark( this.mark,index);
    
      if(a){
        moves.push(index);
        return a}
        else{
          return a
        }
      
    };
    return{ name, mark, play, moves};
  };
const gameControlls = (game,firstPlayer,secondPlayer) => {
  let currentPlayer = firstPlayer;

  const getCurrentPlayer = () => currentPlayer;
  const setCurrentPlayer = (p) => currentPlayer = p;
  const getFirstPlayer = () => firstPlayer;
  const getSecondPlayer = () => secondPlayer;

  const playerMove = (index,event) => {
        //const isMarkSet = board.setMark(getCurrentPlayer().mark,index,currentPlayer)
        const isMarkSet = getCurrentPlayer().play(index,game.board);
        if(isMarkSet){
              event.target.innerText = getCurrentPlayer().mark;

            if(game.checkForWinner(getCurrentPlayer().mark,getCurrentPlayer())){
              freezeButtons();
              setTimeout(function(){alert(getCurrentPlayer().name +" is the winner hurray")},50);
              
            }else{
              getCurrentPlayer().mark == 'X' ? setCurrentPlayer(secondPlayer) : setCurrentPlayer(firstPlayer);
            }
            
            if(game.checkIfFull()){
              freezeButtons();
                setTimeout( function(){alert("It's a draw, please reset the game")},50);
                
              }

        } else{

          setTimeout( function() {alert('That position is taken')},50);
        }

  };

  const namesAreSet = () => {
    return firstPlayer.name.length > 0 && secondPlayer.name.length > 0;
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

     controlls.getFirstPlayer().name=firstPlayerName.value.trim();
     controlls.getSecondPlayer().name=secondPlayerName.value.trim();
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
