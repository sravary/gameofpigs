
// To keep track of player scores, round scores, current player(0 or 1)
var scores, roundScores, activePlayer, gamePlaying;

// Run the game
init();

// Select and display game INFO
document.querySelector('.btn-info').addEventListener('click', function() {
    //Popup modal on how to play
    swal({
        icon: 'info',
        title: 'Rules of the Game:',
        text: 'Roll as many times as you wish. If you roll a 1, you lose the points. Click HOLD to keep your ROUND points. First player to reach a 100, WINS!',
        button: 'Let\'s do this!',
    })
});

var lastDice;

// Select the ROLL DICE element
document.querySelector('.btn-roll').addEventListener('click', function() {
    if (gamePlaying) {
        // 1. We need a random number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // .floor will remove decimals,
        // .random * 6 will give random num from 0 to 5,
        // + 1 will make the num 1 to 6

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        
        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        // 3. Update the Round Score only if the rolled number is NOT a 1
        if(dice1!== 1 && dice2 !== 1) {
            // Add up the scores
            roundScore += dice1 + dice2;
            // Now we need to select and display the score
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            // Next player's turn
            nextPlayer();
        }
        /*
        Put in place a new rule but uncertain

        if(dice === 6 && lastDice === 6) {
            // Player loses score
            scores[activePlayer] = 0;
            // Display it to the DOM
            document.querySelector('#score-' + activePlayer).textContent = '0';
            // Next player's turn
            nextPlayer();
        } else if(dice !== 1) {
            // Add up the score
            roundScore += dice;
            // Now we need to select and display the score
            document.querySelector('#current-' + activePlayer).textContent = roundScore; 
        } else {
            // Next player's turn
            nextPlayer();
        }
        lastDice = dice;
        */
    }
});

// Select HOLD button and activate it
document.querySelector('.btn-hold').addEventListener('click', function() {
    if (gamePlaying) {
        // Add round score to player's global score
        scores[activePlayer] += roundScore;

        // Update the UI by selecting and displaying
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        // NOT SURE: Selecting and reading user input for winning score
        // var input = document.querySelector('.winning-score').value;
        // var winningScore;

        // Undefined, null, 0, "" are COERCED to false
        // Anything else is COERCED to true
        // if(input) {
        //     winningScore = input;
        // } else {
        //     winningScore = 100;
        // }

        // Check if current player won the game
        if (scores[activePlayer] >= 100) {
            // Select Player and change text to Winner
            document.getElementById('name-' + activePlayer).textContent = 'WINNER!';
            // Remove the dice image
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            // Display special css winner class
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            // Remove the active css class as well
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            // After there is a winner, we must stop the game
            gamePlaying = false;

        } else {
            // Switch to next player
            nextPlayer();
        }
    }
});

// Creating a function NEXT PLAYER in order to not repeat same code
function nextPlayer() {
    // Next player's turn
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0; // their round score must start at 0

    // The other player's round score must return to 0 also
    // so select the element and change score
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // Also, select the active color panel & red dot to be
    // switched to next player (.toggle)
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    
    // If you want the dice to disappear when its a 1
    // document.querySelector('.dice').style.display = 'none';
}

// New or Reset Game
function init() {
    // Reset players' scores
    scores = [0, 0];
    // Reset back to player 1
    activePlayer = 0;
    // Reset the round score back to 0
    roundScore = 0;
    // Set game as being played
    gamePlaying = true;

    // This selects a CSS property and then changes it's value
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';

    // This is another way to select elements with IDs (other than querySelector)
    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    // Reset the titles Player 1 and Player 2
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    // Remove winner css class from either players if present
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    // Remove active css class from either players if present
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    // Make Player 1 active first
    document.querySelector('.player-0-panel').classList.add('active');

}

// Select and use NEW GAME button
document.querySelector('.btn-new').addEventListener('click', init); 
// we don't include init() because that will immediately call the function. 
// We simply reference the function without the parathese and let it run when the user 'click' 








