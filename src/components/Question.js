import React from "react";
import AnswerButton from './AnswerButton';

export default function Question(props) {
	const devMode = props.devMode;
	const gamePhase = props.gamePhase;
	if (!devMode && (gamePhase.currentPhase.title === "Welcome")) { return null; }
	
	const categoryList = props.categoryList;
	const scoreState = props.scoreState;
	let playerCount = scoreState.length;
	const setScoreState = props.setScoreState;
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
	var tempCssClass = questionCategory.cssClass;

	function handleGuess(guess, currentPlayerIndex, questionCategoryTag) {
		currentPlayerIndex = gamePhase.currentPlayerIndex;
		const currentPlayer = scoreState[currentPlayerIndex];
		console.log(`${currentPlayer.name} guesses ${guess}`);
		var tempQuestionState = props.currentQuestion
		tempQuestionState.guessEntered = guess
		setCurrentQuestion(tempQuestionState)
		setGamePhase({
			currentPhase: props.phases.find(phase => phase.title === "Answer"),
			currentPlayerIndex: currentPlayerIndex
		})
		let question = props.currentQuestion;
		let correctChoice = question.correctIndex;
		if (guess === correctChoice) {
			// If the player guessed correctly, add questionCategoryTag to the player's score
			console.log(`Correct! ${currentPlayer.name} has completed the ${questionCategory.title} category`);
			let winCheck = updatedScore(currentPlayerIndex, questionCategoryTag);
			console.log(`${currentPlayer.name}'s score: ${JSON.stringify(winCheck)}`);
			// if(winCheck>7){
			// 	// This play
			// }
		} else {
			// If the player was incorrect
			console.log(`Incorrect!  The correct answer was: ${correctChoice} ${question.choices[correctChoice]}`);
		}
		// Now that feedback has been given, move to the next player
		const nextPlayerIndex = (currentPlayerIndex + 1) % playerCount;
		// Update the game state
		setGamePhase({
			currentPhase: props.phases.find(phase => phase.title === "Select"),
			currentPlayerIndex: nextPlayerIndex
		})
		console.log(`============ <> Now it is ${scoreState[nextPlayerIndex].name}'s turn <> ============`);
	}

	function updatedScore(playerIndex, categoryTag) {
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
		if (choice === null) {
			<AnswerButton
				categoryList={categoryList}
				// scoreState={scoreState} setScoreState={setScoreState}
				// gamePhase={gamePhase} setGamePhase={setGamePhase}
				// currentPlayerIndex={currentPlayerIndex} setCurrentPlayerIndex={props.setCurrentPlayerIndex}
				// currentCategory={props.currentCategory} setCurrentCategory={props.setCurrentCategory}
				// currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
				guessedState={guessedState} setGuessedState={setGuessedState}
				key={buttonIndex}
				index={buttonIndex++}
				text="Please select a category"
				disabled={true}
				// handleGuess={handleGuess}
				cssClasses={classes}
			/>
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
		}
	});

	// Handle hiding and showing the question
	let questionClasses = "card bg-dark mb-3";
	if (gamePhase.currentPhase.title === "Answer") { questionClasses += " show" }
	else { questionClasses += " animateCollapse-collapsed" }
	// CSS for the category header
	if (tempCssClass === undefined) { tempCssClass = "blackandwhite"; }
	tempCssClass = `py-2 my-2 btn w-100 ${tempCssClass}`;
	return (
		<div className={questionClasses}>
			{/* Figure out how Bootstrap cards really work */}
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