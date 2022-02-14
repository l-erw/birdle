//TO DO
// 1. link up dictionary API 
// 4. Find image and info to include when Birdle is won
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

const closeModal = document.getElementById("close-modal").addEventListener("click", function() {
    infoDisplay.style.display = "none"
})

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

const birds7Letters = [
    {
        id: "1",
        birdleName: "KESTREL",
        name: "KESTREL",
        imageUrl: "https://images.unsplash.com/photo-1614522433183-b620ffdad59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1570&q=80",
        imageAltText: "a kestrel hovering in the sky",
        imageAuthor: "Bob Brewer",
        imageAuthorUrl: "https://unsplash.com/photos/UfyDkU1uVX0",
        birdFacts: "Kestrels are a familiar sight with their pointed wings and long tail, hovering beside a roadside verge. Numbers of kestrels have declined since the 1970s, probably as a result of changes in farming and so it is included on the Amber List. They have adapted readily to man-made environments and can survive right in the centre of cities. Kestrels are found in a wide variety of habitats, from moor and heath, to farmland and urban areas. The only places they do not favour are dense forests, vast treeless wetlands and mountains.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/kestrel/"
        //can I have the root of the urls hardcoded and then add the end bits in from this
    },
    {
        id: "2",
        birdleName: "SPARROW",
        name: "SPARROW",
        imageUrl: "https://images.unsplash.com/photo-1591804203147-4a2377cf721d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3028&q=80",
        imageAltText: "a sparrow sitting on a fence post with a green background",
        imageAuthor: "Adam Anderson",
        imageAuthorUrl: "https://unsplash.com/photos/9stPdv50NMc",
        birdFacts: "Noisy and gregarious, these cheerful exploiters of man's rubbish and wastefulness have managed to colonise most of the world. The ultimate avian opportunist perhaps. Monitoring suggests a severe decline in the UK house sparrow population, recently estimated as dropping by 71 per cent between 1977 and 2008 with substantial declines in both rural and urban populations. House sparrows can be found from the centre of cities to the farmland of the countryside, they feed and breed near to people.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/house-sparrow/"
    },
    {
        id: "3",
        birdleName: "BLUETIT",
        name: "BLUE TIT",
        imageUrl: "https://images.unsplash.com/photo-1606396191258-99a611410bcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80",
        imageAltText: "a blue-tit on a twig with a dark background",
        imageAuthor: "Amee Fairbank-Brown",
        imageAuthorUrl: "https://unsplash.com/photos/Jc9pijSwYjY",
        birdFacts: "A colourful mix of blue, yellow, white and green makes the blue tit one of our most attractive and most recognisable garden visitors. In winter, family flocks join up with other tits as they search for food. A garden with four or five blue tits at a feeder at any one time may be feeding 20 or more. Blue tits are common in woodland, hedgerows, parks and gardens. They're widespread and found across the whole of the UK with the exception of some Scottish islands.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/blue-tit/"
    },
    {
        id: "4",
        birdleName:"BITTERN",
        name: "BITTERN",
        imageUrl: "https://cdn.pixabay.com/photo/2021/07/15/14/26/bittern-6468623_1280.jpg",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "",
        birdFactsUrl: ""
    },
    {
        id: "5",
        birdleName: "BUZZARD",
        name: "BUZZARD",
        imageUrl: "https://images.unsplash.com/photo-1630336597270-28e1a7c549b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a buzzard with wings spread flying in the sky",
        imageAuthor: "David Adams",
        imageAuthorUrl: "https://unsplash.com/photos/z1ZTWBn5Eeg",
        birdFacts: "Now the commonest and most widespread UK bird of prey. The buzzard is quite large with broad, rounded wings, and a short neck and tail. When gliding and soaring it will often hold its wings in a shallow 'V' and the tail is fanned. Greatest numbers of buzzards can be found in Scotland, Wales, the Lake District and SW England, but now breeding in every county of the UK. They are found in most habitats particularly woodland, moorland, scrub, pasture, arable, marsh bog and villages.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/buzzard/"
    },
    {
        id: "6",
        birdleName: "COALTIT",
        name: "COAL TIT",
        imageUrl: "https://images.unsplash.com/photo-1643985209176-a372071b4706?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2026&q=80",
        imageAltText: "a coal tit sitting on a bare branch against a blue sky",
        imageAuthor: "Joe Straker",
        imageAuthorUrl: "https://unsplash.com/photos/Ww__D24NK2o",
        birdFacts: "The coal tit has a distinctive grey back, black cap, and white patch at the back of its neck. Its smaller, more slender bill than blue or great tits means it can feed more successfully in conifers. A regular visitor to most feeders, they will take and store food for eating later. In winter they join with other tits to form flocks which roam through woodlands and gardens in search of food. Coal tits can be seen in woodland, especially conifer woods, parks and gardens.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/coal-tit/"
    },
    {
        id: "7",
        birdleName: "GOSHAWK",
        name: "GOSHAWK",
        imageUrl: "https://cdn.pixabay.com/photo/2021/10/10/09/19/goshawk-6696074_1280.jpg",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "The goshawk is a large hawk. When up close it has a fierce expression with bright red eyes and a distinctive white eyebrow. Its broad wings enable it to hunt at high speed, weaving in and out of trees, and its long legs and talons can catch its prey in flight. In late winter and spring it has a 'sky-dance' display. Goshawks are a Schedule 1 species. They are still persecuted and their nests are frequently robbed. Best looked for near large areas of woodland and forests with glades and paths for it to hunt along. They can also be seen hunting over more open countryside.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/goshawk/"
    },
    {
        id: "8",
        birdleName: "REDKITE",
        name: "RED KITE",
        imageUrl: "",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "This magnificently graceful bird of prey is unmistakable with its reddish-brown body, angled wings and deeply forked tail. It was saved from national extinction by one of the world's longest-running protection programmes. It has now been successfully re-introduced to England and Scotland. Red kites are listed under Schedule 1 of The Wildlife and Countryside Act. Central Wales, central England - especially the Chilterns, central Scotland - at Argaty and along the Galloway Kite Trail are the best areas to find them.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/red-kite/"
    },
    {
        id: "9",
        birdleName: "MOORHEN",
        name: "MOORHEN",
        imageUrl: "https://cdn.pixabay.com/photo/2020/04/28/09/43/moorhen-5103686_1280.jpg",
        imageAltText: "a moorhen balancing on a log in water covered with leaves",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "Moorhens are blackish with a red and yellow beak and long, green legs. Seen closer-up, they have a dark brown back and wings and a more bluish-black belly, with white stripes on the flanks. You can see moorhens around any pond, lake, stream or river, or even ditches in farmland. Moorhens can live in cities as well as the countryside. In the UK they breed in in lowland areas, especially in central and eastern England.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/moorhen/"
    },
    {
        id: "10",
        birdleName: "LAPWING",
        name: "LAPWING",
        imageUrl: "https://cdn.pixabay.com/photo/2021/09/06/14/06/lapwing-6601790_1280.jpg",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "Also known as the peewit in imitation of its display calls, its proper name describes its wavering flight. Its black and white appearance and round-winged shape in flight make it distinctive, even without its splendid crest. This familiar farmland bird has suffered significant declines recently and is now a Red List species. Lapwings are found on farmland throughout the UK particularly in lowland areas of northern England, the Borders and eastern Scotland. In the breeding season prefer spring sown cereals, root crops, permanent unimproved pasture, meadows and fallow fields.",
        birdFactsUrl: "https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/lapwing/"
    },
    {
        id: "11",
        birdleName: "BARNOWL",
        name: "BARN OWL",
        imageUrl: "",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "",
        birdFactsUrl: ""
    },
    {
        id: "12",
        birdleName: "SKYLARK",
        name: "SKYLARK",
        imageUrl: "",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "",
        birdFactsUrl: ""
    },
    {
        id: "13",
        birdleName: "SWALLOW",
        name: "SWALLOW",
        imageUrl: "",
        imageAltText: "",
        imageAuthor: "",
        imageAuthorUrl: "",
        birdFacts: "",
        birdFactsUrl: ""
    }

]

let randomBirdle = birds7Letters[Math.floor(Math.random() * birds7Letters.length)]

const birdle = randomBirdle.birdleName



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

//DISPLAYING THE BIRD INFORMATION AT THE END//

let birdInfoHeading = document.getElementById("bird-info-heading")
let birdInfoBody = document.getElementById("bird-info-body")
birdInfoHeading.innerText = randomBirdle.name

birdInfoBody.innerHTML = `
<img src=${randomBirdle.imageUrl} alt="${randomBirdle.imageAltText}">
<a href=${randomBirdle.imageAuthorUrl}>${randomBirdle.imageAuthor} on Unsplash</a>

<p class="info-body">
${randomBirdle.birdFacts}
</p>  

<a href=${randomBirdle.birdFactsUrl}>Info from RSPB</a>`
