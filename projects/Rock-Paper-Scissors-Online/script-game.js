let mode;
let selected = -1;
let rounds = 0;
let playerWins = 0;
let cpuWins = 0;
const TIMEOUT = 1000;

const body = document.querySelector("body");

const upGameCont = document.querySelector(".up-game-container");
const downText = document.querySelector(".result");
const gameCount = document.createElement("p");
const points = upGameCont.children[0];
const downGameCont = document.querySelector(".down-game-container");
const centerGameCont = document.querySelector(".center-game-container");
const centerLeft = document.querySelector(".center-game-container .left");
const centerMiddle = document.querySelector(".center-game-container .middle");
const centerRight = document.querySelector(".center-game-container .right");

const gameBtns = Array.from(document.querySelectorAll(".left .card"));
const runBtn = document.querySelector(".middle button");

const cpuCard = document.querySelector(".right .card");
const back = document.querySelector(".back");

body.innerHTML = "";

function updateText(result) {
    gameCount.innerText = `Games played: ${rounds}`;
    points.children[0].innerText = `You: ${playerWins}`;
    points.children[1].innerText = `Me: ${cpuWins}`;
    downText.innerText = result;
}

function loadGame() {
    body.removeChild(centerCont);
    
    centerGameCont.innerText = "";

    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
    }

    centerGameCont.appendChild(centerLeft);
    centerGameCont.appendChild(centerMiddle);
    centerGameCont.appendChild(centerRight);

    selected = -1;
    rounds = 0;
    playerWins = 0;
    cpuWins = 0;

    switch (mode) {
        case 0:
            upGameCont.innerText = "We are playing a single game";
            break;
    
        case 1:
            upGameCont.innerText = "We are playing a best out of three";
            break;
    
        case 2:
            upGameCont.innerText = "We are playing a best out of five";
            break;
        
        case 3:
            upGameCont.innerText = "We are playing until one of us gets five points";
            break;
        case 4:
            upGameCont.innerText = "You should have said yes!!!";
            break;
    }
    
    if (mode) {
        upGameCont.appendChild(gameCount);
        upGameCont.appendChild(points);
    }
    
    if (mode == 4) {
        downGameCont.removeChild(back);
    }

    updateText("");

    body.appendChild(upGameCont);
    body.appendChild(centerGameCont);
    body.appendChild(downGameCont);
}

function loadMenu() {
    let temp = Array.from(body.children);
    temp.forEach(item => {
        body.removeChild(item);
    });

    body.appendChild(centerCont);
}

let getComputerChoice = () => Math.floor(Math.random() * 3) + 1;

let  winner = (player, cpu) => {
    if (cpu == player) {
        return null
    } else if ((player > cpu || (cpu == 3 && player == 1)) && (cpu != 1 || player != 3)) {
        return 1;
    } else {
        return 0;
    }
}

let playRound = (player, cpu) => {
    let choices = [`Rock`, `Paper`, `Scissors`]
    let result = winner(player, cpu)
    if (result == null) {
        return "It's a draw"
    }
    return `You ${result ? `Win` : `Lose`}! ${choices[(result ? player : cpu) - 1]} beats ${choices[(result ? cpu : player) - 1]}`
}

let displayCpuChoice = cpu => {
    let image = document.createElement("img");
    let txt = document.createTextNode("Paper");
    cpuCard.fontSize = "25px";

    switch (cpu) {
        case 1:
            image.src = "images/rock.png";
            txt.textContent = "Rock";
            break;
        
        case 2:
            image.src = "images/paper.png";
            txt.textContent = "Paper";
            break;

        case 3:
            image.src = "images/scissors.png";
            txt.textContent = "Scissors";
            image.classList.add("scissors");
            break;

    } 

    cpuCard.appendChild(image);
    cpuCard.appendChild(txt);
}

let removeClutter = () => {
    upGameCont.removeChild(gameCount);
    upGameCont.removeChild(points);
    downText.innerText = "";
}

let displayResults = result => {

    let tempArr = Array.from(centerGameCont.children);

    tempArr.forEach(item => centerGameCont.removeChild(item));
    centerGameCont.appendChild(document.createTextNode(result));

    back.innerText = "Back"
    sessionStorage.clear();
}

let bestOf = number => {

    if (playerWins == cpuWins + number) {

        setTimeout(() => {

            removeClutter();
            displayResults(`You Win! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);

        }, TIMEOUT);

    } else if (cpuWins == playerWins + number){

        setTimeout(() => {
            
            removeClutter();
            displayResults(`You Lose! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);

        }, TIMEOUT);
    }
}

let updateData = result => {
    ++rounds;
    
    if (result[0] != `I`)
        (result[4] == `W`) ? playerWins += 1 : cpuWins += 1;
}

gameBtns[0].addEventListener("click", () => {
    cpuCard.innerHTML = "";
    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
        if (selected) {
            gameBtns[0].classList.add("selected");
            selected = 0;
            return;
        }
        selected = -1;
        return;
    }
    
    gameBtns[0].classList.toggle("selected");
    selected = 0;
});

gameBtns[1].addEventListener("click", () => {
    cpuCard.innerHTML = "";
    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
        if (selected != 1) {
            gameBtns[1].classList.add("selected");
            selected = 1;
            return;
        }
        selected = -1;
        return;
    }
    
    gameBtns[1].classList.toggle("selected");
    selected = 1;
});

