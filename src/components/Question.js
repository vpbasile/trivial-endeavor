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
		console.log(`currentPlayer.name = ${currentPlayer.name}`);
		console.log(`${currentPlayer.name} guesses ${guess}`);
		gameState.currentPhase = { key: "04", title: "Answer", index: 2 };
		props.updateGameState(gameState);
		let question = props.currentQuestion;
		let correctChoice = question.correctIndex;

		const guessedQuestion = currentQuestion
		guessedQuestion.guessed = true;
		const setCurrentQuestion = props.setCurrentQuestion;
		setCurrentQuestion(guessedQuestion);
		// let playerName = gameState.players[gameState.currentPlayerIndex].name;
		if (guess === correctChoice) {
			console.log("Correct!");
			// Update the button with whether it was the correct answer or not
			// If the current player got it right, then update their scorecard
			const currentPlayer = gameState.players[gameState.currentPlayerIndex];

			currentPlayer.correctCategories.push(questionCategoryTag);
		} else {
			console.log(`Incorrect!  The correct answer was: ${correctChoice} ${question.choices[correctChoice]}`);
		}

		tempGameState.currentPlayerIndex = (gameState.currentPlayerIndex + 1) % gameState.players.length;
		// Update the game state
		props.updateGameState(tempGameState);
	}


	// 	// If the current player got it right, then update their scorecard
	// 	if (guess === correctChoice) {
	// 		players = gameState.players;
	// 		const currentPlayerIndex = gameState.currentPlayerIndex;
	// 		const playerName = players[currentPlayerIndex].name;
	// 		const currentCategory = gameState.currentCategory;
	// 		console.log(`${playerName} got it right in ${currentCategory.title}`);
	// 		// Keep track of which categories each player has correctly answered
	// 		players[currentPlayerIndex].correctCategories.push(currentCategory.queryTag);
	// 	} else {
	// 		console.log("Incorrect!  The correct answer was: " + gameState.currentQuestion.answers[correctChoice]);
	// 	}
	// 	// End the turn
	// 	// endTurn();
	// }

	// Make answer buttons
	let buttonIndex = 0;
	const answerButtons = choices.map((choice) => {
		return <AnswerButton
			key={buttonIndex}
			index={buttonIndex++}
			text={choice}
			disabled={props.currentQuestion.guessed}
			gameState={gameState}
			currentQuestion={currentQuestion}
			setCurrentQuestion={setCurrentQuestion}
			categoryList={categoryList}
			handleGuess={handleGuess} />
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