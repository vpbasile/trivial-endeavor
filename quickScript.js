const players = [{"index":0,"name":"Player A","correctCategories":["science","history","movies","general_knowledge"]},{"index":1,"name":"Player B","correctCategories":["general_knowledge"]}]

players.map(player => {
	console.log(`Player: ${player.name}`)
	var score=player.correctCategories.length
	console.log(`Score: ${score}`)
	player.correctCategories.map(category => {
		console.log(`Category: ${category}`)
		return true
	})
	return true
})