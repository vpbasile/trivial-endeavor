import React from 'react';

export default function GameSetup(props){
	const gamePhase = props.gamePhase;
	const setGamePhase = props.setGamePhase;
	const currentPlayerIndex = props.currentPlayerIndex;
	const phases = props.phases;
	const devMode = props.devMode;
	
	console.log("gamePhase: " + JSON.stringify(gamePhase));

	if((devMode)||(gamePhase.currentPhase.title === "Welcome")) {
		return (<div>
			<h2>Set up the game</h2>
			<input className={`rounded py-2 my-2 border btn btn-dark w-100`} type="button" value={`Begin Game`} onClick={() => setGamePhase({currentPhase: phases.find(phase => phase.title === "Select"),
			currentPlayerIndex: currentPlayerIndex})} />
		
		</div>);
	} else return null;

}