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
				<div className={"col-" + columnSize + " py-1 my-1"} id=''>
					<label htmlFor={player.name + "name"}>{player.name}</label>
					{/* <input type="text" className="form-control" id={player.name + "name"} placeholder={player.name} onChange={(e) => { console.log(`${player.index}. ${e.target.value}`); />*/}
				</div>
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
			)}>Add another team</button>
	} else { addButton = null; }

	if ((devMode) || (gamePhase.currentPhase.title === "Welcome")) {
		return (<div className='row py-5'>
			<div id="playerList-div" className="col-md-6 text-center">
				<h2 id="display-category">How many teams are playing?</h2>
				
					{namefields}
			</div>
			<div className="col-md-6">
				{addButton}
				<input className={`rounded py-2 my-2 border btn cat-science w-100`} type="button" value={`Begin Game`} onClick={() => {
					console.log("Begin game");
					console.log("scoreState: " + JSON.stringify(scoreState));
					setGamePhase({
						currentPhase: phases.find(phase => phase.title === "Select"),
						currentPlayerIndex: currentPlayerIndex
					});
				}
				} />
			</div>

		</div>);
	} else return null;

}