console.log("App.js CONNECTED")

const x_class = "x";
const o_class = "o";
const cells = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const endGameWindow = document.getElementById("end_game_window");
const endGameResult = document.getElementById("end_game_result");
const playAgainButton = document.getElementById("play_again_btn");

const win_combinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]
]

let o_turn;

const handleClick = (e) => {
    console.log("Clicked")
    const cell = e.target;
    const currentClass = o_turn ? o_class : x_class;
    placeMark(cell, currentClass);

    if (checkWin(currentClass)) {
        endGame(false);
        console.log(currentClass + " win !")
    } else if (isDraw()) {
        endGame(true);
    } else {
        switchTurn()
        setBoardClass()
    }
}

const isDraw = () => {
    return [...cells].every(cell => {       // [...cells] required, otherwise .every is not a function at isDraw
        return cell.classList.contains(x_class) || cell.classList.contains(o_class);
    })
}

const endGame = (draw) => {
    if (draw) {
        endGameResult.innerText = "It's a Draw!";
    } else {
        //endGameResult.innerText = `${o_turn ? "O's" : "X's"} Wins!`;
        endGameResult.innerText = o_turn ? "O's Wins!" : "X's Wins!";
    }

    endGameWindow.classList.add("show");
}

const placeMark = (cell, currentClass) => {
    cell.classList.add(currentClass)
}

const switchTurn = () => {
    o_turn = !o_turn;
}

const setBoardClass = () => {
    board.classList.remove(x_class);
    board.classList.remove(o_class);
    
    o_turn ? board.classList.add(o_class) : board.classList.add(x_class);
}

const startGame = () => {
    o_turn = false;
    
    cells.forEach(cell => {
        cell.classList.remove(x_class);
        cell.classList.remove(o_class);
        //cell.removeEventListener("click", handleClick);       // TODO: why this line?
        cell.addEventListener("click", handleClick, {once: true});      // once => one occurence max possible.
    })
    
    setBoardClass();
    endGameWindow.classList.remove("show")
}
startGame();

playAgainButton.addEventListener("click", startGame);

const checkWin = (currentClass) => {        // Without console.logs
    return win_combinations.some(combination => {
        return combination.every(index => {
            return cells[index].classList.contains(currentClass)
        })
    })
}


/* const checkWin = (currentClass) => {        // With a lot of console.log
    console.log("TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT")
    console.log("Current Class = " + currentClass);     // Current Class, possible winner

    return win_combinations.some(combination => {       // .some => at least one element.
        console.log("Index of combination = " + win_combinations.indexOf(combination));    // [win_combinations] element, an array of 3 index
        console.log("Combination serie = " + combination);
        console.log("------------------------------------")

        return combination.every(index => {             // .every => all elements. 
            console.log("Tested cell index = " + index);            // Index => check each index of the combination
            console.log("Tested cell class = " + cells[index].classList)
            console.log("Tested cell contains current class = " + cells[index].classList.contains(currentClass))      // Test if the cell has the current class.
            console.log("=====================================")
            return cells[index].classList.contains(currentClass)
        })
    })
} */

