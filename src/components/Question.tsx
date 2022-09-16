import React from "react";
import { category, phaseDefinition, fixMeLater, categoryTag, player, question, choices } from "../dataStructures";
import { nextPlayer } from './helpers'
import AnswerButton from './AnswerButton';

export default function Question(props: {
	devMode: fixMeLater,
	phases: phaseDefinition[],
	neededToWin: number,
	whatsHappening: fixMeLater,
	categoryList: category[],
	scoreState: player[],
	players: player[]
	// playerCount: fixMeLater, // FIXTHIS: DOn't pass it donw, calculate when it's needed.
	// handleGuess: ()=>void,
	setScoreState: fixMeLater,
	winners: fixMeLater,
	hasWon: fixMeLater,
	setWinners: fixMeLater,
	setwhatsHappening: fixMeLater,
	currentPlayerIndex: fixMeLater,
	// setCurrentPlayerIndex: fixMeLater,
	currentQuestion: question,
	currentCategory: category, setCurrentCategory: fixMeLater,
	guessedState: fixMeLater, setGuessedState: fixMeLater,
	setCurrentQuestion: fixMeLater,
	questionCategoryTag: fixMeLater,
	playoffs: fixMeLater,
	setPlayoffs: fixMeLater,

}) {
	const devMode = props.devMode;
	const whatsHappening = props.whatsHappening;
	if (!devMode && (whatsHappening.currentPhase.title === "Welcome")) { return null; }

	const categoryList = props.categoryList;
	const scoreState = props.scoreState; let playerCount = scoreState.length;
	const setScoreState = props.setScoreState;
	const winners = props.winners;
	const setWinners = props.setWinners;
	const setwhatsHappening = props.setwhatsHappening;
	var currentQuestion = props.currentQuestion
	const guessedState = props.guessedState; const setGuessedState = props.setGuessedState;

	var setCurrentQuestion = props.setCurrentQuestion;
	const questionCategoryTag = currentQuestion.categoryTag;
	console.log(`questionCategoryTag: ${questionCategoryTag}`)
	console.log(`categoryList: ${JSON.stringify(categoryList)}`)
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	console.log(`questionCategory: ${questionCategory}`)
	const questionText = currentQuestion.questionText;
	const choices: choices = currentQuestion.choices;
	var tempCssClass = questionCategory.cssClass;
	const phases = props.phases;

	// const neededToWin = 2; // This is great for testing purposes
	const neededToWin = props.neededToWin;

	function handleGuess(guess: fixMeLater, currentPlayerIndex: number, questionCategoryTag: string): void {
		currentPlayerIndex = whatsHappening.currentPlayerIndex;
		const currentPlayer = scoreState[currentPlayerIndex];
		console.log(`${currentPlayer.name} guesses ${guess}`);
		var tempQuestionState = currentQuestion
		tempQuestionState.guessEntered = guess
		setCurrentQuestion(tempQuestionState)
		setwhatsHappening({
			currentPhase: phases.find(phase => phase.title === "Answer"),
			currentPlayerIndex: currentPlayerIndex
		})
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
		var nextPlayerIndex = nextPlayer(currentPlayerIndex, playerCount,neededToWin,scoreState);
		// Update the game state
		setwhatsHappening({
			currentPhase: props.phases.find(phase => phase.title === "Select"),
			currentPlayerIndex: nextPlayerIndex
		})
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
					// handleGuess={handleGuess}
					cssClasses={classes}
					currentQuestion={undefined} handleGuess={handleGuess} />
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