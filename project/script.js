const str1 = " VS "
const str2 = "COMPUTER SCORE = "
const str3 = "YOUR SCORE = "

let gameOver = false;

let humanScore = 0;
let computerScore = 0;
document.getElementById("play-again").addEventListener("click", resetGame);


document.querySelectorAll(".choice").forEach(img => {
    img.addEventListener ("click", () => {
        if (gameOver) return; 

        const humanChoice = img.dataset.choice;
        const computerChoice = getComputerChoice();
        const result = playRound(humanChoice, computerChoice);

        updateUI(humanChoice, computerChoice, result);
    });
});

function updateUI(humanChoice, computerChoice, result) {
    document.getElementById("result").textContent = result;
    document.getElementById("scores").textContent = `${str3} ${humanScore} | ${str2} ${computerScore}`;
    document.getElementById("display-choices").innerHTML = `
    
        <img src="images/${humanChoice}.png" width="300px"alt="${humanChoice}" class="icon">
        <span>${str1}</span>
        <img src="images/${computerChoice}.png" width="300px" alt="${computerChoice}" class="icon">`;

    if (computerScore >= 5 || humanScore >= 5) {
        document.getElementById("result").textContent = `Game Over! ${humanScore > computerScore ? "You Win!" : "Computer Wins!"}`;
        document.getElementById("play-again").style.display = "inline-block";
        gameOver = true;
    }
}

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

function playRound(humanChoice, computerChoice) {
    console.log(computerChoice + str1 + humanChoice);

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
        return "You Lose";
    }      
}

function playAgain() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;

    document.getElementById("result").textContent = "";
    document.getElementById("scores").textContent = "";
    document.getElementById("display-choices").innerHTML = "";
    document.getElementById("play-again").style.display = "none";
}

function resetGame() {
    humanScore = 0;
    computerScore = 0;
    gameOver = false;

    document.getElementById("result").textContent = "";
    document.getElementById("scores").textContent = "";
    document.getElementById("display-choices").innerHTML = "";
    document.getElementById("play-again").style.display = "none";  
}
