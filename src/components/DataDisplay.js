export default function DataDisplay(props) {
	// const nothing = "position-fixed bottom-0";
	const currentPhase = props.gameState.currentPhase;
	console.log(`props.gameState.currentPlayerIndex = ${props.gameState.currentPlayerIndex}`);
	const currentPlayer = props.gameState.players[props.gameState.currentPlayerIndex];
	return( 
	<h3 className="border border-success w-100 border-3 bg-black p-3">
		Player: {currentPlayer.name}, Phase: {currentPhase.title}
		</h3>
	// <p>{gameState.currentPhase.description}</p>
	)
}