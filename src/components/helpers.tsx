export function nextPlayer(current: number, playerCount: number, neededToWin:number, scoreState: any[]): number {
	// let foundPlayer = null;
	console.log(`Finding next player`)
	for (let i = 1; i < playerCount; i++) {
		let nextPlayerIndex = (current + i) % playerCount;
		const thatPlayer = scoreState[nextPlayerIndex];
		const thatPlayerScore = (thatPlayer.correctCategories).length;
		console.log(`Should ${thatPlayer.name} be next?  Their score is ${thatPlayerScore}/${neededToWin}`);
		if (thatPlayerScore < neededToWin) {
			console.log(`${thatPlayer.name} is next.`)
			return nextPlayerIndex;
		}
	}
	return (current + 1) % playerCount;

}