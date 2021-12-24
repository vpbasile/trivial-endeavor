import React from "react";
import AnswerButton from './AnswerButton';
import ErrorBoundary from './ErrorBoundary';

export default function Question(props) {
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
	const currentPlayer = players[currentPlayerIndex];

	var tempCssClass = questionCategory.cssClass;
	function handleGuess(guess) {
		// console.log(`${currentPlayer.name} guesses ${guess}`);
		// console.log(`currentPlayerIndex: ${currentPlayerIndex}`);
		setGamePhase({
			currentPhase: { key: "04", title: "Answer", index: 2 },
			currentPlayerIndex: currentPlayerIndex
		})

		// props.updateQuestion(guess);
		let question = props.currentQuestion;
		let correctChoice = question.correctIndex;
		// const currentPlayerIndex = props.currentPlayerIndex;
		const tempScoreState = props.scoreState;

		if (guess === correctChoice) {
			console.log("Correct!");
			// If the current player got it right, then update their scorecard
			currentPlayer.correctCategories.push(questionCategoryTag);

		} else { console.log(`Incorrect!  The correct answer was: ${correctChoice} ${question.choices[correctChoice]}`); }
		// Now that feedback has been given, move to the next player
		const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
		// props.setCurrentPlayerIndex(nextPlayerIndex);
		// console.log(`Now it is ${players[nextPlayerIndex].name}'s turn.`);

		// Update the game state
		setGamePhase({
			currentPhase: { key: "02", title: "Select", index: 0 },
			currentPlayerIndex: nextPlayerIndex
		})

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
			// Guess has not been entered, so all buttons get the same class
		} else { classes += " btn-dark"; }
		return (
			<AnswerButton
				categoryList={categoryList}
				scoreState={scoreState} setScoreState={setScoreState}
				gamePhase={gamePhase} setGamePhase={setGamePhase}
				currentPlayerIndex={currentPlayerIndex} setCurrentPlayerIndex={props.setCurrentPlayerIndex}
				currentCategory={props.currentCategory} setCurrentCategory={props.setCurrentCategory}
				currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
				guessedState={guessedState} setGuessedState={setGuessedState}
				key={buttonIndex}
				index={buttonIndex++}
				text={choice}
				disabled={props.currentQuestion.guessedState}
				handleGuess={handleGuess}
				cssClasses={classes}
			/>
		);
	});

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