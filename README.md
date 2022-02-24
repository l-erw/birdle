# Birdle


## Table of contents

- [Overview](#overview)   
- [My process](#my-process)  
- [Built with](#built-with)  
- [What I learned](#what-i-learned)  
- [Continued development](#continued-development)  
- [Author](#author)  
- [Acknowledgments](#acknowledgments)  

## Overview

- [Birdle](https://birdle-game.netlify.app) is a bird-themed Wordle clone. Instead of guessing a random 5 letter word, the player guesses the name of a British bird, choosing the word length (between 4-10 letters). 
- The same rules as Wordle apply, each letter will turn green if guessed correctly, yellow if in the word but not in the right place, and grey if it's not in the word at all. 
- When the game is over (win or lose), a picture of the bird and some facts about it will display, as well as a link to the RSPB for further information.

![image](https://user-images.githubusercontent.com/85317040/155135892-5a697fa4-6940-49e0-b07f-520fe8389c38.png)  
![image](https://user-images.githubusercontent.com/85317040/155136239-a335fcd4-3ad7-4c9b-a93d-9cb2ee42fdc0.png)  
![image](https://user-images.githubusercontent.com/85317040/155136471-7fed19cc-6838-4e75-bdbd-314d6fcb1009.png)

## My process

- I initially created a basic version of Wordle, with a 5x6 grid
- Created design mock ups using Figma for the game and the bird information modal
- Added names, images and details of British birds
- Got a prototype version running with a 7x6 grid (more birds with 7 letter names than 5), and shared with 5 people to gain user feedback
- Implemented changes from user feedback
- Expanded number of bird names to 53, with different word lengths between 4 and 10 letters, and added a slider so the player could choose word length
- Linked up to the FreeDictionary API to check if player's guess was a word, and check through the list of birds to check if it was a bird


## Built with

- JavaScript
- CSS3
- HTML5


## What I learned

- How to filter and search through an array of objects for specific keys/values based on input from a slider
- How to implement user feedback, and fix bugs that appeared on different devices
- Using the touch-action CSS property to stop the screen zooming on mobile when you double tap
- Using setTimeout to display features after a certain amount of time has passed


## Continued development

- Currently building an updated version of Birdle using React. This is planned to have a hint system to help players if they are stuck, using clues about the bird, e.g. green feathers, bird of prey, habitat is around rivers and lakes etc.
- Will make it work with a keyboard on computer instead of mouse
- Further work on making it more responsive - the current version is a little small on some mobiles.


## Author

Website - [lizzieerwood.dev](https://lizzieerwood.dev)  
GitHub - [@l-erw](www.github.com/l-erw)  
Twitter - [@l_erwood](www.twitter.com/l_erwood)

## Acknowledgments

To Ania Kubow, whose Wordle JavaScript tutorial helped with the initial structure of Birdle. To the RSPB for the bird facts. 