gameBtns[2].addEventListener("click", () => {
    cpuCard.innerHTML = "";
    if (selected > -1) {
        gameBtns[selected].classList.remove("selected");
        if (selected != 2) {
            gameBtns[2].classList.add("selected");
            selected = 2;
            return;
        }
        selected = -1;
        return;
    }

    gameBtns[2].classList.add("selected");
    selected = 2;
});

runBtn.addEventListener("click", () => {
    if (selected == -1) return;
    
    let cpu = getComputerChoice();
    displayCpuChoice(cpu);
    
    let result = playRound(selected + 1, cpu);
    
    setTimeout(() => {
        cpuCard.innerHTML = "";
        gameBtns[selected].classList.remove("selected");
        selected = -1;
    }, TIMEOUT);

    switch (mode) {

        case 0: {
            setTimeout(() => {

                displayResults(result);

            }, TIMEOUT);
            break;
        }

        case 1: {
            updateData(result);
            updateText(result);

            bestOf(2);
            break;
        }

        case 2: {
            updateData(result);
            updateText(result);

            bestOf(3);
            break;
        }
        case 3: {
            updateData(result);
            updateText(result);

            if (playerWins == 5) {
                setTimeout(() => {

                    removeClutter();
                    displayResults(`You Win! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);
        
                }, TIMEOUT);
            } else if (cpuWins == 5) {
                setTimeout(() => {

                    removeClutter();
                    displayResults(`You Lose! You won ${playerWins} games, lost ${cpuWins} games, and tied ${rounds - (playerWins + cpuWins)} games`);
        
                }, TIMEOUT);
            }
            break;
        }

        case 4:
            updateData(result);
            updateText(result);
            return;
    }
});

back.addEventListener("click", loadMenu);




let centerCont = document.createElement("div");
let upCont = document.createElement("div");
let downCont = document.createElement("div");
let yesButton = document.createElement("button");
let noButton = document.createElement("button");

centerCont.classList.add("center-container");
upCont.classList.add("up");
downCont.classList.add("down");
yesButton.classList.add("yes");
noButton.classList.add("no");

yesButton.innerText = "Yes";
noButton.innerText = "No";
upCont.innerText = "Do you want to play a game?";

centerCont.appendChild(upCont);
centerCont.appendChild(downCont);
downCont.appendChild(yesButton);
downCont.appendChild(noButton);

let para = document.createElement("div");
let oneBtn = document.createElement("button");
let bestOfThreeBtn = document.createElement("button");
let bestOfFiveBtn = document.createElement("button");
let upToFiveBtn = document.createElement("button");
let cancelBtn = document.createElement("button");
let wrongBtn = document.createElement("button");
let rightBtn = document.createElement("button");

oneBtn.innerText = "One game";
bestOfThreeBtn.innerText = "Best of 3";
bestOfFiveBtn.innerText = "Best of 5";
upToFiveBtn.innerText = "Until 5";
cancelBtn.innerText = "cancel";
wrongBtn.innerText = "You though wrong";
rightBtn.innerText = "I guess I can play";

wrongBtn.classList.add("no");
rightBtn.classList.add("yes");

let buttons = [yesButton, noButton, oneBtn, bestOfThreeBtn, bestOfFiveBtn, upToFiveBtn, cancelBtn, rightBtn, wrongBtn];

yesButton.addEventListener("click", () => {
    upCont.innerText = "Good!";
    para.innerText = "What type of match do you want to play?";

    upCont.appendChild(para);

    downCont.style.padding = "10px 50px"

    for (let i = 2; i < 7; ++i)
        downCont.appendChild(buttons[i]);

    for (let i = 0; i < 2; ++i)
        downCont.removeChild(buttons[i]);
});

noButton.addEventListener("click", () => {
    upCont.innerText = "WHAT?!";
    para.innerText = "I thought you came here to play with me";
    upCont.appendChild(para);

    for (let i = 0; i < 2; ++i)
        downCont.removeChild(buttons[i]);

    for (let i = 7; i < 9; ++i)
        downCont.appendChild(buttons[i]);
});

rightBtn.addEventListener("click", () => {
    upCont.innerText = "Good!";
    para.innerText = "What type of match do you want to play?";

    upCont.appendChild(para);

    downCont.style.padding = "10px 50px"

    for (let i = 2; i < 7; ++i)
        downCont.appendChild(buttons[i]);

    for (let i = 7; i < 9; ++i)
        downCont.removeChild(buttons[i]);
});

wrongBtn.addEventListener("click", () => {
    mode = 4;
    loadGame();
});

oneBtn.addEventListener("click", () => {
    mode = 0;
    loadGame();
});

bestOfThreeBtn.addEventListener("click", () => {
    mode = 1;
    loadGame();
});

bestOfFiveBtn.addEventListener("click", () => {
    mode = 2;
    loadGame();
});

upToFiveBtn.addEventListener("click", () => {
    mode = 3;
    loadGame();
});

cancelBtn.addEventListener("click", () => {
    upCont.innerText = "Don't you want to play with me?";

    downCont.style.padding = "10px 100px";
    yesButton.innerText = "I do!";
    noButton.innerText = "I don't";

    for (let i = 2; i < 7; ++i)
        downCont.removeChild(buttons[i]); 

    for (let i = 0; i < 2; ++i)
        downCont.appendChild(buttons[i]);
});

window.onload = loadMenu;
