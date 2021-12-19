import React from "react";

export default function AnswerButton(props) {

	function handleGuess(guess, answersArray, correctIndex) {
		console.log(`handleGuess: ${guess}`);
		console.log(`answersArray: ${answersArray}`);
		console.log(`correctIndex: ${correctIndex}`);
		console.log(`answersArray[guess]: ${answersArray[guess]}`);
		console.log(`answersArray[correctIndex]: ${answersArray[correctIndex]}`);
		
		// if (answersArray[guess] === undefined) {
		// 	console.log(`No guess entered.`);
		// } else {
		// 	// Disable all four answer buttons
		// 	document.getElementById("choice-1").disabled = true;
		// 	document.getElementById("choice-2").disabled = true;
		// 	document.getElementById("choice-3").disabled = true;
		// 	document.getElementById("choice-4").disabled = true;
		// 	console.log(`Player guesses ${guess}`);
		// 	if (guess === correctIndex) {
		// 		console.log("Correct!");
		// 	} else {
		// 		console.log(`Wrong! The correct answer was ${correctIndex}. ${answersArray[correctIndex]}`);
		// 	}
		// 	for (var i = 0; i < answersArray.length; i++) {
		// 		if (i === correctIndex) {
		// 			var currentButton = document.getElementById(`choice-${i}`)
		// 			currentButton.classList = "btn btn-success";
		// 			currentButton.disabled = true;
		// 		} else {
		// 			document.getElementById(`choice-${i}`).classList = "btn btn-danger";
		// 			currentButton.disabled = true;
		// 		}
		// 	}
		// }
	}

	const buttonID = `choice-${props.buttonIndex}`;
	const buttonClass = `btn w-100 my-2 blackandwhite`;
	return (
		<input type="button" className={buttonClass} id={buttonID} value="" onClick={() => alert("hi!")} disabled={true} ></input>
	)
}