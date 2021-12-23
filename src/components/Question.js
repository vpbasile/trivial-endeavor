import React from "react";
import AnswerButton from './AnswerButton';

export default function Question(props) {
	var tempGameState = props.gameState;
	const categoryList = props.categoryList;
	var currentQuestion = props.currentQuestion
	var setCurrentQuestion = props.setCurrentQuestion;
	const questionCategoryTag = currentQuestion.categoryTag;
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	const questionText = currentQuestion.questionText;
	const choices = currentQuestion.choices;
	const gameState = props.gameState;
	const currentPlayer = props.gameState.players[props.gameState.currentPlayerIndex];

	function handleGuess(guess) {
		console.log(`${currentPlayer.name} guesses ${guess}`);
		// gameState.currentPhase = 
		props.setGamePhase({ key: "04", title: "Answer", index: 2 });
		props.updateGameState(gameState);
		let question = props.currentQuestion;
		let correctChoice = question.correctIndex;

		if (guess === correctChoice) {
			console.log("Correct!");
			// If the current player got it right, then update their scorecard
			const currentPlayer = gameState.players[gameState.currentPlayerIndex];
			currentPlayer.correctCategories.push(questionCategoryTag);
		} else {
			console.log(`Incorrect!  The correct answer was: ${correctChoice} ${question.choices[correctChoice]}`);
		}
		// Now that feedback has been given, move to the next player
		const nextPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
		gameState.currentPlayerIndex = nextPlayerIndex;
		console.log(`Now it is ${gameState.players[gameState.currentPlayerIndex].name}'s turn.`);

		tempGameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
		// Update the game state
		props.updateGameState(tempGameState);
		props.setGamePhase({ key: "02", title: "Select", index: 0 });
	}

	// Make answer buttons
	let buttonIndex = 0;
	const answerButtons = choices.map((choice) => {
		// Generic gray button class
		let classes = "rounded p-2 m-2 border w-100 btn"
		if (props.guessedState) {
			// Guess has been entered, so set the classes to show which button was correct
			if (buttonIndex === currentQuestion.correctIndex) {
				console.log(`Button ${buttonIndex} is correct`);
				classes += " btn-success";
			}
		} else {
			// Guess has not been entered, so all buttons get the same class
			classes += " btn-dark";
		}
		return <AnswerButton
			key={buttonIndex}
			index={buttonIndex++}
			text={choice}
			disabled={props.currentQuestion.guessedState}
			gameState={gameState}
			currentQuestion={currentQuestion}
			setCurrentQuestion={setCurrentQuestion}
			categoryList={categoryList}
			handleGuess={handleGuess}
			cssClasses={classes}
			guessedState={props.guessedState} setGuessedState={props.setGuessedState}
		/>
	})

	// var tempCssClass = props.currentCategory.cssClass;
	var tempCssClass = questionCategory.cssClass;
	if (tempCssClass === undefined) { tempCssClass = "blackandwhite"; }
	tempCssClass = `p-2 m-2 btn w-100 ${tempCssClass}`;
	return (
		<div className="card bg-dark">
			{/* Figure out how Bootstrap cards really work */}
			<div className="card-body">
				<h2 id="display-category" className={tempCssClass}>
					{questionCategory.title}
				</h2>
				<p className="card-text btn btn-dark w-100" id="display-question">{questionText}</p>
				{answerButtons}
			</div>
		</div>

	);
}