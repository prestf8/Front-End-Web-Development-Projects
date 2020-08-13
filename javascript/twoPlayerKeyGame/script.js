const startButton = document.querySelector(".start-button")
const results = document.querySelector(".results")
const inputs = document.querySelectorAll(".input")
const tags = document.querySelectorAll(".tag")
const restartTag = document.querySelector(".restart-tag")
const middleSection = document.querySelector(".middle-section")

let player1Input;
let player2Input;
let player1InputValue;
let player2InputValue;



startButton.addEventListener("click", () => {
    player1Input = document.getElementById("player1-letter-input");
    player2Input = document.getElementById("player2-letter-input");

		if (player1Input.value.length == 0 || player2Input.value.length == 0) {
			results.textContent = "Enter your letters."
			results.style.color = "orange";
		} else if (player1Input.value == player2Input.value) {
			results.textContent = "Choose a different character.";
			results.style.color = "orange";
		}
		
		else {
			player1InputValue = player1Input.value;
			player2InputValue = player2Input.value;

			startGame();
		}

})

function resetGame() {
	for(let i=0; i < tags.length; i++) {
		tags[i].textContent = `Player ${i+1}`;
		inputs[i].style.display = "block";
		inputs[i].value = "";
	}

	middleSection.style.backgroundColor = `rgba(0,20,150,0.2)`;
	results.textContent = "Input your Letters";
	startButton.style.display="block";
	restartTag.style.display="none";


}

let random = (min, max) => {
	return Math.floor((Math.random()*(max-min)+min)/1000)*1000;
}



//////////
let startGame = () => {
	
	for (let i=0; i < tags.length; i++) {
		tags[i].textContent += `: "${inputs[i].value}"`;
	}
	
	for(let i=0; i < inputs.length; i++) {
		inputs[i].style.display = "none";
	}

	startButton.style.display = "none";
	results.style.color = "white";


	let milliseconds = random(3000, 8000);

	const countdownInterval = setInterval(countDown, 100);

	function countDown() {

		milliseconds -= 100;
		millisecondsText = (milliseconds/1000).toString();

		if (millisecondsText.length == 1) {
			millisecondsText += ".0";
		}

		if(milliseconds <= 0) {
			clearInterval(countdownInterval);
			endGame();
		}
		results.textContent = millisecondsText;
	}
}

let endGame = () => {
	middleSection.style.backgroundColor="rgba(20,225,40,0.2)";

	document.addEventListener("keydown", keyPress);

	function keyPress(e) {
		let isOver = false;

		if (e.key == player1InputValue) {
			isOver = true;
			results.textContent = "Player 1 Wins!";
		} else if (e.key == player2InputValue) {
			isOver = true;
			results.textContent = "Player 2 Wins!";
		}

		if (isOver) {
			middleSection.style.backgroundColor="rgba(255, 199, 43, 0.3)";
			document.removeEventListener("keydown", keyPress);
			restartTag.style.display = "block";
			restartTag.textContent = "Restart?";
			restartTag.addEventListener("click", resetGame);
		}
	}
}