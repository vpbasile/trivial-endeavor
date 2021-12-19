import React from "react";

export default function CategoryRow(props) {
	const currentCategory = props.category;
	const cssClass = currentCategory.cssClass + " w-100";
	const title = currentCategory.title;

	// API info:
	// https://trivia.willfry.co.uk/

	// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

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
		var button1 = document.getElementById("choice-1");
		var button2 = document.getElementById("choice-2");
		var button3 = document.getElementById("choice-3");
		var button4 = document.getElementById("choice-4");

		// Set the question
		const question = data.question;
		// Save the question in the game state
		props.gameState.currentQuestion.question = question;
		// Set the answers
		const answer = data.correctAnswer;
		const answerIndex = randomAnswer()
		gameState.currentQuestion.correctIndex = answerIndex;
		var choices = data.incorrectAnswers;
		choices.splice(answerIndex, 0, answer);
		// Save the answers in the game state
		props.gameState.currentQuestion.answers = choices;

		// Update the gameboard
		// First the question display
		questionDisplay.innerHTML = question;
		// Then the buttons
		button1.value = choices[0];
		button1.disabled = false;
		button2.value = choices[1];
		button2.disabled = false;
		button3.value = choices[2];
		button3.disabled = false;
		button4.value = choices[3];
		button4.disabled = false;
		console.log(`Game state: ${JSON.stringify(gameState)}`);

	}

	// Enhancement: Only query the api at the beginning of the game and when the player requests a category that we've run out of questions for

	// Choose a random integer between 1 and 4
	function randomAnswer() { return Math.floor(Math.random() * 4) + 1 }

	// Return the category row
	return (
		<tr className={cssClass}>
			<td>{props.title}</td>
			<td><input className={cssClass} type="button" value={`Get ${title} question`} onClick={() => newQuestion(1, currentCategory, props.gameState)} /></td>
			<td><input className={cssClass} type="button" value={`Get ${title} question`} onClick={() => newQuestion(2, currentCategory, props.gameState)} /></td>
		</tr>

	);
}
