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
				<div className={"col-12 py-1 my-1"} id=''>
					<label htmlFor={player.name + "name"}>{player.name}</label>
					{/* <input type="text" className="form-control" id={player.name + "name"} placeholder={player.name} onChange={(e) => { console.log(`${player.index}. ${e.target.value}`); />*/}
				</div>
			</div>
		);

	});

	let addButton =
		<button className={`rounded py-2 my-2 border btn cat-sport w-100`} type="button" disabled={!(scoreState.length < 4)} onClick={() => setScoreState(
			// Add another player to the scoreState array
			[...scoreState, {
				index: scoreState.length, name: "Player " + (scoreState.length + 1),
				correctCategories: []
			}]
		)}>Add another team</button>

	let removeButton
	removeButton =
		<button className={`rounded py-2 my-2 border btn cat-geography w-100`} type="button" disabled={scoreState.length === 1}
			onClick={() => setScoreState(
				// Remove the last player from the scoreState array
				scoreState.slice(0, scoreState.length - 1)
			)}>Remove a team</button>

	let startButton =
		<button className={`rounded py-2 my-2 border btn btn-light w-100`} type="button" onClick={() => {
			console.log("Begin game");
			setGamePhase({
				currentPhase: phases.find(phase => phase.title === "Select"),
				currentPlayerIndex: currentPlayerIndex
			});
		}}>Begin Game</button>

	if (gamePhase.currentPhase.title === "Welcome") {
		return (<div className='row py-5 bg-dark bg-opacity-50'>
			<div id="playerList-div" className="col-md-6 text-center">
				<h2 id="display-category">You can play with up to 4 teams.</h2>
				{namefields}
			</div>
			<div className="col-md-6">
				{removeButton}
				{startButton}
				{addButton}

			</div>

		</div>);
	} else return null;

}