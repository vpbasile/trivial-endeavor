export default function DataDisplay(props) {
	const players = props.players;
	const gamePhase = props.gamePhase;
	// console.log(`gamePhase = ${JSON.stringify(gamePhase)}`);
	const currentPlayerIndex = gamePhase.currentPlayerIndex;
	const currentPlayer = players[currentPlayerIndex];
	// console.log(`currentPlayer = ${JSON.stringify(currentPlayer)}`);
	return (
		<h3 className="border border-success w-100 border-3 bg-black p-3">
			Player: {currentPlayer.name}, Phase: {gamePhase.currentPhase.title}
		</h3>
	)
}