// API info:
// https://trivia.willfry.co.uk/

// https://api.trivia.willfry.co.uk/questions?categories=food_and_drink,geography,general_knowledge,history,literature,movies,music,science,society_and_culture,sport_and_leisure&limit=1

import React, { Dispatch } from "react";
import { category, choices, phaseDefinition, player, questionInternal, whatsHappening } from "../dataStructures";

type CategorySelectProps = {
	key: string,
	// <><><> Dev mode stuff
	devMode: boolean
	// <><><> What's happening
	whatsHappening: whatsHappening, setwhatsHappening: Dispatch<whatsHappening>,
	currentQuestion: questionInternal, setCurrentQuestion: Dispatch<questionInternal>,
	scoreState: player[],
	guessedState: boolean, setGuessedState: Dispatch<boolean>,
	// <><><> Winning
	winners: number[], setWinners: Dispatch<number[]>,
	hasWon: number,
	// <><><> Game Globals
	categoryList: category[],
	phases: phaseDefinition[],
	// <><><> Player and category we're iterating on 
	category: category,
	player: player,
	// <><><> Derivative values
}

export default function CategorySelect(props: CategorySelectProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening, setwhatsHappening = props.setwhatsHappening;
	const setCurrentQuestion = props.setCurrentQuestion;
	const setGuessedState = props.setGuessedState;
	// <><><> Winning
	const hasWon:number = props.hasWon;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	const phases = props.phases;
	// <><><> Question Globals
	// <><><> Player and category we're iterating on 
	const player = props.player;
	const category = props.category;
	// <><><> Derivative values
	const cssClass: string = category.cssClass + " w-100  text-wrap";

	function newQuestion(currentPlayerIndex: number, category: category) {
		const temp = phases.find((phase: { title: string; }) => phase.title === "Answer");
		// FIXTHIS Need to error handle
		if (temp) {
			setwhatsHappening({
				currentPhase: temp,
				currentPlayerIndex: currentPlayerIndex
			})
		}
		// console.log(`Freshly set game phase:`)
		// console.log(`whatsHappening: ${JSON.stringify(whatsHappening)}`);
		const categoryTitle = category.title
		console.log(`${player.name} requests a ${categoryTitle} question`);
		// Old formats of the API request:
		// let queryURL = `https://api.trivia.willfry.co.uk/questions?categories=${category.queryTag}&limit=1`
		// let queryURL = `https://the-trivia-api.com/questions?categories=food_and_drink&limit=1`
		let queryURL = `https://the-trivia-api.com/api/questions?categories=${category.queryTag}&limit=1`;
		// Create a temporary question while we wait for the API to respond
		const tempQuestion: questionInternal = {
			categoryTag: category.queryTag,
			questionText: "Loading...",
			choices: ["Loading...", "Loading...", "Loading...", "Loading..."],
			correctAnswer: "Loading...",
			correctIndex: 0,
			guessEntered: 0
		}
		setGuessedState(false);
		setCurrentQuestion(tempQuestion);
		getQuestion(queryURL);
	}
	async function getQuestion(url: RequestInfo | URL) {
		// If we're in devMode, we'll use the local copy of the API
		// if (devMode) { parseReceivedQuestion(spoofQuestion) }
		// else {
		// Query the API for a new question and parse it	
		fetch(url).then(response => response.json())
			.then(data => { parseReceivedQuestion(data[0]) })
			.catch(error => { console.log(error); });
		// }
	}

	type questionFromAPI = {
		correctAnswer: string;
		incorrectAnswers: string[];
		category: string;
		question: string;
	}

	function parseReceivedQuestion(data: questionFromAPI) {
		console.log(`Parsing question`);
		if (devMode) {
			// Hide the answer data so I don't learn anything while I'm debugging
			console.log(`=====Hiding answers=====`);
			data.correctAnswer = "Correct answer"
			data.incorrectAnswers = ["Incorrect answer 1", "Incorrect answer 2", "Incorrect answer 3"]
		}
		// Parse the received question into the game's data structure
		// Make sure we don't have more than 4 incorrect answers
		let incorrectAnswers: string[] = data.incorrectAnswers.slice(0, 4);
		const choicesCount = incorrectAnswers.length + 1
		shuffleArray(incorrectAnswers);
		const answerIndex = Math.floor(Math.random() * (choicesCount));
		let choices: choices = ["", "", "", ""]
		choices[answerIndex] = data.correctAnswer;
		for (let i = 0; i < choicesCount; i++) {
			if (i === answerIndex) { choices[i] = data.correctAnswer; }
			else {
				let x = incorrectAnswers.pop()
				if (x !== undefined) { choices[i] = x; }
			}
		}
		const categoryName: string = data.category;
		// This is where we get the category object from the list
		const category: category[] = categoryList.filter((categoryTemp) => {
			return categoryTemp.title === categoryName;
		});

		const categoryTag: string = category[0].queryTag;

		let questionArray: questionInternal = {
			// <><> Here's the data structure
			questionText: data.question,
			choices: choices,
			correctAnswer: data.correctAnswer,
			correctIndex: answerIndex,
			categoryTag: categoryTag,
			guessEntered: 0
		}
		// Update the game state with the new question
		setCurrentQuestion(questionArray);
	}

	function shuffleArray(array: string[]): string[] {
		let curId: number = array.length;
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
	const buttonKey = player.name + '_' + category.queryTag;
	const inactiveButtonCss = `${css} btn-dark ${cssClass.replace("cat-", "text-")}`
	const winner1Button = <input key={buttonKey} className={`${css} gold bg-gradient w-100`} type="button" value={"1st place!"} disabled={true} />
	const winner2Button = <input key={buttonKey} className={`${css} silver bg-gradient w-100`} type="button" value={"2nd place!"} disabled={true} />
	const winner3Button = <input key={buttonKey} className={`${css} bronze bg-gradient w-100`} type="button" value={"3rd place!"} disabled={true} />

	// <> Build the button
	// console.log(JSON.stringify(whatsHappening))
	// During the welcome phase, all buttons should be disabled
	if (whatsHappening.currentPhase.title === "Welcome") {
		return (<input key={buttonKey}
			className={inactiveButtonCss} type="button" value={category.title} disabled={true} />
		)
	}
	// If the player is a winner, the button should be gold.
	let place:number = hasWon;
	if (place > -1) {
		switch (place) {
			case 0: return (winner1Button);
			case 1: return (winner2Button);
			case 2: return (winner3Button);
			default: break;
		}
	}
	// If the player has already completed this category, show the category as completed, regardless of whether it that player's turn or not
	if (player.correctCategories.includes(category.queryTag)) {
		return (<input key={buttonKey} className={completeButtonCss} type="button" value={completeString} disabled={true} />);
	}
	// If it's the current player's turn, show the button
	if (player.index === whatsHappening.currentPlayerIndex) {
		return (<input className={activeButtonCss} type="button" value={category.title} onClick={() => newQuestion(player.index, category)
		} />
		);
	}
	// // Else (it is not the current player's turn and they have not completed this category), show the category as not completed
	return (<input key={buttonKey} className={inactiveButtonCss} type="button" value={category.title} disabled={true} />);
}