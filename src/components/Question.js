import React from "react";
import AnswerButton from './AnswerButton';

export default function Question(props) {
	const categoryList = props.categoryList;
	var currentQuestion = props.currentQuestion
	const questionCategoryTag = currentQuestion.categoryTag;
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	const questionText = currentQuestion.questionText;
	const choices = currentQuestion.choices;
	const gameState = props.gameState;

	function handleGuess(guess) {
		let question = props.currentQuestion;
		let correctChoice = question.correctIndex;
		// let playerName = gameState.players[gameState.currentPlayerIndex].name;
		console.log(`Player ${gameState.currentPlayer} guesses ${guess}`);

		if (guess === correctChoice) {
			console.log("Correct!");
			// Update the button with whether it was the correct answer or not
			// If the current player got it right, then update their scorecard
		} else {
			console.log(`Incorrect!  The correct answer was: ${correctChoice} ${question.choices[correctChoice]}`);
		}
	}


	// function donotuse(guess) {

	// 	var x = {
	// 		"questionText": "What was the real name of Eric Morecambes partner?"
	// 		, "choices": ["Correct answer"
	// 			, "Incorrect answer 2"
	// 			, "Incorrect answer 1"
	// 			, "Incorrect answer 3"]
	// 		, "correctAnswer": "Correct answer"
	// 		, "correctIndex": 0
	// 		, "categoryTag": "general_knowledge"
	// 	}
	// 	console.log("Don't use this function");
	// 	var correctChoice = 5
	// 	// Update the button with whether it was the correct answer or not
	// 	for (var i = 0; i < 4; i++) {
	// 		var button = document.getElementById(`choice-${i}`);
	// 		button.disabled = true;
	// 		if (i === correctChoice) {
	// 			button.classList.add("btn-success");
	// 		} else if (i === guess) {
	// 			button.classList.add("btn-danger");
	// 		} else {
	// 			button.classList.add("btn-secondary");
	// 		}
	// 	}
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
			status={`clickable`}
			gameState={gameState}
			currentQuestion={currentQuestion}
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