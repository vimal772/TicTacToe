const restart = document.querySelector('#restart-btn');
const playerText = document.querySelector('#winning-msg-txt');
const boxes = document.querySelectorAll('.box');
 
const O_Text = "O";
const X_Text = "X";
let currentPlayer = X_Text;
let spaces = Array(9).fill(null);
let count =0;

const startGame = () => {
    boxes.forEach( box => {
        box.addEventListener('mouseenter', () => {
            if(!box.classList.contains('clicked')){
                box.style.opacity = 0.5;
                box.textContent = currentPlayer;
            }
        });
    
        box.addEventListener('mouseleave', () => {
            if(!box.classList.contains('clicked')){
                box.textContent = '';
                box.style.opacity = 1;
            }
        });
    
        boxes.forEach((box) =>{
            box.addEventListener('click',boxClicked)
        });
    });
}

function boxClicked(e){
    const id = e.target.id;

    if(!spaces[id]){
        spaces[id] = currentPlayer;
        e.target.classList.add('clicked');
        e.target.style.opacity = 1;
        e.target.innerText = currentPlayer;

        if(playerHasWon() !== false){
            
            let winningBlocks = playerHasWon();
            count = 1;
            winningBlocks.map(box => boxes[box].style.backgroundColor = `rgb(255,255,255)` )
             
        }

        currentPlayer = (currentPlayer == X_Text) ? O_Text:X_Text
    }
    if(spaces.every(element => element !== null) && count == 0){
        playerText.textContent = "Match Draw";
        setTimeout(() => {
            restartClicked();
        },1000);
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition;

        if(spaces[a] && (spaces[a] == spaces[b]) && (spaces[a] == spaces[c])){
            playerText.innerText = `${currentPlayer} has Won`;
            return [a,b,c];
        }
    }
    return false;
}

restart.addEventListener('click',restartClicked);

function restartClicked(){
    spaces.fill(null);
    count = 0;
    boxes.forEach( box => {
        box.innerText = "";
        box.style.backgroundColor = '';
        box.classList.remove('clicked');
    });
    playerText.innerText = "TIC TAC TOE"; 
    currentPlayer = X_Text;
}



startGame()