// API info:
// https://trivia.willfry.co.uk/

// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

import React from "react";

export default function CategoryRow(props) {
	var gameState = props.gameState;
	const currentCategory = props.category;
	const cssClass = currentCategory.cssClass + " w-100";

	function newQuestion(player, category, gameState) {
		gameState.currentCategory = category;
		const categoryTitle = category.title
		console.log(`Player ${player} requests a ${categoryTitle} question`);
		var queryURL = `https://api.trivia.willfry.co.uk/questions?categories=${category.queryTag}&limit=1`
		getQuestion(queryURL, gameState);
		// Set the category indicator
		var categoryDisplay = document.getElementById("display-category");
		categoryDisplay.innerHTML = categoryTitle
		categoryDisplay.classList = `rounded p-2 m-2 border border-light ${category.cssClass}`;
	}

	async function getQuestion(url, gameState) {
		// console.log(`Getting question from ${url}`);
		fetch(url).then(response => response.json())
			.then(data => { handleReceivedQuestion(data[0], gameState) })
			.catch(error => {
				console.log(error);
			});
	}

	function handleReceivedQuestion(data, gameState) {
		// Grab the DOM elements
		var questionDisplay = document.getElementById("display-question");

		// Set the question
		const question = data.question;
		// Save the question in the game state
		props.gameState.currentQuestion.question = question;
		// Set the answers
		const answer = data.correctAnswer;
		gameState.currentQuestion.correctAnswer = answer;
		const answerIndex = randomAnswer()
		gameState.currentQuestion.correctIndex = answerIndex;
		var choices = data.incorrectAnswers;
		choices[answerIndex] = answer;
		// Save the answers in the game state
		props.gameState.currentQuestion.answers = choices;

		// Update the gameboard
		// First the question display
		questionDisplay.innerHTML = question;
		// Then the buttons
		for (var i = 0; i < 4; i++) {
			// Reset the button classes
			var button = document.getElementById(`choice-${i}`);
			button.classList.remove("btn-success", "btn-danger", "btn-secondary");
			// Set the button text
			if (choices[i] !== undefined) {
				button.value = choices[i];
				button.disabled = false;
			} else {
				button.value = "";
				button.disabled = true;
			}
		}
		console.log(`Game state: ${JSON.stringify(gameState)}`);
	}

	// Enhancement: Only query the api at the beginning of the game and when the player requests a category that we've run out of questions for

	// Choose a random integer between 0 and 3
	function randomAnswer() { return Math.floor(Math.random() * 4) }

	// <> Build the buttons
	const playerColumns = gameState.players.map((player, index) => {
		if (player.correctCategories.includes(currentCategory.queryTag)) {
			// If the player has already completed this category, show the category as completed
			return(<td key={index}>Complete!</td>);
		} else {
			// Else,
			// If this is the current player, show the button
			if (index === gameState.currentPlayerIndex) {
			return (
				<td key={index}>
					<input className={cssClass} type="button" value={`Get question`} onClick={() => newQuestion(index, currentCategory, gameState)} />
				</td>
			);
			} else {
				// Else, show the category as not completed
				return(<td key={index}>Not completed</td>);
			}
		}
	});

	// Return the category row
	return (
		<tr className={cssClass}>
			<td>{props.title}</td>
			{playerColumns}
			{/* <td><input className={cssClass} type="button" value={`Get ${title} question`} onClick={() => newQuestion(1, currentCategory, gameState)} /></td>
			<td><input className={cssClass} type="button" value={`Get ${title} question`} onClick={() => newQuestion(2, currentCategory, gameState)} /></td> */}
		</tr>

	);
}