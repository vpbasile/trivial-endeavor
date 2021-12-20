import React from "react";

export default function AnswerButton(props) {

	function handleGuess(guess) {
		var correctChoice = props.gameState.currentQuestion.correctIndex;
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
		
		if(guess === correctChoice) {
			const currentPlayer = props.gameState.currentPlayer;
			const currentCategory = props.gameState.currentCategory;
			// Add the functionality to keep track of which categories each player has correctly answered
			// if(!currentPlayer.correctCategories.includes(currentCategory.title)) {
			// 	// props.gameState.players[currentPlayer].push(currentCategory.queryTag);
			// 	currentPlayer.correctCategories.push(currentCategory.title);
			// }
			console.log(`Player ${currentPlayer} has answered correctly in ${currentCategory.title}`);
		} else {
			console.log("Incorrect!  The correct answer was: " + props.gameState.currentQuestion.answers[correctChoice]);
		}
	}

	const buttonID = `choice-${props.buttonIndex}`;
	return (
		<div>
			<input className={props.cssClass} type="button" value="" id={buttonID} 
				onClick={() => handleGuess(props.buttonIndex)} />
		</div>
	);
}