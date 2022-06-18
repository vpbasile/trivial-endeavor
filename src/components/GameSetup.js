import React from 'react';

export default function GameSetup(props) {
	const gamePhase = props.gamePhase;
	const setGamePhase = props.setGamePhase;
	const currentPlayerIndex = props.currentPlayerIndex;
	const scoreState = props.scoreState;
	const setScoreState = props.setScoreState;
	const phases = props.phases;
	const devMode = props.devMode;

	const playerCount = scoreState.length;
	const columnSize = 12 / playerCount;

	// console.log("gamePhase: " + JSON.stringify(gamePhase));

	let namefields = scoreState.map(player => {
		return (
			<div className="form-group row" key={player.name + "namefield"}>
				<div className={"col-" + columnSize + " py-2 my-2"} id=''><label htmlFor={player.name + "name"}>{player.name}</label></div>
				{/* <input type="text" className="form-control" id={player.name + "name"} placeholder={player.name} onChange={(e) => { console.log(`${player.index}. ${e.target.value}`); />*/}

			</div>
		);

	});

	let addButton
	if (scoreState.length < 4) {
		addButton =
			<button className={`rounded py-2 my-2 border btn cat-history w-100`} type="button" onClick={() => setScoreState(
				// Add another player to the scoreState array
				[...scoreState, {
					index: scoreState.length, name: "Player " + (scoreState.length + 1),
					correctCategories: []
				}]
			)}>Add another player</button>
	} else { addButton = null; }

	if ((devMode) || (gamePhase.currentPhase.title === "Welcome")) {
		return (<div>
			<h2>Set up the game</h2>
			{namefields}
			{addButton}
			<input className={`rounded py-2 my-2 border btn cat-sport w-100`} type="button" value={`Begin Game`} onClick={() => {
				console.log("Begin game");
				console.log("scoreState: " + JSON.stringify(scoreState));
				setGamePhase({
					currentPhase: phases.find(phase => phase.title === "Select"),
					currentPlayerIndex: currentPlayerIndex
				});
			}
			} />

		</div>);
	} else return null;

}