import React from "react";

export default function AnswerButton(props) {
	const categoryList = props.categoryList;
	const currentPlayerIndex = props.currentPlayerIndex;
	const gamePhase = props.gamePhase;
	// console.log(`Now in the Answerbutton component.`);
	// console.log(`gamePhase: ${JSON.stringify(gamePhase)}`);
	var currentQuestion = props.currentQuestion
	const guessedState = props.guessedState;
	const questionCategoryTag = currentQuestion.categoryTag;
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	let buttonIndex = props.index;
	var buttonText = props.text;
	const invertedColor = (questionCategory.cssClass).replace("cat-", "text-");
	let cssClass = props.cssClasses;
	if (cssClass === undefined) { cssClass = `rounded p-2 m-2 border btn btn-dark w-100 ${invertedColor}` }

	const buttonID = `choice-${buttonIndex}`;
	const handleGuess = props.handleGuess;

	return (
		<div>
			<input className={cssClass} type="button" value={buttonText} id={buttonID} disabled={guessedState} onClick={() => {
				props.setGuessedState(true); handleGuess(buttonIndex, currentPlayerIndex, questionCategoryTag)
			}} />
		</div>
	);
}