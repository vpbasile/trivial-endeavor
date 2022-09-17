import React, { Dispatch } from "react";
import { player, category, question, whatsHappening } from "../dataStructures";

type AnswerButtonProps = {
	key: number, index: number,
	// <><><> What's happening
	whatsHappening: whatsHappening,
	currentQuestion: question,
	scoreState: player[], setScoreState: Dispatch<player[]>,
	guessedState: boolean, setGuessedState: Dispatch<boolean>,
	// <><><> Game Globals
	categoryList: category[],
	// <><><> Button-specific Globals
	text: string,
	disabled: boolean,
	cssClasses: string
	handleGuess: (buttonIndex:number, currentPlayerIndex:number, questionCategoryTag:string)=>void,
}

export default function AnswerButton(props: AnswerButtonProps) {
	// <><><> What's happening
	const whatsHappening = props.whatsHappening
	let currentQuestion = props.currentQuestion
	// ====== If the question is null, the player has not selected a question yet
	if (currentQuestion === undefined) { return null; }
	// <><><> If we have a question, continue with 
	const guessedState = props.guessedState; const setGuessedState = props.setGuessedState;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	// <><><> Button-specific Globals
	let buttonIndex = props.index;
	let buttonText = props.text;
	const handleGuess = props.handleGuess;
	let cssClass = props.cssClasses;
	// <><><> Derivative values
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const questionCategoryTag = currentQuestion.categoryTag;

	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	const invertedColor = (questionCategory.cssClass).replace("cat-", "text-");
	if (cssClass === undefined) { cssClass = `rounded py-2 my-2 border btn btn-dark w-100 ${invertedColor}` }

	const buttonID = `choice-${buttonIndex}`;


	return (
		<div>
			<input className={cssClass} type="button" value={buttonText} id={buttonID} disabled={guessedState} onClick={() => {
				setGuessedState(true); handleGuess(buttonIndex, currentPlayerIndex, questionCategoryTag)
			}} />
		</div>
	);
}