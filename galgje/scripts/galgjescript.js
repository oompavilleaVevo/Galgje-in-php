const wordDisplay = document.querySelector(".word-display");
const guessesText = document.querySelector(".guesses-text b");
const gameModal = document.querySelector(".game-modal");
const keyboardDiv = document.querySelector(".keyboard");
const playAgainBtn = gameModal.querySelector("button");

// game variables
let currentWord, correctLetters, wrongGuessCount;
const maxGuesses = 6;

const resetGame = () => {
    //reset de game variables 
    correctLetters = [];
    wrongGuessCount = 0;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    // Select een random woord van de lijst aka word list
    currentWord = wordList[Math.floor(Math.random() * wordList.length)].word;
    resetGame();
}

const gameOver = (isVictory) => {
    const modalText = isVictory ? `Je hebt het woord gevonden!!:` : 'Het correcte woord is..:';
    const gifSrc = isVictory ? 'images/victory.gif' : 'images/lost.gif';
    const gifAlt = isVictory ? 'Victory GIF' : 'Lost GIF';
    const imgElement = gameModal.querySelector("img");
    imgElement.src = gifSrc;
    imgElement.alt = gifAlt;
    gameModal.querySelector("h4").innerText = isVictory ? 'gefeliciteerd' : 'Game Over';
    gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentWord}</b>`;
    gameModal.classList.add("show");

}

const initGame = (button, clickedLetter) => {
    // Checked of de letter in het woord zite
    if(currentWord.includes(clickedLetter)) {
        // Showing all correct letters on the word display
        [...currentWord].forEach((letter, index) => {
            if(letter === clickedLetter) {
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    } else {
        // bij elke fout wordt het +1
        wrongGuessCount++;
    }
    button.disabled = true; //zodat de gebruiker niet nog een keer op de button kan klikken
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;

    // Calling gameOver function if any of these condition meets
    if(wrongGuessCount === maxGuesses) return gameOver(false);
    if(correctLetters.length === currentWord.length) return gameOver(true);
}

// maakt de keyboard buttons
for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", (e) => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click", getRandomWord);
