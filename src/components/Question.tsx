import React, { Dispatch, SetStateAction } from "react";
import { category, phaseDefinition, categoryTag, player, question, choices, whatsHappening } from "../dataStructures";
import { nextPlayer } from './helpers'
import AnswerButton from './AnswerButton';

type QuestionProps = {
	// <><><> Dev mode stuff	
	devMode: boolean;
	neededToWin: number;
	// <><><> What's happening
	whatsHappening: whatsHappening; setwhatsHappening: Dispatch<whatsHappening>;
	currentQuestion: question; setCurrentQuestion: Dispatch<question>;
	questionCategoryTag: string;
	scoreState: player[]; setScoreState: Dispatch<SetStateAction<player[]>>;
	guessedState: boolean; setGuessedState: Dispatch<boolean>;
	// <><><> Winning
	winners: number[]; setWinners: Dispatch<number[]>;
	hasWon: (playerIndex: number) => {};
	// <><><> Game Globals
	categoryList: category[];
	phases: phaseDefinition[];
};

export default function Question(props: QuestionProps): JSX.Element | null {

	// <><><> Dev mode stuff
	const devMode = props.devMode;
	const neededToWin = props.neededToWin;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening;
	const setwhatsHappening = props.setwhatsHappening;
	// ====== Pause to check if we need to render
	if (!devMode && (whatsHappening.currentPhase.title === "Welcome")) { return null; }
	// <><><> Continue with the What's happening
	let currentQuestion = props.currentQuestion
	let setCurrentQuestion = props.setCurrentQuestion;
	const questionCategoryTag = currentQuestion.categoryTag;
	const scoreState = props.scoreState; const setScoreState = props.setScoreState;
	const guessedState = props.guessedState; const setGuessedState = props.setGuessedState;
	// <><><> Winning
	const winners = props.winners;
	const setWinners = props.setWinners;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	const phases = props.phases;
	// <><><> Question Globals
	const questionText = currentQuestion.questionText;
	const choices: choices = currentQuestion.choices;

	// <><><> Derivative values
	let playerCount = scoreState.length; // THis should be a const, maybe FIXTHIS
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	let tempCssClass = questionCategory.cssClass;

	function handleGuess(guess: number, currentPlayerIndex: number, questionCategoryTag: string): void {
		const currentPlayer = scoreState[currentPlayerIndex];
		console.log(`${currentPlayer.name} guesses ${guess}`);
		let tempQuestionState = currentQuestion
		tempQuestionState.guessEntered = guess
		setCurrentQuestion(tempQuestionState)
		let x = phases.find(phase => phase.title === "Answer")
		// FIXTHIS Neet to make this safer
		if (x) {
			setwhatsHappening({
				currentPhase: x,
				currentPlayerIndex: currentPlayerIndex
			})
		}
		let question = props.currentQuestion;
		let correctChoice = question.correctIndex;
		if (guess === correctChoice) {
			// If the player guessed correctly, add questionCategoryTag to the player's score
			console.log(`Correct! ${currentPlayer.name} has completed the ${questionCategory.title} category`);
			let winCheck = updatedScore(currentPlayerIndex, questionCategoryTag);
			console.log(`${currentPlayer.name}'s score: ${JSON.stringify(winCheck)}/${neededToWin}`);
			let tempWinners = Array.from(winners);
			if (winCheck >= neededToWin) {
				tempWinners.push(currentPlayerIndex)
				setWinners(tempWinners);
			}
		} else {
			// If the player was incorrect
			console.log(`Incorrect!  The correct answer was: ${correctChoice} ${question.choices[correctChoice]}`);
		}
		// Now that feedback has been given, move to the next player
		let nextPlayerIndex = nextPlayer(currentPlayerIndex, playerCount, neededToWin, scoreState);
		const y = props.phases.find(phase => phase.title === "Select");
		// Update the game state
		if (y) {
			// FIXTHIS Neet to make this safer
			setwhatsHappening({
				currentPhase: y,
				currentPlayerIndex: nextPlayerIndex
			})
		}
		console.log(`===== <> Now it is ${scoreState[nextPlayerIndex].name}'s turn <> =====`);
	}

	function updatedScore(playerIndex: number, categoryTag: categoryTag) {
		let temp = scoreState;
		temp[playerIndex].correctCategories.push(categoryTag);
		const currenPlayerScore = temp[playerIndex].correctCategories.length;

		setScoreState(temp);
		return currenPlayerScore;
	}

	// Make answer buttons
	let buttonIndex = 0;

	const answerButtons = choices.map((choice) => {
		// Generic gray button class
		let classes = " text-wrap rounded py-2 my-2 border w-100 btn"
		// If the choice is null, return a disabled button and exit
		// console.log(`Choice: ${choice}`);
		if (choice === null) {
			// console.log("Choice is null");
			return (<AnswerButton
				categoryList={categoryList}
				guessedState={guessedState} setGuessedState={setGuessedState}
				key={buttonIndex}
				index={buttonIndex++}
				text="Please select a category"
				disabled={true}
				cssClasses={classes}
				scoreState={scoreState} setScoreState={setScoreState}
				currentQuestion={currentQuestion}
				handleGuess={handleGuess}
				whatsHappening={whatsHappening} />)
		}
		else {
			// If the guess has been entered
			if (props.guessedState) {
				// set the classes to show which button was correct
				if (buttonIndex === currentQuestion.correctIndex) {
					classes += " btn-success";
				} else if (buttonIndex === currentQuestion.guessEntered) {
					// The guess was wrong so turn the button red
					classes += " btn-danger";
				} else { classes += " btn-dark"; }
				// Guess has not been entered, so all buttons get the same class
			} else { classes += " btn-dark"; }
			return (
				<AnswerButton
					categoryList={categoryList}
					scoreState={scoreState} setScoreState={setScoreState}
					whatsHappening={whatsHappening}
					guessedState={guessedState} setGuessedState={setGuessedState}
					key={buttonIndex}
					index={buttonIndex++}
					text={choice}
					disabled={(currentQuestion.guessEntered === null)}
					cssClasses={classes}
					currentQuestion={currentQuestion} handleGuess={handleGuess} />
			);
		}
	});

	// Handle hiding and showing the question
	let questionClasses = "card bg-dark mb-3";
	// CSS for the category header
	if (tempCssClass === undefined) { tempCssClass = "blackandwhite"; }
	tempCssClass = `py-2 my-2 btn w-100 ${tempCssClass}`;
	return (
		<div className={questionClasses}>
			<div id="collapse-card" className="card-body">
				<h2 id="display-category" className={tempCssClass}>
					{questionCategory.title}
				</h2>
				<p className="card-text btn btn-dark w-100" id="display-question">{questionText}</p>
				{answerButtons}
			</div>
		</div>
	);
}