//TO DO
// Add a "not enough letters" notification if enter is pressed before 7 letters

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

// Open/close modals in title bar
const openCredits = document.getElementById("credits-modal").addEventListener("click", function() {
    creditsDisplay.style.display = "block"
})

const closeCredits = document.getElementById("close-credits").addEventListener("click", function() {
    creditsDisplay.style.display = "none"
})

const closeModal = document.getElementById("close-modal").addEventListener("click", function() {
    infoDisplay.style.display = "none"
})

const openModal = document.getElementById("open-modal").addEventListener("click", function() {
    infoDisplay.style.display = "block"
} )

const openInstructions = document.getElementById("instructions-modal").addEventListener("click", function() {
    instructionsDisplay.style.display = "block"
} )

const closeInstructions = document.getElementById("close-instructions").addEventListener("click", function() {
    instructionsDisplay.style.display = "none"
})

// creates each row of the keyboard -- needs to be changed so it works with a keyboard on a computer
const createKeyboard = () => {  
    const keysRow1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"]
    const keysRow2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"]
    const keysRow3 = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "«"]
    
    keysRow1.forEach(key => {
        const keyboardRow1 = document.querySelector(".row-container1")
        console.log(keyboardRow1)
        const buttonElement = document.createElement("button")
        buttonElement.classList.add("test")
        buttonElement.textContent = key
        buttonElement.setAttribute('id', key)
        buttonElement.addEventListener('click', () => handleClick(key))
        keyboardRow1.append(buttonElement)
    })

    keysRow2.forEach(key => {
        const keyboardRow2 = document.querySelector(".row-container2")
        const buttonElement = document.createElement("button")
        buttonElement.classList.add("test")
        buttonElement.textContent = key
        buttonElement.setAttribute('id', key)
        buttonElement.addEventListener('click', () => handleClick(key))
        keyboardRow2.append(buttonElement)
    })

    keysRow3.forEach(key => {
        const keyboardRow3 = document.querySelector(".row-container3")
        const buttonElement = document.createElement("button")
        buttonElement.classList.add("test")
        buttonElement.textContent = key
        buttonElement.setAttribute('id', key)
        buttonElement.setAttribute("data-key", key)
        buttonElement.addEventListener('click', () => handleClick(key))
        keyboardRow3.append(buttonElement)
    })

    const keyListeners = new Set();
    keysRow1.addEventListener("click", (e) => {
      e.preventDefault();
      const key = e.target.getAttribute("data-key");
      if (key) {
        keyListeners.forEach((l) => l(key));
      }
    });

}
createKeyboard()


//Bird info

