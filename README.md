# Shooter Game

<!--
*** Thanks for checking out this README Template. If you have a suggestion that would
*** make this better, please fork the repo and create a pull request or simply open
*** an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ioanniskousis/ShooterGame">
    <img src="src/resources/images/microverse.png" alt="Microverse Logo" width="80" height="80">
  </a>
  
  <h3 align="center">The Shooter Game Application</h3>
  
  <p align="center">
    This project is part of the Microverse curriculum in JavaScript course!
    <br />
    <a href="https://github.com/ioanniskousis/ShooterGame"><strong>Explore the docs</strong></a>
    <br />
    <a href="https://ioanniskousis.github.io/ShooterGame/">Live Version</a>
    <br />
    <a href="https://github.com/ioanniskousis/ShooterGame/issues">Report Bug</a>
    <span> - </span>
    <a href="https://github.com/ioanniskousis/ShooterGame/issues">Request Feature</a>
  </p>
</p>

This is an arcade Shooter Game application where the user controls a flying vehicle armed with weapons to shoot against enemy vehicles coming down from the top of the screen

<hr />

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Screen Shots](#screen-shots)
- [About the Project](#about-the-project)
- [Application Instructions](#application-instructions)
- [Live Version](#live-version)
- [System Requierments](#system-requierments)
- [Development](#development)
- [Dependencies](#dependencies)
- [Built With](#built-with)
- [Contributors](#contributors)
- [Acknowledgements](#acknowledgements)

## Screen Shots  
### Entry Scene  
<img src="src/resources/images/entry.png" alt="entry.png">
<hr />

### Battle Scene  
<img src="src/resources/images/battle.png" alt="battle.png">
<hr />

### Game Over Scene  
<img src="src/resources/images/gameover.png" alt="gameover.png">
<hr />

### Game Over Scene User Name Input 
<img src="src/resources/images/input.png" alt="input.png">
<hr />

### Leadersboard Scene  
<img src="src/resources/images/leadersboard.png" alt="leadersboard.png">
<hr />
<!-- ABOUT THE PROJECT -->

## About The Project  

  The project uses the phaser3 game engine and almost all the code is related to this framework  
  Webpack is used to compile src folder content and outputs to dist folder  
  The entry point which is index.js just calls the game.js containing the code to initialize a Game object which loads the Entry Scene.  

  Four phaser3 scenes are used :  

    - EntryScene gives instructions on game usage   

    - BattleScene is the actual game screen  

    - Six classes are running in this scene implementing the features of the game  

      - The 3 enemy ship types held in alientShip.js, dogShip.js and motherShip.js respectively  

      - The enemy lasers held in laserEnemy.js  

      - The player's ship from player.js   

      - And the player's lasers from playerLaser.js  

    - GemeOver Scene which appears after player's power has been consumed  
        If the score of the game is greater than zero an input form appears to the user for writing their name only in case they have not already, else the score is submitted to the leadersboard API and saved automatically  

    - LeadersBoard Scene. Shows the top 10 users' scores sorted in descending order  

  Scoring is applied giving a different number of points by shooting enemies and enemy weapons. The score is stored remotely using an API  

  The game ends after losing the whole of the power. Power is lost each time the player's ship conflicts with enemies lasers or the enemy ships  

  The leadersboard API service is created by Microverse dedicated to this application and has 3 options called asynchronously  

    - Get an ID for the application. This is implemented beyond the actual project  

    - Submit a player's score. This is performed after each game session only if the score is higher than zero  

    - Get the scores list. This is called in leadersboard scene  

<hr/>

<!-- ABOUT THE PROJECT -->

## Application Instructions  

  * In the Entry scene click Play to start the game or click Leadersboard to see the top 10 user's scores    

  * In the Battle scene use the keyboard arrows to move in 2 dimensions and the space bar to shoot weapons against the enemy ships that are coming down from the screen top. You start having 100% power shown at the screen bottom and your score is zero shown at the screen top  
    Crashing your ship on an enemy ship you loose 20% of power  

    There are 3 types of enemy ships :  

      - The Alien Ship, that shoots lasers. A new one appears every 2 seconds. You have to avoid the lasers else you lose 10% of your power. Destroying an Alien Ship you get 100 points. Destroying a laser you get 400 points  

      - The Dog Ship, that chases your ship and shooting it you get 200 points. A new one appears every 5 seconds  

      - The Mother Ship that just comes down the screen. Shooting it you gain 400 points. A new one appears every 7 seconds  

  * Loosing the 100% of your power is the game end and the GameOver scene appears. If there is a score achieved and you have already given your name from a previous session the score is submitted to the remote API. If that is the first session then an input form appears to enter your name first and then the score is submitted. In the GameOver scene, you can restart a new game session or select LeadersBoard scene  

  * The LeadersBoard scene shows only the top 10 scores sorted in descending order  

<hr/>

## Live Version

[GitHub Pages](https://ioanniskousis.github.io/ShooterGame/)

<hr/>

## System Requierments

  - JavaScript Enabled  
  - You need to Disable Cross-Origin-Restrictions from your browser if you want to open the index.html from your file system without using a server.  

<hr/>

## Development
  * Clone the project
  ```
    https://github.com/ioanniskousis/ShooterGame.git
    
    Use VSCode and Live Server to show index.html
    Since webpack is used, run 'npm run build' on you terminal before opening
  ``` 
<hr/>

## Dependencies

  please run
  ```
    npm run build
  ```
  to comply with the dependencies held in package.json
<hr/>

## Built With

This project was built using these technologies.

  - Phaser3  
  - JavaScript (ES6)  
  - HTML5  
  - CSS3  
  - webpack  
  - APIs  
  - Git - GitHub  
  - ESLint  
  - Stylelint  

<hr/>

<!-- CONTACT -->

## Contributors

:bust_in_silhouette:
​
## Ioannis Kousis

- Github: [@ioanniskousis](https://github.com/ioanniskousis)
- Twitter: [@ioanniskousis](https://twitter.com/ioanniskousis)
- Linkedin: [Ioannis Kousis](https://www.linkedin.com/in/jgkousis)
- E-mail: jgkousis@gmail.com
​
<hr/>
<!-- ACKNOWLEDGEMENTS -->

## Acknowledgements

  - [Microverse](https://www.microverse.org/)
  - [The Odin Project](https://www.theodinproject.com/)


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ioanniskousis/ShooterGame.svg?style=flat-square
[contributors-url]: https://github.com/ioanniskousis/ShooterGame/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/ioanniskousis/ShooterGame.svg?style=flat-square
[forks-url]: https://github.com/ioanniskousis/ShooterGame/network/members
[stars-shield]: https://img.shields.io/github/stars/ioanniskousis/ShooterGame.svg?style=flat-square
[stars-url]: https://github.com/ioanniskousis/ShooterGame/stargazers
[issues-shield]: https://img.shields.io/github/issues/ioanniskousis/ShooterGame.svg?style=flat-square
[issues-url]: https://github.com/ioanniskousis/ShooterGame/issues

