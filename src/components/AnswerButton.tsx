import React from "react";
import { fixMeLater, player, category } from "../dataStructures";

type AnswerButtonProps = {
	categoryList: category[],
	guessedState: fixMeLater, setGuessedState: fixMeLater,
	key: number, index: number,
	text: string,
	disabled: boolean,
	cssClasses: string
	scoreState: player[], setScoreState: fixMeLater,
	currentQuestion: fixMeLater,
	handleGuess: fixMeLater,
	whatsHappening: fixMeLater,
}

export default function AnswerButton(props: AnswerButtonProps) {
	const whatsHappening = props.whatsHappening
	const categoryList = props.categoryList;
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
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