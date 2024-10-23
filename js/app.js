/*-------------------------------- Constants --------------------------------*/

const wordList = ["biology", "bacteria", "virus", "plant", "animal"]

// // // /*---------------------------- Variables ----------------------------*/
let currentWord = ""
let currentProgress = []
let incorrectGuesses = []
let attemptsLeft = 6

// // // /*------------------------ Cached Element References  ------------------------*/
const resetButton = document.querySelector("#restartButton")
const displayWord = document.querySelector("#wordDisplay")
const gameMessage = document.querySelector("#gameMessage")
const inputGuess = document.querySelector("#guessInput")

// // // /*-------------------------------- Functions --------------------------------*/
const getRandomWord = () => {
  let randomIndex = Math.floor(Math.random() * wordList.length)
  return wordList[randomIndex]
}

////////////////////////////////////////////////////////////////////////////////////////

const startGame = () => {
  currentWord = getRandomWord()
  currentProgress = []
  for (let i = 0; i < currentWord.length; i++) {
    currentProgress.push("_")
  }
  incorrectGuesses = []
  gameMessage.innerText = ""
  attemptsLeft = 6
  seeCurrentWord()
  displayAttemptsLeft()
}

const createInitialProgress = (word) => {
  let progress = []
  for (let i = 0; i < word.length; i++) {
    progress[i] = "_"
  }
  return progress
}

const makeGuess = (guess) => {
  let isCorrect = false

  for (let i = 0; i < currentWord.length; i++) {
    if (currentWord[i] === guess) {
      currentProgress[i] = guess
      isCorrect = true
    }
  }

  if (!isCorrect) {
    incorrectGuesses.push(guess)
    attemptsLeft--
  }

  seeCurrentWord()
  displayAttemptsLeft()
  gameStatus()
}

const seeCurrentWord = () => {
  let wordToDisplay = ""
  for (let i = 0; i < currentProgress.length; i++) {
    wordToDisplay += currentProgress[i] + " "
  }
  displayWord.innerText = wordToDisplay
}

const displayAttemptsLeft = () => {
  document.querySelector("#remainingAttempts").innerText = attemptsLeft
}

const gameStatus = () => {
  for (let i = 0; i < currentProgress.length; i++) {
    if (currentProgress[i] === "_") {
      if (attemptsLeft === 0) {
        gameMessage.innerText = `Game over! The word was: ${currentWord}`
      }
      return
    }
  }

  gameMessage.innerText = "Congratulations, you won!🎉🎉🎉🎉"
}

// // // /*----------------------------- //Event Listeners// -----------------------------*/

document.querySelector("#guessButton").addEventListener("click", () => {
  let guess = inputGuess.value
  if (guess) {
    makeGuess(guess)
    inputGuess.value = ""
  }
})

startGame()

resetButton.addEventListener("click", startGame)

// // /* //references:
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Loops_and_iteration
// https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector
