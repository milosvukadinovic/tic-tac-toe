const gameBoard = ( ()=>{

    let currentBoard = document.querySelectorAll('.box');
    let turn=1;
    let board = [ [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                  [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}]];

    function changeBoard(row,column,mark){
       board[row][column] = mark;
    }

    const isFull = () => {
      let len=0;
      for (var i = 0; i < board.length; i++) {
        for(var j=0;j<board[i].length;j++){
            if (board[i][j].checked == false){
              len++;
            }
        }
        
    }
        
        if (len == 0) {
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
        if(board[i][0].mark == mark && board[i][1].mark == mark && board[i][2].mark == mark){return true;}
    }

   for(var i = 0 ; i < 3 ; i++){
        if(board[0][i].mark == mark && board[1][i].mark == mark && board[2][i].mark == mark){  return true;}
    }

   if(board[0][0].mark == mark && board[1][1].mark == mark && board[2][2].mark == mark){ return true;}
   if(board[0][2].mark == mark && board[1][1].mark == mark && board[2][0].mark == mark){return true;}
    return false;
}






const startGame = (name1,name2) => {
    
    setPlayersNames(name1,name2);
    const b = gameBoard();
    


};
 // here we need to add poppups, but also return mark. If we don't return mark it 
 // will be incomplete. Maybe we can return two values, one mark and 
 // other 1,2,3(1-game pending, 2- show winner , 3- draw ,
 // 4- press a button thats not already taken?)
const playerMove = (x,y) => {
    mark = turn===1 ? "X": "O" ;
    if (addMark(mark,x,y)){
        // add pop up here, can't click same button twice
        return [mark,1];
    }
    if(checkWin(mark)){
        // add pop up here, its a win
        return [mark,2];
    }
    if(isFull()){
        // add pop up here, its a draw
        return [mark,3];
    }
    turnCheck()
    return [mark,0];
};

const addMark = (mark,x,y) => {
    if (board[x][y].checked==true){
        return true
}
    board[x][y].mark=mark;
    board[x][y].checked=true;
    return false

};

const turnCheck =() => {

    turn = turn===1 ? 2 : 1 ;
};


const setPlayersNames= (name1,name2) => {

  let player1 = playerFactory(name1,'X');
  let player2 = playerFactory(name2,'O');
    players.push(player1);
    players.push(player2);
  return {name1,name2};
};





const resetBoard = () => {
    let board = [ [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                  [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}],
                [{mark:"",checked:false} , {mark:"",checked:false},{mark:"",checked:false}]];
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

 const boardf = () =>{
   const gridBoard = document.getElementsByClassName('gridBoard')[0];
   const boxes = document.getElementsByClassName('box');
   const resetBtn = document.getElementById('resetGameBtn');
   return {gridBoard,boxes,resetBtn}
 }

 const grid = boardf();

 for(let box of grid.boxes){

    box.addEventListener('click',(event)=>{
      if(playersNamesAreSet()){
        const  x = event.target.getAttribute('data-x');
        const  y = event.target.getAttribute('data-y');
        
        console.log(`x: ${x} y:${y}`);
        symbol=playerMove(x,y);

        switch (symbol[1]) {
        case 1: // error picked used button
          console.log("Wrong button, press again") //pop up
          break;
        case 2: // winning condition
          console.log("win")
          event.target.innerText = symbol[0]; // pop up message
          break;
        case 3: // draw condition
          console.log("draw")  
          event.target.innerText = symbol[0]; //pop up
          break;
        default: // 0 will be everything is fine and continue on
          event.target.innerText = symbol[0];
        }

        if (symbol[1] == '1' || symbol == 'O'){
            
        }
        
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
   startGame(x,y);

 })
})();