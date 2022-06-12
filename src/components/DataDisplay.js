export default function DataDisplay(props) {
	const players = props.players;
	const gamePhase = props.gamePhase;
	// console.log(`gamePhase = ${JSON.stringify(gamePhase)}`);
	const currentPlayerIndex = gamePhase.currentPlayerIndex;
	const currentPlayer = players[currentPlayerIndex];
	// console.log(`currentPlayer = ${JSON.stringify(currentPlayer)}`);
	function toggleDevMode() { props.setDevMode(!props.devMode) }
	function devModeText() {
		if (props.devMode) {
			return "Developer Mode: On";
		} else {
			return "Developer Mode: Off";
		}
	}
	return (
		<div className="border border-success w-100 border-3 bg-black p-3">
			<h3>Player: {currentPlayer.name}, Phase: {gamePhase.currentPhase.title}</h3>
			<div className="form-check form-switch">
				<input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={props.devMode} onClick={toggleDevMode}/>
					<label className="form-check-label" htmlFor="flexSwitchCheckDefault" >{devModeText()}</label>
			</div>
			{/* <div>
				<input type="text" className="rounded p-2 m-2 border w-100 bg-dark text-succcess" id="newPlayerText" value={"Add player"}/>
				
			</div> */}
		</div>
	)
}