// Static Variables
const str1 = " VS "
const str2 = "COMPUTER: "
const str3 = "YOU: "

// Game State Variables
let gameOver = false;
let humanScore = 0;
let computerScore = 0;

// Play Again Button Event: After
document.getElementById("play-again").addEventListener("click", resetGame);

// Start Game Button Event : To start the game and show board
document.getElementById("start-game").addEventListener ("click", () => {
    document.getElementById('start-screen').style.visibility = 'hidden';
    document.getElementById('game-board').style.visibility = 'visible';
});

// Displays button choices (ROCK, PAPER, SCISSORS) and adds an event listener to each img
document.querySelectorAll(".choice").forEach(img => {
    img.addEventListener ("click", () => {

        if (gameOver) return; 

        document.getElementById('game-board').style.visibility = 'visible';
        const humanChoice = img.dataset.choice;
        const computerChoice = getComputerChoice();
        const result = playRound(humanChoice, computerChoice);

        updateUI(humanChoice, computerChoice, result);
    });
});

//Updates the UI after each round
function updateUI(humanChoice, computerChoice, result) {

//Display result message
    document.getElementById("result").textContent = result;
//Update scoreboard text
    document.getElementById("scores").textContent = `${str3} ${humanScore} | ${str2} ${computerScore}`;
//Shows both selected chosen imgs (players and computers)
    document.getElementById("display-choices").innerHTML = `

        <img src="/assets/imgs/${humanChoice}.png" width="300px"alt="${humanChoice}" class="icon">
        <span>${str1}</span>
        <img src="/assets/imgs/${computerChoice}.png" width="300px" alt="${computerChoice}" class="icon">`;

// Checks if game is over after getting 3 points    
    if (computerScore >= 3 || humanScore >= 3) {
        document.getElementById("result").textContent = `Game Over! ${humanScore > computerScore ? "You Win!" : "Computer Wins!"}`;
        document.getElementById("play-again").style.display = "inline-block";
        gameOver = true;
// Hiding clicking and other UI
        document.getElementById("choice-list").style.visibility = 'hidden';
        document.getElementById("display-choices").style.display = 'none';
        document.getElementById("start-screen").style.display = 'none';
    }
}

// Random Computer choice function
function getComputerChoice() {
 let randomnumber = Math.floor(Math.random()*100)+ 1;
   console.log (randomnumber)
    if (randomnumber <= 33) {
        return "rock"
    } else if (randomnumber <= 66) {
        return "scissors"
    } else { 
        return "paper"
    }
}

// Determines the winner of each round
function playRound(humanChoice, computerChoice) {
    console.log(computerChoice + str1 + humanChoice);
    numberOfLives = 2;

    if (humanChoice === "rock" && computerChoice === "scissors") {
        ++humanScore;
        return "You Win";
    } else if (humanChoice === "scissors" && computerChoice === "paper") {
       ++humanScore; 
       return "You Win";
    } else if (humanChoice === "paper" && computerChoice === "rock") {
        ++humanScore;
        return "You Win";
    } else if (humanChoice === computerChoice){
        return "It's a tie!";
    } else {
        ++computerScore;
        removeHeart();
        return "You Lose";
    }      
}


//Game Reset (UI and extras are reset)
function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;
    makeHearts();

    document.getElementById("display-choices").style.display = 'block';
    document.getElementById("choice-list").style.visibility = 'visible';   
    document.getElementById("result").textContent = "";
    document.getElementById("scores").textContent = "";
    document.getElementById("display-choices").innerHTML = "";
    document.getElementById("play-again").style.display = "none";  
}

//Lives (Heart img displayed)
function makeHearts(){
    const livesContainer = document.getElementById("heart-section");
    livesContainer.innerHTML = "";

    let numberOfLives = 3;
    
    for (let i = 0; i < numberOfLives; i++) {
        const heart = document.createElement("img");
        heart.src="/assets/imgs/heart.png";
        heart.classList.add("heart");
        livesContainer.appendChild(heart);
    }
};

makeHearts();

function removeHeart() {
    const hearts = document.querySelectorAll("#heart-section .heart");
    if (computerScore > 0) {
        hearts[hearts.length - 1].remove(); 
    }
}

