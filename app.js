//TO DO
// 1. link up dictionary API 
// 4. Find image and info to include when Birdle is won
// 5. Create an overlay for the rules of Birdle 
// Find where to remove event listener / handle click function once game is over
// Add a "not enough letters" notification if enter is pressed before 7 letters



const tileDisplay = document.querySelector(".tile-container")
const keyboard = document.querySelector(".key-container")
const messageDisplay = document.querySelector(".message-container")
const infoDisplay = document.getElementById("info-overlay")
const instructionsDisplay = document.getElementById("instructions-overlay")
const creditsDisplay = document.getElementById("credits-overlay")


const openCredits = document.getElementById("credits-modal").addEventListener("click", function() {
    creditsDisplay.style.display = "block"
})

const closeCredits = document.getElementById("close-credits").addEventListener("click", function() {
    creditsDisplay.style.display = "none"
})

// const closeModal = document.getElementById("close-modal").addEventListener("click", function() {
//     infoDisplay.style.display = "none"
// })

// const openModal = document.getElementById("open-modal").addEventListener("click", function() {
//     infoDisplay.style.display = "block"
// } )
// openModal.classList.add("title-button-enabled")

const openInstructions = document.getElementById("instructions-modal").addEventListener("click", function() {
    instructionsDisplay.style.display = "block"
} )

const closeInstructions = document.getElementById("close-instructions").addEventListener("click", function() {
    instructionsDisplay.style.display = "none"
})

const birdle = "KESTREL"

// const getWordle = () => {
//     fetch("http://localhost.8000/word")
//     .then(response => response.json())
//     .then(data => {
//         console.log(data)
//         wordle = data.toUpperCase()
//     })
// }

// getWordle()

// const getWordle = () => {
//     fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordle}`)
//     .then(response => response.json())
//     .then(word => {
//         console.log(word)
//     }) 
// }


const keys = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER", "Z", "X", "C", "V", "B", "N", "M", "«"]


//add variables for different word lengths - below is for 7. Have easy (5), medium (7), hard (9)? 

const guessRows = [
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""]
]

let currentRow = 0
let currentTile = 0
let isGameOver = false

guessRows.forEach((guessRow, guessRowIndex)=> {
    const rowElement = document.createElement("div")
    rowElement.setAttribute("id", "guessRow-" + guessRowIndex)
    rowElement.classList.add("row")
    guessRow.forEach((_guess, guessIndex) => {
        const tileElement = document.createElement("div")
        tileElement.setAttribute("id", "guessRow-" + guessRowIndex + "-tile-" + guessIndex)
        tileElement.classList.add("tile")
        rowElement.append(tileElement) 
    })
    tileDisplay.append(rowElement)
})


keys.forEach(key => {
    const buttonElement = document.createElement("button")
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})
//if game is over then handle click should be deactivated - check Ania's code
const handleClick = (key) => {
    if (!isGameOver){ 
        if (key === "«") {
            deleteLetter()
            return
         }
        if (key === "ENTER") {
            console.log("check row");
            checkRow()
            return
        } 
        addLetter(key)}
}

const addLetter = (letter) => {
    if (currentTile < 7 && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute("data", letter)
        currentTile++
        console.log("guessRows", guessRows )
    }

}

const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`)
        tile.textContent = ""
        guessRows[currentRow][currentTile] = ""
        tile.setAttribute("data", "")
    }
    
}

const checkRow = () => {
    const guess = guessRows[currentRow].join("")

    if (currentTile > 6) {
        flipTile()
        if (birdle === guess) {
            setTimeout(()=> {
                showMessage("Congratulations, you got the Birdle!")
                getWordle()
                isGameOver = true
                return
            
            }, 4000)
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage(`Game Over - the Birdle was ${birdle}`)
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => { 
    const messageElement = document.createElement("p")
    messageElement.textContent = message
    messageElement.classList.add("message")
    messageDisplay.append(messageElement)
    setTimeout (infoDisplay.style.display="block", 4000)
    
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile = () => {
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes
    let checkWordle = birdle
    const guess = []
    
    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute("data"), color: "grey-overlay"})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == birdle[index]) {
            guess.color = "green-overlay"
            checkWordle = checkWordle.replace(guess.letter, "")
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = "yellow-overlay"
            checkWordle = checkWordle.replace(guess.letter, "")
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add("flip")
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500 * index) 
        })
}