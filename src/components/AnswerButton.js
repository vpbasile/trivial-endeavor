import React from "react";

export default function AnswerButton(props) {
	var gameState = props.gameState;
	var players = props.players;

	function endTurn(){
		// console.log(`Player ${gameState.currentPlayer} ends their turn`);
		gameState.currentPlayer = (gameState.currentPlayer + 1) % players.length;
		// console.log(`Player ${gameState.currentPlayer} starts their turn`);
		var playerDisplay = document.getElementById("display-player");
		playerDisplay.innerHTML = players[gameState.currentPlayer].name;
		playerDisplay.classList = `rounded p-2 m-2 border border-light ${players[gameState.currentPlayer].cssClass}`;
		// console.log(`Player ${gameState.currentPlayer} starts their turn`);
	}

	function handleGuess(guess) {
		var correctChoice = gameState.currentQuestion.correctIndex;
		// Indicate which choice was correct
		for(var i=0; i<4; i++) {
			var button = document.getElementById(`choice-${i}`);
			button.disabled = true;
			if(i === correctChoice) {
				button.classList.add("btn-success");
			} else if(i === guess) {
				button.classList.add("btn-danger");
			} else {
				button.classList.add("btn-secondary");
			}
		}
		// If the current player got it right, then update their scorecard
		if(guess === correctChoice) {
			players = gameState.players;
			const currentPlayerIndex = gameState.currentPlayerIndex;
			const playerName = players[currentPlayerIndex].name;
			const currentCategory = gameState.currentCategory;
			console.log(`${playerName} got it right in ${currentCategory.title}`);
			// Keep track of which categories each player has correctly answered
			players[currentPlayerIndex].correctCategories.push(currentCategory.queryTag);
		} else {
			console.log("Incorrect!  The correct answer was: " + gameState.currentQuestion.answers[correctChoice]);
		}
		// End the turn
		endTurn();
	}

	const buttonID = `choice-${props.buttonIndex}`;
	return (
		<div>
			<input className={props.cssClass} type="button" value="" id={buttonID} 
				onClick={() => handleGuess(props.buttonIndex)} />
		</div>
	);
}