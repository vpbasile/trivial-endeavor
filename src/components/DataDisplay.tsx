import React from "react";
import { player, whatsHappening } from "../dataStructures"

type DataDisplayProps = {
	// <><><> Dev mode stuff
	devMode: boolean, toggleDevMode: () => void,
	// <><><> What's happening
	whatsHappening: whatsHappening,
	scoreState: player[],
	// <><><> Derivative values
	players: player[],
	// <><> Children
	children?: any
}

export default function DataDisplay(props: DataDisplayProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode; const toggleDevMode = props.toggleDevMode
	// <><><> What's happening
	const whatsHappening = props.whatsHappening;
	const scoreState = props.scoreState;

	// <><><> Derivative values
	const currentPlayerIndex = whatsHappening.currentPlayerIndex;
	const currentPlayer = scoreState[currentPlayerIndex];

	return (<div className="">
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
				{props.children}
			</div>) : null}
		</div>
	</div>)
}