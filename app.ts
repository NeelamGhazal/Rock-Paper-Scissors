#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";
                                                  
// console.log(chalk.rgb(255, 115, 7).bold(`\t\t\t===========================================`));
console.log(chalk.rgb(255, 115, 7).bold(`\n\t\t\t--------------------------------------------------------------`));
console.log(chalk.rgb(255, 68, 0).bold(`\t\t\t  <<<<<<<< Welcome to the Game: Rock Paper Scissors >>>>>>>>`));
console.log(chalk.rgb(255, 115, 7).bold(`\t\t\t--------------------------------------------------------------\n`));

enum choice {
    Rock = "Rock",
    Paper = "Paper",
    Scissors = "Scissors"
}


function getRandomChoice(): choice {
    let choices = Object.values(choice);
    let randomeIndex = Math.floor(Math.random() * choices.length);
    return choices[randomeIndex];
}

function determineWinner(playerChoice: choice, computerChoise: choice): string {
    if (playerChoice === computerChoise) {
        return (chalk.rgb(255, 162, 0).bold("\n\t\t\t<<<< It's a tie! >>>>\n"));
    }

    if (
        (playerChoice === choice.Rock && computerChoise === choice.Scissors) ||
        (playerChoice === choice.Paper && computerChoise === choice.Rock) ||
        (playerChoice === choice.Scissors && computerChoise === choice.Paper)
    ) {
        return (chalk.rgb(191, 255, 94).bold("\n\t\t\t<<< === You win! === >>>\n"));
    } else {
        return (chalk.rgb(255, 0, 68).bold("\n\t\t\t<<< === Computer wins! === >>>\n"))
    }
}
function displayChoice(choice: choice): string {
    switch (choice) {
        case "Rock":
            return chalk.cyanBright.bold(choice) + chalk.rgb(255, 148, 85).bold`
                _______
            ---'   ____)
                  (_____)
                  (_____)
                  (____)
            ---.__(___)
            `;
        case "Paper":
            return chalk.cyanBright.bold(choice) + chalk.rgb(255, 148, 85).bold`
                _______
            ---'   ____)____
                      ______)
                      _______)
                     _______)
            ---.__________)
            `;
        case "Scissors":
            return chalk.cyanBright.bold(choice) + chalk.rgb(255, 148, 85).bold`
                _______
            ---'   ____)____
                      ______)
                   __________)
                  (____)
            ---.__(___)
            `;
        default:
            return "";
    }
}

async function  playGame() {
    let condition = 'true';
    while (condition) {
    

    let answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'playerChoice',
            message: chalk.rgb(255, 0, 137)('Choose Rock, Paper, or Scissors:'),
            choices: [choice.Rock, choice.Paper, choice.Scissors],
        },
    ]);

    let playerChoice: choice = answer.playerChoice;
    let computerChoise = getRandomChoice();
    console.log(chalk.rgb(18, 145, 255)`\nPlayer choice: ${displayChoice(playerChoice)}`);
    console.log(chalk.rgb(0, 17, 255)`\nComputer choice; ${displayChoice(computerChoise)}`);
    console.log(determineWinner(playerChoice, computerChoise));

    let playAgainAnswer = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'playAgain',
            message: chalk.rgb(142, 255, 207)('Do you want to play again?'),
            default: true,
        },
    ]);

    condition = playAgainAnswer.playAgain;
 }
}

async function mainMenu() {
    let condition = true;
    while (condition) {
        let mainMenuAnswer = await inquirer.prompt([
            {
                type: 'list',
                name: 'mainMenuChoice',
                message: chalk.rgb(0, 255, 145)('Choose an option:'),
                choices: ['Play', 'Exit'],
            },
        ]);
        
        if (mainMenuAnswer.mainMenuChoice === 'Play') {
            await playGame();
        } else {
            console.log(chalk.rgb(255, 68, 0).bold('\n\t\t\t<<<<<<<< Thank you for playing! Goodbye! >>>>>>>>'));
            condition = false;
        }
    }
}

mainMenu();
