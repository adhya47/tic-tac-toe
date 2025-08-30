let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#msg");
let turnO = true; //playerX,playerO

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add('hidd');
}
boxes.forEach((b) => {
    b.addEventListener("click", () => {
        if (turnO) {
            //playerO
            b.innerText = "O";
            turnO = false;
        } else {

            //playerX
            b.innerText = "X";
            turnO = true;
        }
        b.disabled = true;
        checkWinner();
    })
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
}
const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}
const showWinner = (winner) => {
    msg.innerText = `Congratulations!! Winner is ${winner}`;
    msgContainer.classList.remove("hidd");
    disableBoxes();
}
const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;
        if (pos1val != "" && pos2val != "" && pos3val != "") {
            if (pos1val === pos2val && pos2val === pos3val) {
                console.log('winner', pos1val);
                showWinner(pos1val);
            }
        }
    }
}
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);