const birds = [
    // {
    //     id: ,
    //     letterNumber: ,
    //     birdleName: "",
    //     name: "",
    //     imageUrl: "",
    //     imageAltText: "",
    //     imageAuthor: "",
    //     imageAuthorUrl: "",
    //     birdFacts: "",
    //     birdFactsUrl: ""
    // },

// 4 LETTERS
    {
        id: 41,
        letterNumber: 4,
        birdleName: "SWAN",
        name: "swan",
        imageUrl: "https://images.unsplash.com/photo-1644195543725-d7c2a7281287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a swan with its wings raised slightly, swimming in a lake",
        imageAuthor: "Chris Linnett on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/aJCdV-yAWO4",
        birdFacts: "The mute swan is a very large white waterbird. It has a long S-shaped neck and an orange bill with a black base and a black knob. It flies with its neck extended and regular, slow wingbeats. The population in the UK has increased recently, perhaps due to better protection of this species. The problem of lead poisoning on lowland rivers has also largely been solved by a ban on the sale of lead fishing weights. Some birds stay in their territories all year, while others move short distances and form winter flocks. In cold weather, some birds arrive from Europe into eastern England.",
        birdFactsUrl: "mute-swan/"
    },
    {
        id: 42,
        letterNumber: 4,
        birdleName: "CROW",
        name: "crow",
        imageUrl: "https://cdn.pixabay.com/photo/2019/02/23/19/50/raven-4016367_1280.jpg",
        imageAltText: "a crow standing on grass with autumn leaves",
        imageAuthor: "Uschi_Du",
        imageAuthorUrl: "https://pixabay.com/photos/crow-black-bird-animal-nature-4016367/",
        birdFacts: "The all-black carrion crow is one of the cleverest, most adaptable of our birds. It is often quite fearless, although it can be wary of man. They are fairly solitary, usually found alone or in pairs, although they may form occasional flocks.The closely related hooded crow has recently been split as a separate species. Carrion crows will come to gardens for food and although often cautious initially, they soon learn when it is safe, and will return repeatedly to take advantage of whatever is on offer.",
        birdFactsUrl: "carrion-crow/"
    },
    {
        id: 43,
        letterNumber: 4,
        birdleName: "GULL",
        name: "gull",
        imageUrl: "https://cdn.pixabay.com/photo/2017/02/18/02/02/seagull-2076355_1280.jpg",
        imageAltText: "a gull standing on a wooden fence at the seaside",
        imageAuthor: "diego_torres",
        imageAuthorUrl: "https://pixabay.com/photos/seagull-ocean-coast-bird-dorset-2076355/",
        birdFacts: "The common gull looks like a small, gentler version of the herring gull, with greenish legs and a yellow bill. Despite its name, it is not at all common in most inland areas, though it can be abundant on the coast and in some eastern counties. They are now seen more often in towns and on housing estates in winter.",
        birdFactsUrl: "common-gull/"
    },
    {
        id: 44,
        letterNumber: 4,
        birdleName: "TERN",
        name: "tern",
        imageUrl: "https://cdn.pixabay.com/photo/2021/04/14/14/21/tern-6178544_1280.jpg",
        imageAltText: "a tern standing on a stone pillar with its beak open",
        imageAuthor: "Georg_Wietschorke",
        imageAuthorUrl: "https://pixabay.com/photos/tern-bird-animal-perched-wildlife-6178544/",
        birdFacts: "These delightful silvery-grey and white birds have long tails which have earned them the nickname 'sea-swallow'. They have a buoyant, graceful flight and frequently hover over water before plunging down for a fish. They are often noisy in company and breed in colonies. The common tern is the tern species most likely to be found inland. The common tern breeds along coasts with shingle beaches and rocky islands, on rivers with shingle bars, and at inland gravel pits and reservoirs, feeding along rivers and over freshwater. Migrating birds can be seen offshore in autumn.",
        birdFactsUrl: "common-tern/"
    }, 
    {
        id: 45,
        letterNumber: 4,
        birdleName: "COOT",
        name: "coot",
        imageUrl: "https://cdn.pixabay.com/photo/2019/02/28/14/13/coot-4026019_1280.jpg",
        imageAltText: "a coot walking across water that has frozen over",
        imageAuthor: "MabelAmber",
        imageAuthorUrl: "https://pixabay.com/photos/coot-water-bird-animal-walking-ice-4026019/",
        birdFacts: "All-black and larger than its cousin, the moorhen, the Eurasian coot has a distinctive white beak and 'shield' above the beak which earns it the title 'bald'. Its feet have distinctive lobed flaps of skin on the toes which act in the same way as webbed feet when swimming. It patters noisily over the water before taking off and can be very aggressive towards others. Coot can be seen mainly on freshwater lakes, gravel pits, reservoirs, rivers and town park lakes when deep enough. Sometimes seen offshore, especially in winter if freshwater areas are frozen.",
        birdFactsUrl: "coot/"
    }, 
    {
        id: 46,
        letterNumber: 4,
        birdleName: "ROOK",
        name: "rook",
        imageUrl: "https://cdn.pixabay.com/photo/2020/04/30/17/36/bird-5113827_1280.jpg",
        imageAltText: "a rook standing on a thin tree branch",
        imageAuthor: "bluebudgie",
        imageAuthorUrl: "https://pixabay.com/photos/bird-rook-beak-nature-crow-family-5113827/",
        birdFacts: "Bare, greyish-white face, thinner beak and peaked head make it distinguishable from the carrion crow. Rooks are very sociable birds and you're not likely to see one on its own. They feed and roost in flocks in winter, often together with jackdaws.",
        birdFactsUrl: "rook/"
    },
    {
        id: 47,
        letterNumber: 4,
        birdleName: "WREN",
        name: "wren",
        imageUrl: "https://cdn.pixabay.com/photo/2021/02/10/13/20/wren-6002068_1280.jpg",
        imageAltText: "a wren standing on the end of a grey branch",
        imageAuthor: "DieNaturreise",
        imageAuthorUrl: "https://pixabay.com/photos/wren-bird-wood-perched-animal-6002068/",
        birdFacts: "The wren is a tiny brown bird, although it is heavier and not as slim as the even smaller goldcrest. It is dumpy, almost rounded, with a fine bill, quite long legs and toes, very short round wings and a short, narrow tail which is sometimes cocked up vertically. For such a small bird it has a remarkably loud voice. It is the most common UK breeding bird, although it suffers declines during prolonged, severely cold winters. Wrens can be found across the UK in a wide range of habitats - woodland, farmland, heathland, moorland and islands. They are a regular visitor to most gardens.",
        birdFactsUrl: "wren/"
    },

// 5 LETTERS 
    {
        id: 51,
        letterNumber: 5,
        birdleName: "RAVEN",
        name: "raven",
        imageUrl: "https://images.unsplash.com/photo-1594563144007-08462601c1b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a raven standing in a grassy field",
        imageAuthor: "Nico Meier on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/tpFdcpCGG9M",
        birdFacts: "The common raven is massive - the biggest member of the crow family. It is all black with a large bill, and long wings. In flight, it shows a diamond-shaped tail. Ravens breed mainly in the west and north although they are currently expanding their range eastwards. Most birds are residents, though some birds - especially non-breeders and young birds - wander from their breeding areas but do not travel far. Ravens are best looked for in upland areas of south-west England, Wales, the north Pennines and Lake District and much of Scotland.",
        birdFactsUrl: "raven/"
    },
    {
        id: 52,
        letterNumber: 5,
        birdleName: "HERON",
        name: "heron",
        imageUrl: "https://images.unsplash.com/photo-1572986648308-88a49b13a081?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a heron standing on a muddy bank next to water",
        imageAuthor: "Santiago Lacarta on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/irmLHXKpT8Y",
        birdFacts: "Grey herons are unmistakeable: tall, with long legs, a long beak and grey, black and white feathering. They can stand with their neck stretched out, looking for food, or hunched down with their neck bent over their chest. Grey herons can be seen around any kind of water - garden ponds, lakes, rivers and even on estuaries. Sometimes, grey herons circle high up into the sky and can be mistaken for large birds of prey.",
        birdFactsUrl: "grey-heron"
    },
    {
        id: 53,
        letterNumber: 5,
        birdleName: "QUAIL",
        name: "quail",
        imageUrl: "https://cdn.pixabay.com/photo/2020/12/29/19/30/bird-5871357_1280.jpg",
        imageAltText: "a quail standing on muddy ground with a green-yellow background",
        imageAuthor: "terforeign",
        imageAuthorUrl: "https://pixabay.com/photos/bird-quail-feathers-plumage-ave-5871357/",
        birdFacts: "Quails are distinctive due to the combination of their stocky bodies and long, pointed wings. Their upperparts are brown, streaked and barred with buff, while their underparts are a warm buffy orange.Rarely seen, they are more often heard giving a distinctive “wet-my-lips” call. Their breeding range reaches as far north as the UK, where they are the only migrant species of the Phasianidae family. Due to their historical decline, quails are on the Amber List but are now in partial recovery. They are also listed on Schedule 1 of The Wildlife and Countryside Act 1981.",
        birdFactsUrl: "quail/"
    }, 
    {
        id: 54,
        letterNumber: 5,
        birdleName: "ROBIN",
        name: "robin",
        imageUrl: "https://images.unsplash.com/photo-1619976302135-5efbc2a7785a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a robin perched on a branch with budding green leaves",
        imageAuthor: "Alfred Kenneally on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/FH-DVrQoS4c",
        birdFacts: "The UK's favourite bird - with its bright red breast it is familiar throughout the year and especially at Christmas! Males and females look identical, and young birds have no red breast and are spotted with golden brown. Robins sing nearly all year round and despite their cute appearance, they are aggressively territorial and are quick to drive away intruders. They will sing at night next to street lights. Robins live across the UK in woodland, hedgerows, parks and gardens.",
        birdFactsUrl: "robin/"
    }, 
    {
        id: 55,
        letterNumber: 5,
        birdleName: "SWIFT",
        name: "swift",
        imageUrl: "https://cdn.pixabay.com/photo/2020/06/01/22/15/swift-5248648_1280.jpg",
        imageAltText: "a swift flying, bright blue sky",
        imageAuthor: "TheOtherKev",
        imageAuthorUrl: "https://pixabay.com/photos/swift-european-swift-black-bird-5248648/",
        birdFacts: "Swifts are dark, sooty brown all over, but often look black against the sky. If you get a good look, you might see their pale throat. The wings are long and narrow, with a tail that is slightly forked, but not as much as a swallow's. Swifts have a piercing, screaming call, but they aren't noisy at the nest. Swifts nest in holes - often inside old buildings or sometimes in specially-designed swift nestboxes. You'll see swifts flying low and fast around buildings, screaming loudly, or perhaps swooping fast into a little crevice in a building to their nests. You won't see them perching on telegraph wires or fences; they have tiny feet and legs and can hardly walk!",
        birdFactsUrl: "swift/"
    },

// 6 LETTERS
    {
        id: 61,
        letterNumber: 6,
        birdleName: "CUCKOO",
        name: "cuckoo",
        imageUrl: "https://cdn.pixabay.com/photo/2020/08/10/20/19/bird-5478714_1280.jpg",
        imageAltText: "a cuckoo sitting on a wooden pole with a green background",
        imageAuthor: "maroj10",
        imageAuthorUrl: "https://pixabay.com/photos/bird-eurasian-cuckoo-feathers-5478714/",
        birdFacts: "The cuckoo is a dove-sized bird with blue grey upper parts, head and chest with dark barred white under parts. With their sleek body, long tail and pointed wings they are not unlike kestrels or sparrowhawks. Sexes are similar and the young are brown. They are summer visitors and well-known brood parasites, the females laying their eggs in the nests of other birds, especially meadow pipits, dunnocks and reed warblers. Their recent population decline makes this a Red List species.",
        birdFactsUrl: "cuckoo/"
    },
    {
        id: 62,
        letterNumber: 6,
        birdleName: "CURLEW",
        name: "curlew",
        imageUrl: "https://images.unsplash.com/photo-1616273694979-7ef012782d22?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2143&q=80",
        imageAltText: "a curlew standing on a sandy bank with algae",
        imageAuthor: "Bob Brewer on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/i3UQSxJQyiI",
        birdFacts: "The curlew is the largest European wading bird, instantly recognisable on winter estuaries or summer moors by its long, downcurved bill, brown upperparts, long legs and evocative call. The curlew can be seen around the whole UK coastline with the largest concentrations of found at Morecambe Bay, the Solway Firth, the Wash, and the Dee, Severn, Humber and Thames estuaries. Greatest breeding numbers are found in N Wales, the Pennines, the southern uplands and E Highlands of Scotland and the Northern Isles.",
        birdFactsUrl: "curlew/"
    },
    {
        id: 63,
        letterNumber: 6,
        birdleName: "GANNET",
        name: "gannet",
        imageUrl: "https://images.unsplash.com/photo-1603545052641-b4d994b7f09e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        imageAltText: "a gannet sitting on a rocky cliff edge over the sea",
        imageAuthor: "Carrie O'Leary",
        imageAuthorUrl: "https://unsplash.com/photos/Sa8fuuzBRao",
        birdFacts: "Adult gannets are large and bright white with black wingtips. They are distinctively shaped with a long neck and long pointed beak, long pointed tail, and long pointed wings. At sea they flap and then glide low over the water, often travelling in small groups. They feed by flying high and circling before plunging into the sea. They breed in significant numbers at only a few localities and so is an Amber List species. They can be seen offshore almost anywhere, especially when they migrate south between August and September.",
        birdFactsUrl: "gannet/"
    },
    {
        id: 64,
        letterNumber: 6,
        birdleName: "MAGPIE",
        name: "magpie",
        imageUrl: "https://cdn.pixabay.com/photo/2022/02/17/07/26/bird-7018105_1280.jpg",
        imageAltText: "a magpie standing on a wooden post with bird seed on it",
        imageAuthor: "Georg_Wietschorke",
        imageAuthorUrl: "https://pixabay.com/photos/bird-magpie-ornithology-species-7018105/",
        birdFacts: "With its noisy chattering, black-and-white plumage and long tail, there is nothing else quite like the magpie in the UK. When seen close-up its black plumage takes on an altogether more colourful hue with a purplish-blue iridescent sheen to the wing feathers and a green gloss to the tail. Magpies seem to be jacks of all trades - scavengers, predators and pest-destroyers, their challenging, almost arrogant attitude has won them few friends. Non-breeding birds will gather together in flocks.",
        birdFactsUrl: "magpie/"
    }, 
    {
        id: 65,
        letterNumber: 6,
        birdleName: "OSPREY",
        name: "osprey",
        imageUrl: "https://cdn.pixabay.com/photo/2021/10/03/07/00/bird-6677140_1280.jpg",
        imageAltText: "an osprey flying in clear blue sky",
        imageAuthor: "Johnnys_pic",
        imageAuthorUrl: "https://pixabay.com/photos/bird-osprey-ornithology-species-6677140/",
        birdFacts: "Seen in flight from below the osprey has white or slightly mottled underparts. The long wings are angled, bending at the 'wrist' which has a black patch contrasting with the white wing linings and at a distance it could be mistaken for a large gull. This spectacular fish-eating bird of prey is an Amber List species because of its historical decline (due to illegal killing) and low breeding numbers. They are listed as a Schedule 1 species on The Wildlife and Countryside Act.",
        birdFactsUrl: "osprey/"
    }, 
    {
        id: 66,
        letterNumber: 6,
        birdleName: "PUFFIN",
        name: "puffin",
        imageUrl: "https://images.unsplash.com/photo-1630016537018-d46c0ad5c6bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a puffin standing on long grass against a bright blue background",
        imageAuthor: "Jonatan Pie on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/s_pW5jcElAM",
        birdFacts: "Puffins are unmistakable birds with their black back and white underparts, distinctive black head with large pale cheeks and their tall, flattened, brightly-coloured bill. Its comical appearance is heightened by its red and black eye-markings and bright orange legs. Used as a symbol for books and other items, this clown among seabirds is one of the world's favourite birds. With half of the UK population at only a few sites it is an Red List species.",
        birdFactsUrl: "puffin/"
    },    
    
    // 7 LETTERS 
    {
        id: "71",
        letterNumber: 7,
        birdleName: "KESTREL",
        name: "kestrel",
        imageUrl: "https://images.unsplash.com/photo-1614522433183-b620ffdad59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1570&q=80",
        imageAltText: "a kestrel hovering in the sky",
        imageAuthor: "Bob Brewer on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/UfyDkU1uVX0",
        birdFacts: "Kestrels are a familiar sight with their pointed wings and long tail, hovering beside a roadside verge. Numbers of kestrels have declined since the 1970s, probably as a result of changes in farming and so it is included on the Amber List. They have adapted readily to man-made environments and can survive right in the centre of cities. Kestrels are found in a wide variety of habitats, from moor and heath, to farmland and urban areas. The only places they do not favour are dense forests, vast treeless wetlands and mountains.",
        birdFactsUrl: "kestrel/"
    },
    {
        id: "72",
        letterNumber: 7,
        birdleName: "SPARROW",
        name: "sparrow",
        imageUrl: "https://images.unsplash.com/photo-1591804203147-4a2377cf721d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3028&q=80",
        imageAltText: "a sparrow sitting on a fence post with a green background",
        imageAuthor: "Adam Anderson on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/9stPdv50NMc",
        birdFacts: "Noisy and gregarious, these cheerful exploiters of man's rubbish and wastefulness have managed to colonise most of the world. The ultimate avian opportunist perhaps. Monitoring suggests a severe decline in the UK house sparrow population, recently estimated as dropping by 71 per cent between 1977 and 2008 with substantial declines in both rural and urban populations. House sparrows can be found from the centre of cities to the farmland of the countryside, they feed and breed near to people.",
        birdFactsUrl: "house-sparrow/"
    },
    {
        id: "73",
        letterNumber: 7,
        birdleName: "BLUETIT",
        name: "blue tit",
        imageUrl: "https://images.unsplash.com/photo-1606396191258-99a611410bcc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2067&q=80",
        imageAltText: "a blue-tit on a twig with a dark background",
        imageAuthor: "Amee Fairbank-Brown on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/Jc9pijSwYjY",
        birdFacts: "A colourful mix of blue, yellow, white and green makes the blue tit one of our most attractive and most recognisable garden visitors. In winter, family flocks join up with other tits as they search for food. A garden with four or five blue tits at a feeder at any one time may be feeding 20 or more. Blue tits are common in woodland, hedgerows, parks and gardens. They're widespread and found across the whole of the UK with the exception of some Scottish islands.",
        birdFactsUrl: "blue-tit/"
    },
    {
        id: "74",
        letterNumber: 7,
        birdleName:"BITTERN",
        name: "bittern",
        imageUrl: "https://cdn.pixabay.com/photo/2021/07/15/14/26/bittern-6468623_1280.jpg",
        imageAltText: "a bittern flying low through some reeds",
        imageAuthor: "--",
        imageAuthorUrl: "--",
        birdFacts: "The bittern is a thickset heron with all-over bright, pale, buffy-brown plumage covered with dark streaks and bars. It flies on broad, rounded, bowed wings. A secretive bird, very difficult to see, as it moves silently through reeds at water's edge, looking for fish. The males make a remarkable far-carrying, booming sound in spring. It's very small, reedbed-dependent population make it an Amber List species. It is also a Schedule 1 species.",
        birdFactsUrl: "bittern/"
    },
    {
        id: "75",
        letterNumber: 7,
        birdleName: "BUZZARD",
        name: "buzzard",
        imageUrl: "https://cdn.pixabay.com/photo/2022/02/01/11/59/buzzard-6986163_1280.jpg",
        imageAltText: "a buzzard flying in the sky",
        imageAuthor: "--",
        imageAuthorUrl: "--",
        birdFacts: "Now the commonest and most widespread UK bird of prey. The buzzard is quite large with broad, rounded wings, and a short neck and tail. When gliding and soaring it will often hold its wings in a shallow 'V' and the tail is fanned. Greatest numbers of buzzards can be found in Scotland, Wales, the Lake District and SW England, but now breeding in every county of the UK. They are found in most habitats particularly woodland, moorland, scrub, pasture, arable, marsh bog and villages.",
        birdFactsUrl: "buzzard/"
    },
    {
        id: "76",
        letterNumber: 7,
        birdleName: "COALTIT",
        name: "Coal tit",
        imageUrl: "https://images.unsplash.com/photo-1643985209176-a372071b4706?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2026&q=80",
        imageAltText: "a coal tit sitting on a bare branch against a blue sky",
        imageAuthor: "Joe Straker on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/Ww__D24NK2o",
        birdFacts: "The coal tit has a distinctive grey back, black cap, and white patch at the back of its neck. Its smaller, more slender bill than blue or great tits means it can feed more successfully in conifers. A regular visitor to most feeders, they will take and store food for eating later. In winter they join with other tits to form flocks which roam through woodlands and gardens in search of food. Coal tits can be seen in woodland, especially conifer woods, parks and gardens.",
        birdFactsUrl: "coal-tit/"
    },
    {
        id: "77",
        letterNumber: 7,
        birdleName: "GOSHAWK",
        name: "goshawk",
        imageUrl: "https://cdn.pixabay.com/photo/2021/10/10/09/19/goshawk-6696074_1280.jpg",
        imageAltText: "a goshawk standing on a mossy log",
        imageAuthor: "--",
        imageAuthorUrl: "--",
        birdFacts: "The goshawk is a large hawk. When up close it has a fierce expression with bright red eyes and a distinctive white eyebrow. Its broad wings enable it to hunt at high speed, weaving in and out of trees, and its long legs and talons can catch its prey in flight. In late winter and spring it has a 'sky-dance' display. Goshawks are a Schedule 1 species. They are still persecuted and their nests are frequently robbed. Best looked for near large areas of woodland and forests with glades and paths for it to hunt along. They can also be seen hunting over more open countryside.",
        birdFactsUrl: "goshawk/"
    },
    {
        id: "78",
        letterNumber: 7,
        birdleName: "REDKITE",
        name: "red kite",
        imageUrl: "https://images.unsplash.com/photo-1630336597270-28e1a7c549b7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a red kite with wings spread flying in the sky",
        imageAuthor: "David Adams on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/z1ZTWBn5Eeg",
        birdFacts: "This magnificently graceful bird of prey is unmistakable with its reddish-brown body, angled wings and deeply forked tail. It was saved from national extinction by one of the world's longest-running protection programmes. It has now been successfully re-introduced to England and Scotland. Red kites are listed under Schedule 1 of The Wildlife and Countryside Act. Central Wales, central England - especially the Chilterns, central Scotland - at Argaty and along the Galloway Kite Trail are the best areas to find them.",
        birdFactsUrl: "red-kite/"
    },
    {
        id: "79",
        letterNumber: 7,
        birdleName: "MOORHEN",
        name: "moorhen",
        imageUrl: "https://cdn.pixabay.com/photo/2020/04/28/09/43/moorhen-5103686_1280.jpg",
        imageAltText: "a moorhen balancing on a log in water covered with leaves",
        imageAuthor: "--",
        imageAuthorUrl: "--",
        birdFacts: "Moorhens are blackish with a red and yellow beak and long, green legs. Seen closer-up, they have a dark brown back and wings and a more bluish-black belly, with white stripes on the flanks. You can see moorhens around any pond, lake, stream or river, or even ditches in farmland. Moorhens can live in cities as well as the countryside. In the UK they breed in in lowland areas, especially in central and eastern England.",
        birdFactsUrl: "moorhen/"
    },
    {
        id: "710",
        letterNumber: 7,
        birdleName: "LAPWING",
        name: "lapwing",
        imageUrl: "https://cdn.pixabay.com/photo/2021/09/06/14/06/lapwing-6601790_1280.jpg",
        imageAltText: "a lapwing standing in a grassy area",
        imageAuthor: "--",
        imageAuthorUrl: "--",
        birdFacts: "Also known as the peewit in imitation of its display calls, its proper name describes its wavering flight. Its black and white appearance and round-winged shape in flight make it distinctive, even without its splendid crest. This familiar farmland bird has suffered significant declines recently and is now a Red List species. Lapwings are found on farmland throughout the UK particularly in lowland areas of northern England, the Borders and eastern Scotland. In the breeding season prefer spring sown cereals, root crops, permanent unimproved pasture, meadows and fallow fields.",
        birdFactsUrl: "lapwing/"
    },
    {
        id: "711",
        letterNumber: 7,
        birdleName: "BARNOWL",
        name: "barn owl",
        imageUrl: "https://images.unsplash.com/photo-1600892457290-84afbce878f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2183&q=80",
        imageAltText: "a barn owl flying with a green background",
        imageAuthor: "Bob Brewer on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/DohCyud44t4",
        birdFacts: "With heart-shaped face, buff back and wings and pure white underparts, the barn owl is a distinctive and much-loved countryside bird. Widely distributed across the UK, and indeed the world, this bird has suffered declines through the 20th century and is thought to have been adversely affected by organochlorine pesticides such as DDT in the 1950s and '60s. Barn owls can be seen in open country, along field edges, riverbanks and roadside verges.",
        birdFactsUrl: "barn-owl/"
    },
    {
        id: "712",
        letterNumber: 7,
        birdleName: "SKYLARK",
        name: "skylark",
        imageUrl: "https://images.unsplash.com/photo-1615152408858-e650ef778cd4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2875&q=80",
        imageAltText: "a skylark flying on a muted brown background",
        imageAuthor: "Bob Brewer on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/y3jsWdA0pBQ",
        birdFacts: "The skylark is a small brown bird, somewhat larger than a sparrow but smaller than a starling. It is streaky brown with a small crest, which can be raised when the bird is excited or alarmed, and a white-sided tail. The wings also have a white rear edge, visible in flight. It is renowned for its display flight, vertically up in the air. Its recent and dramatic population declines make it a Red List species. Likes open countryside, from lowland farmland to upland moorland. Often inconspicuous on the ground, it is easy to see when in its distinctive song flight.",
        birdFactsUrl: "skylark/"
    },
    {
        id: "713",
        letterNumber: 7,
        birdleName: "SWALLOW",
        name: "swallow",
        imageUrl: "https://cdn.pixabay.com/photo/2020/05/27/21/42/swallow-flying-5228995_1280.jpg",
        imageAltText: "a swallow flying against a blue sky",
        imageAuthor: "--",
        imageAuthorUrl: "--",
        birdFacts: "Swallows are small birds with dark, glossy-blue backs, red throats, pale underparts and long tail streamers. They are extremely agile in flight and spend most of their time on the wing. They are widespread breeding birds in the Northern Hemisphere, migrating south in winter. Swallows are found in areas where there is a ready and accessible supply of small insects. They are particularly fond of open pasture with access to water and quiet farm buildings. Large reedbeds in late summer and early autumn can be good places to look for pre-migration roosts.",
        birdFactsUrl: "swallow/"
    }, 
    {
        id: 714,
        letterNumber: 7,
        birdleName: "JACKDAW",
        name: "jackdaw",
        imageUrl: "https://images.unsplash.com/photo-1627244039947-9efa989b3c1b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        imageAltText: "a jackdaw standing on a fence post with a green background",
        imageAuthor: "Roman Klimenko on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/oTD4AQBx8_U",
        birdFacts: "This is a small, black crow with a distinctive silvery sheen to the back of its head. The pale eyes are also noticeable. The jackdaw call is a familiar hard 'tchack' from which it gets its name. It will commonly nest in chimneys, buildings, rock crevices and tree holes. Jackdaws can be found in fields, woods, parks and gardens. They're social birds and roost communally in woodlands. They're widespread and common across the UK, except the Scottish Highlands.",
        birdFactsUrl: "jackdaw/"
    },

// 8 LETTERS
    {
        id: 81,
        letterNumber: 8,
        birdleName: "NUTHATCH",
        name: "nuthatch",
        imageUrl: "https://images.unsplash.com/photo-1589059218995-eb41db1ff6ab?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a nuthatch perched on the end of a branch",
        imageAuthor: "Steve Harrris on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/kAmNlU_b1G4",
        birdFacts: "The nuthatch is a plump bird about the size of a great tit that resembles a small woodpecker. It is blue-grey above and whitish below, with chestnut on its sides and under its tail. It has a black stripe on its head, a long black pointed bill and short legs. It breeds throughout England and Wales and has recently began to breed in southern Scotland. It is a resident, with birds seldom travelling far from the woods where they hatch.",
        birdFactsUrl: "nuthatch/"
    }, 
    {
        id: 82,
        letterNumber: 8,
        birdleName: "STARLING",
        name: "starling",
        imageUrl: "https://images.unsplash.com/photo-1586294149907-67c50e90f8df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
        imageAltText: "a starling perched on some brambles",
        imageAuthor: "Martin Sepion",
        imageAuthorUrl: "https://unsplash.com/photos/HURLBAYV2hY",
        birdFacts: "Smaller than blackbirds, with a short tail, pointed head, triangular wings, starlings look black at a distance but when seen closer they are very glossy with a sheen of purples and greens. Their flight is fast and direct and they walk and run confidently on the ground. Noisy and gregarious, starlings spend a lot of the year in flocks. Still one of the commonest of garden birds, its decline elsewhere makes it a Red List species.",
        birdFactsUrl: "starling/"
    },
    {
        id: 83,
        letterNumber: 8,
        birdleName: "TAWNYOWL",
        name: "tawny owl",
        imageUrl: "https://cdn.pixabay.com/photo/2021/03/09/21/16/owl-6082868_1280.jpg",
        imageAltText: "a tawny owl perched in a tree with a green background",
        imageAuthor: "JonPauling",
        imageAuthorUrl: "https://pixabay.com/photos/owl-bird-tree-perched-tawny-owl-6082868/",
        birdFacts: "The tawny owl is an owl the size of a woodpigeon. It has a rounded body and head, with a ring of dark feathers around its face surrounding the dark eyes. Tawny owls in the UK are mainly reddish brown above and paler underneath. It is a widespread breeding species in England, Wales and Scotland but not found in Ireland. Birds are mainly residents with established pairs probably never leaving their territories. Young birds disperse from breeding grounds in autumn.",
        birdFactsUrl: "tawny-owl/"
    },
    {
        id: 84,
        letterNumber: 8,
        birdleName: "PHEASANT",
        name: "pheasant",
        imageUrl: "https://images.unsplash.com/photo-1618219429890-f76dfd963810?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80",
        imageAltText: "a pheasant standing in a grassy area",
        imageAuthor: "Julie Mayo on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/5JkO2Wyrazk",
        birdFacts: "Pheasants are large, long-tailed gamebirds. The males have rich chestnut, golden-brown and black markings on their bodies and tails, with a dark green head and red face wattling. Females are mottled with paler brown and black. They were introduced to the UK long ago and more recent introductions have brought in a variety of races and breeds for sport shooting. You can see pheasants across most of the UK. They are least common in upland and urban areas. They can usually be seen in the open countryside near woodland edges, copses and hedgerows.",
        birdFactsUrl: "pheasant/"
    },
    {
        id: 85,
        letterNumber: 8,
        birdleName: "BLACKCAP",
        name: "blackcap",
        imageUrl: "https://cdn.pixabay.com/photo/2021/04/20/17/36/blackcap-6194496_1280.jpg",
        imageAltText: "a blackcap perched in a tree with wide leaves",
        imageAuthor: "koala0815",
        imageAuthorUrl: "https://pixabay.com/photos/blackcap-bird-plant-perched-animal-6194496/",
        birdFacts: "The blackcap is a distinctive greyish warbler, the male has a black cap, and the female a chestnut one. Its delightful fluting song has earned it the name 'northern nightingale'. Although primarily a summer visitor birds from Germany and north-east Europe are increasingly spending the winter in the UK. Blackcap are best looked for in woodland, parks and gardens with plenty of trees and shrubs. In winter will readily come into gardens.",
        birdFactsUrl: "blackcap/"
    },
    {
        id: 86,
        letterNumber: 8,
        birdleName: "GREATTIT",
        name: "great tit",
        imageUrl: "https://cdn.pixabay.com/photo/2020/03/01/10/00/tit-4892191_1280.jpg",
        imageAltText: "a great tit perched on the edge of a red bowl",
        imageAuthor: "Ralphs_Fotos",
        imageAuthorUrl: "https://pixabay.com/photos/great-tit-tit-songbird-bird-4892191/",
        birdFacts: "The largest UK tit - green and yellow with a striking glossy black head with white cheeks and a distinctive two-syllable song. It is a woodland bird which has readily adapted to man-made habitats to become a familiar garden visitor. It can be quite aggressive at a birdtable, fighting off smaller tits. In winter it joins with blue tits and others to form roaming flocks which scour gardens and countryside for food.",
        birdFactsUrl: "great-tit"
    }, 
    
// 9 LETTERS

    {
        id: 91,
        letterNumber: 9,
        birdleName: "GOLDFINCH",
        name: "goldfinch",
        imageUrl: "https://images.unsplash.com/photo-1589142911133-a1708d18c26e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80",
        imageAltText: "a goldfinch perched on the end of a green thistle",
        imageAuthor: "Steve Harrris on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/gjTk9N8hYME",
        birdFacts: "The goldfinch is a highly coloured finch with a bright red face and yellow wing patch. Sociable, often breeding in loose colonies, they have a delightful liquid twittering song and call. Their long fine beaks allow them to extract otherwise inaccessible seeds from thistles and teasels. Increasingly they are visiting bird tables and feeders. In winter many UK goldfinches migrate as far south as Spain. Goldfinches can be seen anywhere there are scattered bushes and trees, rough ground with thistles and other seeding plants.",
        birdFactsUrl: "goldfinch/"
    },
    {
        id: 92,
        letterNumber: 9,
        birdleName: "CHAFFINCH",
        name: "chaffinch",
        imageUrl: "https://images.unsplash.com/photo-1613926659017-c32cb6f4e0ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2004&q=80",
        imageAltText: "a chaffinch standing on some mossy rocks",
        imageAuthor: "Jonny Gios on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/0BVMly7iwdk",
        birdFacts: "The chaffinch is one of the most widespread and abundant bird in Britian and Ireland. Its patterned plumage helps it to blend in when feeding on the ground and it becomes most obvious when it flies, revealing a flash of white on the wings and white outer tail feathers. It does not feed openly on bird feeders - it prefers to hop about under the bird table or under the hedge. You'll usually hear chaffinches before you see them, with their loud song and varied calls.",
        birdFactsUrl: "chaffinch/"
    }, 
    {
        id: 93,
        letterNumber: 9,
        birdleName: "SANDPIPER",
        name: "sandpiper",
        imageUrl: "https://images.unsplash.com/photo-1496324072849-ce00ab4660fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80",
        imageAltText: "a sandpiper walking across wet sand",
        imageAuthor: "Ray Hennessy on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/BR2rEWcQQJQ",
        birdFacts: "The common sandpiper is a smallish wader with contrasting brown upperparts and white underparts. It habitually bobs up and down, known as 'teetering', and has a distinctive flight with stiff, bowed wings. Its presence is often betrayed by its three-note call which it gives as it flies off.",
        birdFactsUrl: "common-sandpiper/"
    }, 
    {
        id: 94,
        letterNumber: 9,
        birdleName: "CORMORANT",
        name: "cormorant",
        imageUrl: "https://images.unsplash.com/photo-1612525338154-b32f9a6c751e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2141&q=80",
        imageAltText: "a cormorant with its wings spread next to some water",
        imageAuthor: "Kevin Grieve on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/yUispQVwPbs",
        birdFacts: "A large, black, and conspicuous waterbird, the cormorant has an almost primitive appearance with its long neck making it appear reptilian. It is often seen standing with its wings held out to dry. Regarded by some as sinister and greedy, cormorants are supreme fishers which can bring them into conflict with anglers, thus causing them to be persecuted in the past. The UK holds internationally significant wintering numbers.",
        birdFactsUrl: "cormorant/"
    },
    {
        id: 95,
        letterNumber: 9,
        birdleName: "BLACKBIRD",
        name: "blackbird",
        imageUrl: "https://images.unsplash.com/photo-1592863742638-27972ef5c3f9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2061&q=80",
        imageAltText: "a blackbird standing on a green leafy hedge",
        imageAuthor: "derek braithwaite on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/6lsxfxDBid0",
        birdFacts: "The males live up to their name but, confusingly, females are brown often with spots and streaks on their breasts. The bright orange-yellow beak and eye-ring make adult male blackbirds one of the most striking garden birds. One of the most common UK birds, its mellow song is also a favourite.",
        birdFactsUrl: "blackbird/"
    },
    {
        id: 96,
        letterNumber: 9,
        birdleName: "BRAMBLING",
        name: "brambling",
        imageUrl: "https://cdn.pixabay.com/photo/2021/11/14/15/16/bird-6794802_1280.jpg",
        imageAltText: "a brambling perched on a dead sunflower head",
        imageAuthor: "Olliswildlife",
        imageAuthorUrl: "https://pixabay.com/photos/bird-brambling-ornithology-species-6794802/",
        birdFacts: "Similar in size and shape to the chaffinch, the male brambling has a black head in summer, and an orange breast with white belly. In flight it shows a long white rump. Gregarious in winter, it may form flocks of many thousands and often joins with chaffinches. Numbers can vary between winters depending on food supplies. It is a Schedule 1 species.",
        birdFactsUrl: "brambling/"
    },
    {
        id: 97,
        letterNumber: 9,
        birdleName: "BULLFINCH",
        name: "bullfinch",
        imageUrl: "https://images.unsplash.com/photo-1618857895658-1b1fb765e7c9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a bullfinch perched on a branch looking towards the camera",
        imageAuthor: "Colin Davis on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/m7KXYPdoSII",
        birdFacts: "The male bullfinch is unmistakable with his bright pinkish-red breast and cheeks, grey back, black cap and tail, and bright white rump. The flash of the rump in flight and piping whistled call are usually the first signs of bullfinches being present. They feed voraciously on the buds of various trees in spring and were once a 'pest' of fruit crops.",
        birdFactsUrl: "bullfinch/"
    },
    {
        id: 98,
        letterNumber: 9,
        birdleName: "LITTLEOWL",
        name: "little owl",
        imageUrl: "https://cdn.pixabay.com/photo/2014/02/27/16/08/owl-275940_1280.jpg",
        imageAltText: "a little owl with its beak open on a green background",
        imageAuthor: "No-longer-here",
        imageAuthorUrl: "https://pixabay.com/photos/owl-bird-animal-little-owl-275940/",
        birdFacts: "This small owl was introduced to the UK in the 19th century. It can be seen in the daylight, usually perching on a tree branch, telegraph pole or rock. It will bob its head up and down when alarmed. In flight it has long, rounded wings, rapid wingbeats and flies with a slight undulation. Breeding Bird Survey data suggest that little owl numbers are declining, with the UK population estimated to be down by 24 per cent between 1995 and 2008.",
        birdFactsUrl: "little-owl/"
    },
    {
        id: 99,
        letterNumber: 9,
        birdleName: "PEREGRINE",
        name: "peregrine",
        imageUrl: "https://cdn.pixabay.com/photo/2018/08/19/13/56/peregrine-falcon-3616708_1280.jpg",
        imageAltText: "a peregrine falcon with a brown background",
        imageAuthor: "Jasmin777",
        imageAuthorUrl: "https://pixabay.com/photos/peregrine-falcon-falco-peregrinus-3616708/",
        birdFacts: "The peregrine is a large and powerful falcon. It has long, broad, pointed wings and a relatively short tail. It is blue-grey above, with a blackish top of the head and an obvious black 'moustache' that contrasts with its white face. Its breast is finely barred. It is swift and agile in flight, chasing prey. The strongholds of the breeding birds in the UK are the uplands of the north and west and rocky seacoasts. Peregrines were at a low point in the 1960s due to human persecution and the impact of pesticides in the food chain. Improved legislation and protection has helped the birds to recover and they have now expanded into many urban areas. However, they are still persecuted - birds are illegally killed to prevent predation on game birds and racing pigeons. Peregrines are a Schedule 1 listed species of The Wildlife and Countryside Act.",
        birdFactsUrl: "peregrine/"
    }, 

// 10 LETTERS
    {
        id: 101,
        letterNumber: 10,
        birdleName: "SONGTHRUSH",
        name: "song thrush",
        imageUrl: "https://cdn.pixabay.com/photo/2021/01/07/16/42/thrush-5897870_1280.jpg",
        imageAltText: "a song thrush perched on a thin branch",
        imageAuthor: "TheOtherKev",
        imageAuthorUrl: "https://pixabay.com/photos/thrush-bird-branch-perched-5897870/",
        birdFacts: "A familiar and popular garden songbird whose numbers have declined markedly on farmland and in towns and cities. It's smaller and browner than a mistle thrush with smaller spotting. Its habit of repeating song phrases distinguish it from singing blackbirds. It likes to eat snails which it breaks into by smashing them against a stone with a flick of the head. Woods, hedgerows, parks and gardens across the UK - wherever there are bushes and trees you will find song thrushes.",
        birdFactsUrl: "song-thrush/"
    }, 
    {
        id: 102,
        letterNumber: 10,
        birdleName: "GREENFINCH",
        name: "greenfinch",
        imageUrl: "https://cdn.pixabay.com/photo/2015/06/22/23/02/greenfinch-818185_1280.jpg",
        imageAltText: "a greenfinch perched on some twigs with a green and pink background",
        imageAuthor: "Oldiefan",
        imageAuthorUrl: "https://pixabay.com/photos/greenfinch-bird-foraging-garden-818185/",
        birdFacts: "Its twittering, wheezing song and flash of yellow and green as it flies, make this finch a truly colourful character. Nesting in a garden conifer, or feasting on black sunflower seeds, the greenfinch is a regular garden visitor, able to take advantage of food in rural and urban gardens. Although quite sociable, they may squabble among themselves or with other birds at the bird table. Greenfinch populations declined during the late 1970s and early 1980s but increased dramatically during the 1990s. A recent decline in numbers has been linked to an outbreak of trichomonosis, a parasite-induced disease that prevents the birds from feeding properly.",
        birdFactsUrl: "greenfinch/"
    },
    {
        id: 103,
        letterNumber: 10,
        birdleName: "CHIFFCHAFF",
        name: "chiffchaff",
        imageUrl: "https://cdn.pixabay.com/photo/2017/03/22/22/51/chiffchaff-2166708_1280.jpg",
        imageAltText: "a chiffchaff perched on some stone",
        imageAuthor: "wolfgang_vogt",
        imageAuthorUrl: "https://pixabay.com/photos/chiffchaff-bird-willow-warbler-2166708/",
        birdFacts: "The chiffchaff is a small olive-brown warbler which actively flits through trees and shrubs, with a distinctive tail-wagging movement. Although not always the case, chiffchaffs often have dark legs and a short pale eye stripe, whereas the willow warbler -  a very similar looking species - has pale legs and a long yellow eye stripe. It is readily distinguished by its song, from where it gets its name. It picks insects from trees and also flies out to snap them up in flight.",
        birdFactsUrl: "chiffchaff"
    }, 
    {
        id: 104,
        letterNumber: 10,
        birdleName: "TURTLEDOVE",
        name: "turtle dove",
        imageUrl: "https://cdn.pixabay.com/photo/2019/05/06/23/02/turtle-dove-4184534_1280.jpg",
        imageAltText: "a turtle dove perched on a branch",
        imageAuthor: "John_Nature_Photos",
        imageAuthorUrl: "https://pixabay.com/photos/turtle-dove-bird-nature-pigeons-4184534/",
        birdFacts: "The turtle dove is a dainty dove, smaller and darker than the collared dove and slightly larger than a blackbird. Its upperparts are distinctively mottled with chestnut and black and its black tail has a white edge. The gentle purr of the turtle dove is an evocative sound of summer, but has become increasingly rare following rapid and sustained population declines. One cause of the decline is thought to be lack of seed and grain as food during the breeding season, resulting in a much shorter breeder season with fewer nesting attempts. The species is now included on the Red List of conservation concern.",
        birdFactsUrl: "turtle-dove"
    },
    {
        id: 105,
        letterNumber: 10,
        birdleName: "WOODPIGEON",
        name: "woodpigeon",
        imageUrl: "https://cdn.pixabay.com/photo/2014/03/02/16/42/woodpigeon-278260_1280.jpg",
        imageAltText: "a woodpigeon perched on some wood with a green and brown background",
        imageAuthor: "PollyDot",
        imageAuthorUrl: "https://pixabay.com/photos/woodpigeon-pigeon-side-forward-view-278260/",
        birdFacts: "The UK's largest and commonest pigeon, the woodpigeon is largely grey with a white neck patch and white wing patches, clearly visible in flight. Although shy in the countryside it can be tame and approachable in towns and cities. Its cooing call is a familiar sound in woodlands as is the loud clatter of its wings when it flies away. Woodpigeons are found across the UK in fields and woods, and also in towns and cities where they frequent parks and gardens.",
        birdFactsUrl: "woodpigeon/"
    },
    {
        id: 106,
        letterNumber: 10,
        birdleName: "KINGFISHER",
        name: "kingfisher",
        imageUrl: "https://images.unsplash.com/photo-1626293580936-051171d7faa0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        imageAltText: "a kingfisher sitting on a mossy rock",
        imageAuthor: "Jonny Gios on Unsplash",
        imageAuthorUrl: "https://unsplash.com/photos/StHVlMoSN3M",
        birdFacts: "Kingfishers are small unmistakable bright blue and orange birds of slow moving or still water. They fly rapidly, low over water, and hunt    fish from riverside perches, occasionally hovering above the water's surface. They are vulnerable to hard winters and habitat degradation through pollution or unsympathetic management of watercourses. Kingfishers are amber listed because of their unfavourable conservation status in Europe. They are also listed as a Schedule 1 species under the Wildlife and Countryside Act offering them additional protection.",
        birdFactsUrl: "kingfisher/"
    }

]


