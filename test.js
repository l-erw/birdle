test.js

const messageDisplay = document.querySelector(".message-container")
const infoDisplay = document.getElementById("info-overlay")
const instructionsDisplay = document.getElementById("instructions-overlay")
const creditsDisplay = document.getElementById("credits-overlay")
const hintsBtn = document.getElementById("hint-modal")

let guessRows = []
let currentRow = 0
let currentTile = 0
let isGameOver = false
const rows = 6

let sliderValue 
const slider = document.getElementById("wordLength");
const output = document.getElementById("rangevalue");

const randomStartNum = Math.floor(Math.random() * 7)
let columns = randomStartNum +4
output.textContent = columns
slider.value = columns