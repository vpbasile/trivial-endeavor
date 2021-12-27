// API info:
// https://trivia.willfry.co.uk/

// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

import React from "react";

export default function CategorySelect(props) {
	const categoryList = props.categoryList;
	const players = props.players;
	// console.log(`Players: ${JSON.stringify(players)}`);
	const gamePhase = props.gamePhase;
	const setGamePhase = props.setGamePhase;
	const category = props.category;
	const cssClass = category.cssClass + " w-100  text-wrap";

	function newQuestion(currentPlayerIndex, category) {
		setGamePhase({
			currentPhase: props.phases.find(phase => phase.title === "Answer"),
			currentPlayerIndex: currentPlayerIndex
		})
		// console.log(`Freshly set game phase:`)
		// console.log(`gamePhase: ${JSON.stringify(gamePhase)}`);
		const categoryTitle = category.title
		const player = players[currentPlayerIndex];
		console.log(`${player.name} requests a ${categoryTitle} question`);
		var queryURL = `https://api.trivia.willfry.co.uk/questions?categories=${category.queryTag}&limit=1`
		// Create a temporary question while we wait for the API to respond
		var tempQuestion = {
			categoryTag: category.queryTag,
			questionText: "Loading...",
			choices: ["Loading...", "Loading...", "Loading...", "Loading..."],
			correctAnswer: "Loading...",
			correctIndex: 0
		}
		props.setGuessedState(false);
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
		console.log(`Parsing question`);
		// <>! Switch
		const hideAnswers = props.devMode;
		if (hideAnswers) {
			// Hide the answer data so I don't learn anything while I'm debugging
			console.log(`=====Hiding answers=====`);
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
	const colorButton = ``
	const darkButton = `${cssClass.replace("cat-", "text-")} text-wrap btn-dark border-0`

	// <> Build the buttons
	const playerColumns = players.map((player, index) => {
		// console.log(`${player.name} is player ${index}.  player: ${JSON.stringify(player)}`);
		if (player.correctCategories.includes(category.queryTag)) {
			// If the player has already completed this category, show the category as completed
			return (<td key={index}>
				<input className={`${cssClass} border-0 text-wrap`} type="button" value={`-!!!-Complete-!!!-`} disabled={true} /></td>);
			
		} else {
			// Else,
			// If it's the current player's turn, show the button
			if (index === gamePhase.currentPlayerIndex) {
				return (
					<td key={index}>
						{/* <input className='cssClass' type="button" value="New Question" onClick={() => newQuestion(index, category)} /> */}
						<input className={`${cssClass}`} type="button" value={category.title} onClick={() => newQuestion(player.index, category)} />
					</td>);
			}
			// // Else, show the category as not completed
			else {
				return (<td key={index}>
					<input className={`${cssClass.replace("cat-", "text-")} btn-dark border-0`} type="button" value={category.title} disabled={true} />
				</td>);
			}
		}
	});

	// Return the category row
	return (
		<tr className={cssClass}>
			{/* <td>{category.title}</td> */}
			{playerColumns}
		</tr>
	);
}