//this creates the grid for word guesses
function createGrid() {
    const tileDisplay = document.querySelector(".tile-container")
    tileDisplay.innerHTML = ""
    for (let i = 0; i < rows; i++) {
        guessRows[i] = [""]
        for (let j = 0; j < columns; j++) {
            guessRows[i][j] = ""
        }
    }

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
}

createGrid()


//selects a random bird from the birds array (based on word length)
function getBirdle() {
    const birdWordLength = birds.filter(bird => bird.letterNumber === columns)
    console.log(birdWordLength)
    randomBirdle = birdWordLength[Math.floor(Math.random() * birdWordLength.length)]
    console.log(randomBirdle)
    birdle = randomBirdle.birdleName
    console.log(birdle)
}

getBirdle()


//this handles key events, unless game is over, and runs delete/check functions
const handleClick = (key) => {
    slider.disabled = true;
    slider.classList.add("slider-disabled")
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
        addLetter(key)
    }
}

//this adds new letters to the grid and checks for the whether a row is full
const addLetter = (letter) => {
    if (currentTile < columns && currentRow < 6) {
        const tile = document.getElementById(`guessRow-${currentRow}-tile-${currentTile}`)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute("data", letter)
        currentTile++
        console.log("guessRows", guessRows)
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
    // if current row is 0 and tile is 0 then slider.disabled = false;  
}


const checkRow = () => {
    const guess = guessRows[currentRow].join("")
    const notAWord = document.getElementById("not-a-word")

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`)
    .then(res => res.json())
    .then(data => {
            if (data.title === "No Definitions Found" && (birds.every(bird => bird.letterNumber !== guess && bird.birdleName !== guess))) {
                notAWord.style.display = "block"
                setTimeout(() => {
                    notAWord.style.display = "none"
                    }, 2000
                )
                clearTimeout()

            } else if (currentTile > (columns-1)) {
                flipTile()
                if (birdle === guess) {
                    if (columns >= 9) {
                        timeLapsed = 5000
                    } else if (columns > 6) {
                        timeLapsed = 4000
                    } else {
                        timeLapsed = 3000 } 
                    setTimeout(()=> {
                        hintsBtn.style.display = "none"
                        showMessage("Congratulations, you got the Birdle!")
                    }, timeLapsed)
                    displayBirdInfo()
                    isGameOver = true
                } else {
                    if (currentRow >= 5) {
                        setTimeout(() => {
                            showMessage(`Here's the Birdle, better luck next time!`)
                            }, timeLapsed)
                        displayBirdInfo()
                        isGameOver = true
                        return
                    }
                    if (currentRow < 5) {
                        currentRow++
                        currentTile = 0
                    }
                }
            }
    })
        
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


