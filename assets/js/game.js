// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max-min + 1) + min);

    return value;
};
// fight or skip function
var fightOrSkip = function() {
    // ask player of they'd like to fight or skip using fightOrSkip fucntion
    var promptFight = window.prompt(' Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

    // enter the conditional recursive function call here!
    if(promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.")
        return fightOrSkip();
    }
    // change the input to lower case
    promptFight = promptFight.toLowerCase();

    // if the player picks "SKIP" confirm then stop the loop
    if(promptFight === "skip") {
        // confirm player want to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes(true), leave fight
        if(confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
        }
    }
    return false;
};

// fight function (now with parameter for enemyInfo's name)
var fight = function(enemyInfo) {
    // keep track of who goes first
    var isPlayerTurn = true;

    // randomly change turn order
    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    while (playerInfo.health > 0 && enemyInfo.health > 0) {
        if (isPlayerTurn) {
            // ask player if they'd like to fight or skip using fightOrSkip function
            if(fightOrSkip()) {
                // if true, leave fight by breaking loop
                break;
            }
            // generate random damage value based on player's attack power
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            // remove enemyInfo's health by subtracting the amount set in the playerInfo.attack variable
            enemyInfo.health = Math.max(0, enemyInfo.health - damage);
            console.log(
                playerInfo.name + ' attacked ' + enemyInfo.name + '. ' + enemyInfo.name + ' now has ' + enemyInfo.health + ' health remaining.' 
            );

            // check enemyInfo's health
            if (enemyInfo.health <= 0) {
                window.alert(enemyInfo.name + ' has died!');

                //award player money for winning
                playerInfo.money = playerInfo.money + 20;

                //leave while() loop since enemyInfo is dead
                break;
            } 
            else {
            window.alert(enemyInfo.name + ' still has ' + enemyInfo.health + ' health left.');
            }
            // player get attacked first
        } 
        else {
            // generate random damage value based on enemyInfo's attack power
            var damage = randomNumber(enemyInfo.attack - 3, enemyInfo.attack);
            // remove players's health by subtracting the amount set in the enemyInfo.attack variable
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            console.log(
                enemyInfo.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
            );

            // check player's health
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + ' has died!');
                // leave while() loop if player is dead
                break;
            } 
            else {
                window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
            }
        } 
        // switch turn order for the next round
        isPlayerTurn = !isPlayerTurn;
    }
}; // end of fight function

// function to start a new game
var startGame = function() {
    // reset player stats
   playerInfo.reset();

    // fight each enemyInfo-robot by looping over them and fighting them one at a time
    for (var i = 0; i < enemyInfo.length; i++) {
        // if playerr is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 ao it needs to have 1 added to it
            window.alert('Welcome to Robot Gladiators! Round ' + (i+1));
// debugger;
            // pick new enemyInfo to fight based on the index of enemyInfo array
            var pickedenemyInfoObj = enemyInfo[i];
        
            // reset the enemyInfo.health before starting new fight
            pickedenemyInfoObj.health = randomNumber(40, 60);

            // use debugger to pause script from running and check what's going on at that moment in the code
            // debugger;

            // pass the pickedenemyInfo.name variable's value into the fight function, where it will assume the value of the enemyInfo.name parameter
            fight(pickedenemyInfoObj);

            // if we're not at the last enemyInfo in the array
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
                // ask if player wants to use the store before next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the shop() function
                if(storeConfirm) {
                    shop();
                }
            }
        }
        // if player isn't alive, stop the game
        else {
        window.alert('You have lost your robot in battle! Game Over!');
        break;
        }
    }  
    // after loop ends, we are either out of playerInfo.health or enemies to fight, so run the endGame function
    endGame(); 
};
// function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");
    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    if (highScore === null) {
        highScore = 0;
    }

    // if playerInfo.money is greater than high score, player has new high score
    if (playerInfo.money > highScore) {
        localStorage.setItem("highscore", playerInfo.money);
        localStorage.setItem("name", playerInfo.name);

        alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    }
    else {
        alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        //restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};
// feature/shop
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRAGE your attack, or LEAVE the store? Please enter 1 for 'REFILL', 2 for 'UPGRADE', or 3 for 'LEAVE' to make a choice."
    );
    shopOptionPrompt = parseInt(shopOptionPrompt);
    // use switch to carry out action
    switch (shopOptionPrompt) {
        case 1:
            playerInfo.refillHealth();
            break;
        case 2:
            playerInfo.upgradeAttack();
            break;
        case 3:
            window.alert("Leaving the store.");
            // do nothing, so function will end
            break;
        default:
            window.alert("You did not pick a valid option. Try again.");  
            // call shop() again to force player to pick a valid option
            shop();
            break;

    }
};
// getPlayerName()
var getPlayerName = function() {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }
    console.log(" Your robot's name is " + name);
    return name;
}

//player info
var playerInfo = {
    name: getPlayerName(),
    health: 100,
    attack: 10,
    money: 10,
    reset: function() {
        this.health = 100;
        this.attack = 10;
        this.money = 10;
    }, //comma!
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refill player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
        window.alert("You don't have enough money! ");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrade player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money! ");
        }
    }
    
};

// enemyInfo info
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// start the game when the page loads
startGame();
