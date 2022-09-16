import React from "react";
import { category, fixMeLater, phaseDefinition, player, whatsHappening } from "../dataStructures"

type DataDisplayProps = {
	players: player[],
	scoreState: player[], setScoreState: fixMeLater,
	phases: phaseDefinition[]
	whatsHappening: whatsHappening, setwhatsHappening: fixMeLater,
	currentCategory: category, setCurrentCategory: fixMeLater,
	currentQuestion: fixMeLater, setCurrentQuestion: fixMeLater,
	guessedState: fixMeLater, setGuessedState: fixMeLater,
	devMode: fixMeLater, toggleDevMode: fixMeLater,
	categoryList: fixMeLater
}

export default function DataDisplay(props: DataDisplayProps) {
	const whatsHappening = props.whatsHappening;
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const scoreState = props.scoreState;
	const currentPlayer = scoreState[currentPlayerIndex];
	const devMode = props.devMode;
	const toggleDevMode = props.toggleDevMode

	return (<div className="border border-success w-100 border-3 bg-black p-3">
		<div className="form-check form-switch">
			<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={devMode} onClick={toggleDevMode} />
			<label className="form-check-label" htmlFor="flexSwitchCheckDefault">
				{devMode ? "Development Mode: On" : "Development Mode: Off"}
			</label>
			{/* {If devMode is on, then return the text} */}
			{devMode ? (<div>
				<h3>Player: {currentPlayer.name}</h3>
				<h3>Phase: {whatsHappening.currentPhase.title}</h3>
				<p>Choosing a category with development mode on will hide the values of the answer choices and will instead display which is the correct choice.</p>
			</div>) : null}
		</div>
	</div>)
}