//turns tiles over, checks guess against birdle and changes tile and key colours accordingly
const flipTile = () => {
    const rowTiles = document.querySelector(`#guessRow-${currentRow}`).childNodes
    let checkBirdle = birdle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({letter: tile.getAttribute("data"), color: "grey-overlay"})
    })


//change to if/else if - should fix bug with 2 of same letter 
//need to check green, then yellow then check again if there's more than 1 of the letter - letters checked haven't already been yellowed    
    guess.forEach((guess, index) => {
        if (guess.letter == birdle[index]) {
            guess.color = "green-overlay"
            checkBirdle = checkBirdle.replace(guess.letter, "")
            console.log(checkBirdle)
        }
    })

    guess.forEach(guess => {
        if (checkBirdle.includes(guess.letter)) {
            guess.color = "yellow-overlay"
            checkBirdle = checkBirdle.replace(guess.letter, "")
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


//this changes the size of the grid based on the value from the slider
slider.oninput = () => {
    currentRow = 0
    currentTile = 0
    sliderValue = slider.value
    output.value = slider.value
    columns = parseInt(sliderValue)
    createGrid()
    getBirdle()
}

//DISPLAYING THE BIRD INFORMATION AT THE END//

function displayBirdInfo() {
    const birdInfoBody = document.getElementById("bird-info-body")

    birdInfoBody.innerHTML = `
        <h2 class="modal--bird-info-heading" id="bird-info-heading">${randomBirdle.name}</h2>
        <img class="bird-image" src=${randomBirdle.imageUrl} alt="${randomBirdle.imageAltText}">
        <a class="bird-link" href=${randomBirdle.imageAuthorUrl}>${randomBirdle.imageAuthor}</a>

        <p class="info-body modal-body-text">
        ${randomBirdle.birdFacts}
        </p>  

        <a class="bird-link" href="https://www.rspb.org.uk/birds-and-wildlife/wildlife-guides/bird-a-z/${randomBirdle.birdFactsUrl}" target="_blank">Find more information on the ${randomBirdle.name} on the RSPB</a>`
}


