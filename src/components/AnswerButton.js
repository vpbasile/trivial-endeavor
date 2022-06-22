import React from "react";

export default function AnswerButton(props) {
	const categoryList = props.categoryList;
	const currentPlayerIndex = props.currentPlayerIndex;
	var currentQuestion = props.currentQuestion
	// If the question is null, the player has not selected a question yet
	if (currentQuestion === undefined) { return null; }
	const questionCategoryTag = currentQuestion.categoryTag;
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	const guessedState = props.guessedState;
	let buttonIndex = props.index;
	var buttonText = props.text;
	const invertedColor = (questionCategory.cssClass).replace("cat-", "text-");
	let cssClass = props.cssClasses;
	if (cssClass === undefined) { cssClass = `rounded py-2 my-2 border btn btn-dark w-100 ${invertedColor}` }

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