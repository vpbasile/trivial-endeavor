export default function DataDisplay(props) {
	const currentPhase = props.gamePhase.currentPhase;
	console.log(`currentPhase = ${JSON.stringify(currentPhase)}`);
	const currentPlayerIndex = currentPhase.currentPlayerIndex;
	console.log(`currentPlayerIndex = ${currentPlayerIndex}`);
	const players = props.scoreState.players;
	console.log(`players = ${JSON.stringify(players)}`);
	const currentPlayer = players[currentPlayerIndex];
	console.log(`currentPlayer = ${JSON.stringify(currentPlayer)}`);
	return (
		<h3 className="border border-success w-100 border-3 bg-black p-3">
			Player: {currentPlayer.name}, Phase: {currentPhase.title}
		</h3>
	)
}