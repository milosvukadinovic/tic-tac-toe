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
