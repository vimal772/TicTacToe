const restart = document.querySelector('#restart-btn');
const playerText = document.querySelector('#winning-msg-txt');
const boxes = document.querySelectorAll('.box');

const O_Text = "O";
const X_Text = "X";
let currentPlayer = X_Text;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach((box) =>{
        box.addEventListener('click',boxClicked)
    });
}

function boxClicked(e){
    const id = e.target.id;

    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        currentPlayer = (currentPlayer == X_Text) ? O_Text:X_Text
    }
}

restart.addEventListener('click',restartClicked);

function restartClicked(){
    spaces.fill(null);

    boxes.forEach( box => {
        box.innerText = "";
    });

    currentPlayer = X_Text;
}

startGame()