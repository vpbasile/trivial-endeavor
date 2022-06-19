export default function DataDisplay(props) {
	const gamePhase = props.gamePhase;
	const currentPlayerIndex = gamePhase.currentPlayerIndex;
	const scoreState = props.scoreState;
	const currentPlayer = scoreState[currentPlayerIndex];
	function toggleDevMode() { props.setDevMode(!props.devMode) }
	
	function returnStuff() {
		const contents = (
			<div className="form-check form-switch">
				<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={props.devMode} onClick={toggleDevMode} />
				<label className="form-check-label" htmlFor="flexSwitchCheckDefault">
					{props.devMode ? "Development Mode: On" : "Development Mode: Off"}
				</label>
				{/* {If devMode is on, then return the text} */}
				{props.devMode ? <div>
					<h3>Player: {currentPlayer.name}</h3>
					<h3>Phase: {gamePhase.currentPhase.title}</h3>
					<p>Choosing a category with development mode on will hide the values of the answer choices and will instead display which is the correct choice.</p>
				</div> : null}
			</div>
		)
		return contents
	}


	return (
		<div className="border border-success w-100 border-3 bg-black p-3">

			{returnStuff()}
		</div>
	)
}