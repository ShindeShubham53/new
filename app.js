let squares = document.querySelectorAll(".square"); 
let restartBtn = document.querySelector(".restart-btn");
let notification = document.querySelector(".notification");  
let notificationContainer = document.querySelector(".notification-container");  
let replayBtn = document.querySelector(".replay-btn");  

let isOTurn = true;

let winningCombinations = [
    [0, 1, 2],
    [0, 4, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

let moveCount = 0;

squares.forEach((square) => {
    square.addEventListener("click", () => {
        if (isOTurn) {
            square.innerText = "O";
            isOTurn = false;
        } else {
            square.innerText = "X";
            isOTurn = true;
        }
        square.disabled = true;
        moveCount++;
        checkForWinner();
    });
});

let checkForWinner = () => {
    for (let combination of winningCombinations) {
        let square1 = squares[combination[0]].innerText;
        let square2 = squares[combination[1]].innerText;
        let square3 = squares[combination[2]].innerText;

        if (square1 != "" && square2 != "" && square3 != "") {
            if (square1 == square2 && square2 == square3) {
                announceWinner(square1);
                lockSquares();
                return;
            }
        }
    }
    if (moveCount === 9) {
        announceDraw();
    }
};

let announceWinner = (winner) => {
    notificationContainer.classList.remove("hide");
    notification.innerText = `Winner is ${winner}`;
};

let announceDraw = () => {
    notificationContainer.classList.remove("hide");
    notification.innerText = "Match is a draw, try again";
    moveCount = 0;
};

let lockSquares = () => {
    squares.forEach((square) => {
        square.disabled = true;
    });
};

let unlockSquares = () => {
    squares.forEach((square) => {
        square.disabled = false;
        square.innerText = "";
    });
};

let restartGame = () => {
    isOTurn = true;
    unlockSquares();
    notificationContainer.classList.add("hide");
    moveCount = 0;
};

restartBtn.addEventListener("click", restartGame);
replayBtn.addEventListener("click", restartGame);
