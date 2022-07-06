// API info:
// https://trivia.willfry.co.uk/

// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

import React from "react";

export default function CategorySelect(props) {
	const categoryList = props.categoryList;
	// const player = props.player;

	// const players = props.players;
	// console.log(`Players: ${JSON.stringify(players)}`);
	const gamePhase = props.gamePhase;
	// const currentPlayerIndex = gamePhase.currentPlayerIndex;
	const player = props.player;
	const setGamePhase = props.setGamePhase;
	const category = props.category;
	const cssClass = category.cssClass + " w-100  text-wrap";
	// const key = props.key;

	function newQuestion(currentPlayerIndex, category) {
		setGamePhase({
			currentPhase: props.phases.find(phase => phase.title === "Answer"),
			currentPlayerIndex: currentPlayerIndex
		})
		// console.log(`Freshly set game phase:`)
		// console.log(`gamePhase: ${JSON.stringify(gamePhase)}`);
		const categoryTitle = category.title
		// const player = players[currentPlayerIndex];
		console.log(`${player.name} requests a ${categoryTitle} question`);
		// Old formats of the API request:
		// var queryURL = `https://api.trivia.willfry.co.uk/questions?categories=${category.queryTag}&limit=1`
		// var queryURL = `https://the-trivia-api.com/questions?categories=food_and_drink&limit=1`
		var queryURL = `https://the-trivia-api.com/api/questions?categories=${category.queryTag}&limit=1`;
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
		// This is where we get the category object from the list
		const category = categoryList.filter(categoryTemp => categoryTemp.title === categoryName);
		// console.log(`category = ${JSON.stringify(category)}`);


		const categoryTag = category[0].queryTag;
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

	const completeString = "\u2713" // Checkmark
	// CSS common to all three types of buttons
	const css = "btn btn-lg btn-block  text-wrap my-1";
	// Complete category for any player
	const completeButtonCss = `${css} ${cssClass}`
	// Current player, not complete
	const activeButtonCss = `${css} ${cssClass}`
	// Other player, not complete
	const inactiveButtonCss = `${css} btn-dark ${cssClass.replace("cat-", "text-")}`



	const buttonKey = player.name + '_' + category.queryTag;

	// <> Build the button
	console.log(JSON.stringify(gamePhase))
	// During the welcome phase, all buttons should be disabled
	if (gamePhase.currentPhase.title === "Welcome") {
		return (<input key={buttonKey}
			className={inactiveButtonCss} type="button" value={category.title} disabled={true} />
		)
	}
	// If the player has already completed this category, show the category as completed, regardless of whether it that player's turn or not
	if (player.correctCategories.includes(category.queryTag)) {
		return (<input key={buttonKey} className={completeButtonCss} type="button" value={completeString} disabled={true} />);
	}
	// If it's the current player's turn, show the button
	if (player.index === gamePhase.currentPlayerIndex) {
		return (<input className={activeButtonCss} type="button" value={category.title} onClick={() => newQuestion(player.index, category)} />
		);
	}
	// // Else (it is not the current player's turn and they have not completed this category), show the category as not completed
	// else {
	return (
		<input key={buttonKey}
			className={inactiveButtonCss} type="button" value={category.title} disabled={true} />
	);
	// Return the category row
	// return (
	// 	<tr className={cssClass}>
	// 		{/* <td>{category.title}</td> */}
	// 		{playerColumns}
	// 	</tr>
	// );
}