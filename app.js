// this is the game board
const gameBoard = () => {

    const _board = [['','',''],['','',''],['','','']];

    const setMark = (mark,i,j) => {
      if(_board[i][j].length > 0){
        return false;
      }else{
        _board[i][j] = mark;
        return true;
      }
    }

const checkIfFull = () => {
          let isFull = true;
          _board.forEach(row => {
            row.forEach(cell => {
                if(cell.length == 0){
                  isFull = false;
                }
            })
          })
          return isFull;
        }

    const getBoard = () => _board;

    const checkForWinner = (mark)=> {

      // horizontal
      if(_board[0][0] == mark && _board[0][1] == mark && _board[0][2] == mark){ return true; }
      if(_board[1][0] == mark && _board[1][1] == mark && _board[1][2] == mark){ return true; }
      if(_board[2][0] == mark && _board[2][1] == mark && _board[2][2] == mark){ return true; }

      // vertical
      if(_board[0][0] == mark && _board[1][0] == mark && _board[2][0] == mark){ return true; }
      if(_board[0][1] == mark && _board[1][1] == mark && _board[2][1] == mark){ return true; }
      if(_board[0][2] == mark && _board[1][2] == mark && _board[2][2] == mark){ return true; }

      // diagonal
      if(_board[0][0] == mark && _board[1][1] == mark && _board[2][2] == mark){ return true; }
      if(_board[0][2] == mark && _board[1][1] == mark && _board[2][0] == mark){ return true; }

      return false;
    }

    return { getBoard, setMark, checkIfFull,checkForWinner };
}
const playerFactory = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    const setName = (n) => { name = n;}
    return{ getName, getMark, setName };
  };
const gameControlls = (board,domBoard,firstPlayer,secondPlayer) => {
  let currentPlayer = firstPlayer;

  const getCurrentPlayer = () => currentPlayer;
  const setCurrentPlayer = (p) => currentPlayer = p;

  const playerMove = (i,j) => {
        const isMarkSet = board.setMark(getCurrentPlayer().getMark(),i,j)

        if(isMarkSet){
            if(board.checkForWinner(getCurrentPlayer().getMark())){
              alert(getCurrentPlayer().getName() +" is the winner hurray")

              if(confirm("Do you want to reset the game")){
                location.reload();
              }
            }else{

              getCurrentPlayer().getMark() == 'X' ? setCurrentPlayer(secondPlayer) : setCurrentPlayer(firstPlayer);
            }

            if(board.checkIfFull()){
              alert("It's a DRAW");

              if(confirm("Do you want to reset the game")){
                location.reload();
              }
            }

        } else{
          alert('That position is taken');
        }

  };

  const namesAreSet = () => {
    return firstPlayer.getName().length > 0 && secondPlayer.getName().length > 0;
  }
  return{playerMove,firstPlayer,secondPlayer,getCurrentPlayer,namesAreSet};
}

// Starting point of the game
const game = gameBoard();
const firstPlayer = playerFactory('','X');
const secondPlayer = playerFactory('','O');

const controlls = gameControlls(game,firstPlayer,secondPlayer);


 // DOM part
 const initModal = () =>  {

   const modal = document.getElementById("myModal");
   const closeBtnspan = document.getElementsByClassName("close")[0];
   const submitBtn = document.getElementById('submitBtnPlayers');

   return{modal,closeBtnspan,submitBtn}
 }

 const domBoard = () =>{
   const gridBoard = document.getElementsByClassName('gridBoard')[0];
   const boxes = document.getElementsByClassName('box');
   const resetBtn = document.getElementById('resetGameBtn');
   return {gridBoard,boxes,resetBtn}
 }

 const grid = domBoard();

 const modalDialog = initModal();


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

     controlls.firstPlayer.setName(firstPlayerName.value.trim());
     controlls.secondPlayer.setName(secondPlayerName.value.trim());
   }

   firstPlayerName.value = '';
   secondPlayerName.value = '';

   modalDialog.modal.style.display = 'none';
 });

 function setPlayersNameOnBoard(firstPlayerName,secondPlayerName){
   document.getElementById('first-player').innerText = firstPlayerName;
   document.getElementById('second-player').innerText = secondPlayerName;

 }



 for(let box of grid.boxes){

    box.addEventListener('click',(event)=>{

      const  x = event.target.getAttribute('data-x');
      const  y = event.target.getAttribute('data-y');

      if(controlls.namesAreSet()){
        event.target.innerText = controlls.getCurrentPlayer().getMark();
        controlls.playerMove(parseInt(x),parseInt(y));
      }else{
        alert("Please click new game button set your names to start a game")
      }


 })
}

 grid.resetBtn.addEventListener('click',() => {
      location.reload();
 });
