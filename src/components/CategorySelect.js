// API info:
// https://trivia.willfry.co.uk/

// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

import React from "react";

export default function CategorySelect(props) {
	const categoryList = props.categoryList;
	var gameState = props.gameState;
	// console.log(`Just for now, gameState: ${JSON.stringify(gameState)}`);
	const currentCategory = props.category;
	const currentPlayerIndex = props.gameState.currentPlayerIndex;
	const cssClass = currentCategory.cssClass + " w-100";

	function newQuestion(player, category, gameState) {
		// var tempGameState = gameState;
		gameState.currentCategory = category;
		gameState.currentPhase = { key: "03", title: "Question" };
		const categoryTitle = category.title
		console.log(`Player ${player} requests a ${categoryTitle} question`);
		var queryURL = `https://api.trivia.willfry.co.uk/questions?categories=${category.queryTag}&limit=1`
		// Create a temporary question while we wait for the API to respond
		var tempQuestion = {
			categoryTag: category.queryTag,
			questionText: "Loading...",
			choices: ["Loading...", "Loading...", "Loading...", "Loading..."],
			correctAnswer: "Loading...",
			correctIndex: 0
		}
		props.setCurrentQuestion(tempQuestion);
		getQuestion(queryURL);
	}

	async function getQuestion(url) {
		// Query the API for a new question and parse it
		fetch(url).then(response => response.json())
			.then(data => { parseReceivedQuestion(data[0]) })
			.catch(error => { console.log(error); });
	}

	function parseReceivedQuestion(data) {
		props.setGuessedState(false);
		console.log(`Parsing question`);
		const hideAnswers = true;
		if (hideAnswers) {
			// Hide the answer data so I don't learn anything while I'm debugging
			data.correctAnswer = "Correct answer"
			data.incorrectAnswers = ["Incorrect answer 1", "Incorrect answer 2", "Incorrect answer 3"]
		}

		// Parse the received question into the game's data structure
		// Make sure we don't have more than 4 incorrect answers
		var incorrectAnswers = data.incorrectAnswers.slice(0, 4);
		const choicesCount = incorrectAnswers.length + 1
		shuffleArray(incorrectAnswers);
		const answerIndex = Math.floor(Math.random() * (choicesCount));
		var choices = []
		choices[answerIndex] = data.correctAnswer;
		for (var i = 0; i < choicesCount; i++) {
			if (i === answerIndex) { choices[i] = data.correctAnswer; }
			else { choices[i] = incorrectAnswers.pop(); }
		}
		const categoryName = data.category;
		// console.log(`categoryName = ${categoryName}`);
		// console.log(`categoryList = ${JSON.stringify(categoryList)}`);
		const category = categoryList.filter(category => category.title === categoryName);
		// console.log(`category = ${JSON.stringify(category)}`);
		const categoryTag = category[0].queryTag;
		// console.log('This is where it gets set')
		var questionArray = {
			// <><> Here's the data structure
			questionText: data.question,
			choices: choices,
			correctAnswer: data.correctAnswer,
			correctIndex: answerIndex,
			categoryTag: categoryTag
		}
		// Update the game state with the new question
		props.setCurrentQuestion(questionArray);
	}

	function shuffleArray(array) {
		let curId = array.length;
		// There remain elements to shuffle
		while (0 !== curId) {
			// Pick a remaining element
			let randId = Math.floor(Math.random() * curId);
			curId -= 1;
			// Swap it with the current element.
			let tmp = array[curId];
			array[curId] = array[randId];
			array[randId] = tmp;
		}
		return array;
	}

	// Enhancement: Only query the api at the beginning of the game and when the player requests a category that we've run out of questions for

	// <> Build the buttons
	const playerColumns = gameState.players.map((player, index) => {
		if (player.correctCategories.includes(currentCategory.queryTag)) {
			// If the player has already completed this category, show the category as completed
			return (<td key={index}><input className='btn w-100' type="button" value="Complete!" disabled={true} /></td>);
		} else {
			// Else,
			return (
				<td key={index}>
					<input className={cssClass} type="button" value={`Get question`} onClick={() =>
						newQuestion(currentPlayerIndex, currentCategory, gameState)} />
				</td>
			);
			// If this is the current player, show the button
			// if (index === gameState.currentPlayerIndex) {

			// } else {
			// 	// Else, show the category as not completed
			// 	return (<td key={index}>
			// 		<input className={`${cssClass} border-0`} type="button" disabled={true} value={`Not completed`} />
			// 	</td>);
			// }
		}
	});

	// Return the category row
	return (
		<tr className={cssClass}>
			<td>{currentCategory.title}</td>
			{playerColumns}
		</tr>
	);
}