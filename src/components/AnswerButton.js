import React from "react";

export default function AnswerButton(props) {
	const categoryList = props.categoryList;
	const players = props.players;
	const scoreState = props.scoreState;
	const setScoreState = props.setScoreState;
	const gamePhase = props.gamePhase;
	const setGamePhase = props.setGamePhase;
	const currentPlayerIndex = props.currentPlayerIndex;
	var currentQuestion = props.currentQuestion
	const guessedState = props.guessedState;
	const setGuessedState = props.setGuessedState;

	var setCurrentQuestion = props.setCurrentQuestion;
	const questionCategoryTag = currentQuestion.categoryTag;
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	const questionText = currentQuestion.questionText;
	const choices = currentQuestion.choices;

	let buttonIndex = props.index;
	var buttonText = props.text;
	const invertedColor = (questionCategory.cssClass).replace("cat-", "text-");

	let cssClass = props.cssClasses;
	if (cssClass === undefined) { cssClass = `rounded p-2 m-2 border btn btn-dark w-100 ${invertedColor}`}

	const buttonID = `choice-${buttonIndex}`;
	const handleGuess = props.handleGuess;
	// if (guessedState) {
	// 	console.log("guessedState is true")
	// } else { console.log("guessedState is false") }

	return (
		<div>
			<input className={cssClass} type="button" value={buttonText} id={buttonID}
				onClick={() => {
					props.setGuessedState(true); handleGuess(buttonIndex)
				}} disabled={guessedState} />
		</div>
	);
}