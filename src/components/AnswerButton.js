import React from "react";

export default function AnswerButton(props) {
	// console.log(JSON.stringify(props))
	var gameState = props.gameState;
	let buttonIndex = props.index;
	var buttonText = props.text;
	const currentCategory = props.gameState.currentCategory;
	const invertedColor = (currentCategory.cssClass).replace("cat-", "text-");
	// const invertedColor = "inv-food"
	const cssClass = `rounded p-2 m-2 border btn btn-dark w-100 ${invertedColor}`;
	const buttonID = `choice-${buttonIndex}`;
	const handleGuess = props.handleGuess;
	var tempQuestion = props.currentQuestion;
	

	// If the button is disabled, make it so
	return (
		<div>
			<input className={cssClass} type="button" value={buttonText} id={buttonID}
				onClick={() => handleGuess(buttonIndex)} disabled={props.disabled} />
		</div>
	);

	function endTurn() {
		// 	// console.log(`Player ${gameState.currentPlayer} ends their turn`);
		// 	gameState.currentPlayer = (gameState.currentPlayer + 1) % players.length;
		// 	// console.log(`Player ${gameState.currentPlayer} starts their turn`);
		// 	var playerDisplay = document.getElementById("display-player");
		// 	playerDisplay.innerHTML = players[gameState.currentPlayer].name;
		// 	playerDisplay.classList = `rounded p-2 m-2 border border-light`;
		// 	// console.log(`Player ${gameState.currentPlayer} starts their turn`);
	}
}