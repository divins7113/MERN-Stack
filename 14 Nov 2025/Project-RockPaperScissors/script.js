let playerScore = 0;
let computerScore = 0;

const hands = {
  rock: '✊',
  paper: '✋',
  scissors: '✌️'
};

function play(playerChoice) {
  const choices = ['rock', 'paper', 'scissors'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];

  document.getElementById('playerHand').textContent = hands[playerChoice];
  document.getElementById('computerHand').textContent = hands[computerChoice];

  const winner = getWinner(playerChoice, computerChoice);
  const resultElement = document.getElementById('result');

  if (winner === 'player') {
    playerScore++;
    resultElement.textContent = `You Win! ${playerChoice} beats ${computerChoice}`;
  } else if (winner === 'computer') {
    computerScore++;
    resultElement.textContent = `You Lose! ${computerChoice} beats ${playerChoice}`;
  } else {
    resultElement.textContent = "It's a Tie!";
  }

  document.getElementById('playerScore').textContent = playerScore;
  document.getElementById('computerScore').textContent = computerScore;
}

function getWinner(player, computer) {
  if (player === computer) return 'tie';
    
  if (player === 'rock' && computer === 'scissors' || player === 'paper' && computer === 'rock' ||player === 'scissors' && computer === 'paper') {
    return 'player';
  }
  return 'computer';
}