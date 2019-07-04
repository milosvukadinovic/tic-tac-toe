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
    modal.style.display = "none";
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

function setPlayersNameOnBoard(firstPlayerName,secondPlayerName){
  document.getElementById('first-player').innerText = firstPlayerName;
  document.getElementById('second-player').innerText = secondPlayerName;
}

modalDialog.submitBtn.addEventListener('click',function(){
  const firstPlayerName = document.getElementById('firstPlayerNameInput');
  const secondPlayerName = document.getElementById('secondPlayerNameInput');

  setPlayersNameOnBoard(firstPlayerName.value,secondPlayerName.value)
  modalDialog.modal.style.display = 'none';
});
const board = () =>{
  const gridBoard = document.getElementsByClassName('gridBoard')[0];
  const boxes = document.getElementsByClassName('box');
  return {gridBoard,boxes}
}
const grid = board();

grid.boxes.forEach((box) =>{
  
})
