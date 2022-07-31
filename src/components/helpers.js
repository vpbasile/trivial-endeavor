function nextPlayer(current, playerCount) {
	console.log(`Finding next player`)
	for (let i = 1; i < playerCount; i++) {
		current = (current + 1) % playerCount;
		if (players[current].score < 7) { return current; }

	}
	return current;
	console.log(`Next player: ${current}`)
}