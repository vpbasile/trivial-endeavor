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
	const guessedState = props.guessedState;
	if(guessedState){
		console.log("guessedState is true")
	} else { console.log("guessedState is false")}
	
	return (
		<div>
			<input className={cssClass} type="button" value={buttonText} id={buttonID}
				onClick={() => {
					props.setGuessedState(true); handleGuess(buttonIndex)}} disabled={guessedState} />
		</div>
	);
}