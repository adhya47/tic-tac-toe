let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg");
let msg = document.querySelector("#msg");
let turnO = true; // true = Player O's turn, false = Player X's turn

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

// Reset game
const resetGame = () => {
    turnO = true;
    enableBoxes();
    msgContainer.classList.add("hidd");
};

// Handle player clicks
boxes.forEach((b) => {
    b.addEventListener("click", () => {
        if (turnO) {
            b.innerText = "O";
            turnO = false;
        } else {
            b.innerText = "X";
            turnO = true;
        }
        b.disabled = true;
        checkWinner();
    });
});

// Disable all boxes when game ends
const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

// Enable all boxes for a new game
const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

// Show winner message
const showWinner = (winner) => {
    msg.innerText = `🎉 Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hidd");
    disableBoxes();
};

// Show tie message
const showTie = () => {
    msg.innerText = "😅 It's a Tie!";
    msgContainer.classList.remove("hidd");
    disableBoxes();
};

// Check for winner or tie
const checkWinner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let pos1 = boxes[a].innerText;
        let pos2 = boxes[b].innerText;
        let pos3 = boxes[c].innerText;

        if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
            if (pos1 === pos2 && pos2 === pos3) {
                showWinner(pos1);
                winnerFound = true;
                return; // stop once we find a winner
            }
        }
    }

    // Check tie if no winner found
    if (!winnerFound) {
        let allFilled = [...boxes].every(box => box.innerText !== "");
        if (allFilled) showTie();
    }
};

// Reset & New Game buttons
newGameBtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);