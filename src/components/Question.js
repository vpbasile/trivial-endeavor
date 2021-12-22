import React from "react";
import AnswerButton from './AnswerButton';

export default function Question(props) {
	const categoryList = props.categoryList;
	// Log stuff
	// console.log(`Props: ${JSON.stringify(props)}`);
	var questionData = props.questionData
	// console.log(`questionData = ${JSON.stringify(questionData)}`);
	// Grab all of the question props
	const questionCategoryTag = questionData.categoryTag;
	console.log(`Question category tag: ${questionCategoryTag}`);
	const questionCategory = categoryList.filter(category => category.queryTag === questionCategoryTag)[0];
	// This doesn't work
	console.log(`Question category: ${JSON.stringify(questionCategory)}`);
	const questionText = questionData.questionText;
	const choices = questionData.choices;
	const correctAnswer = questionData.correctAnswer;
	const correctIndex = questionData.correctIndex;
	// Make answer buttons
	let buttonIndex = 0;
	const answerButtons = choices.map((choice) => {
		buttonIndex++;
		return <AnswerButton key={buttonIndex} text={choice} gameState={props.gameState} />
	})

	// var tempCssClass = props.currentCategory.cssClass;
	var tempCssClass = questionCategory.cssClass;
	if (tempCssClass === undefined) { tempCssClass = "blackandwhite"; }
	tempCssClass = `rounded p-2 m-2 border ${tempCssClass}`;
	return (
		<div className="card bg-dark">
			{/* Figure out how Bootstrap cards really work */}
			<div className="card-body">
				<h2 id="display-category" className={tempCssClass}>
					{questionCategory.title}
				</h2>
				<p className="card-text" id="display-question">{questionText}</p>
				{answerButtons}
			</div>
		</div>

	);
}