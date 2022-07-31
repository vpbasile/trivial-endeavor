import React from 'react';
import CategorySelect from './CategorySelect';

export default function PlayerColumn(props) {
	const categoryList = props.categoryList;
	const scoreState = props.scoreState;
	// const gamePhase = props.gamePhase;
	const setGamePhase = props.setGamePhase;
	const player = props.player;

	const playerCount = scoreState.length;
	const columnSize = 12 / playerCount;

	return (
		<div className={"col-lg-" + columnSize + " py-2 my-2 bg-dark bg-opacity-50"} id=''>
			<input className="w-100 text-wrap py-1 my-1 playerBadge" type="button" value={player.name} disabled={true} />
			{categoryList.map(category => {
				if (category.queryTag !== "none") {
					return (
						<CategorySelect
							key={category.key}
							category={category}
							categoryList={categoryList}
							player={player}
							players={props.players}
							phases={props.phases} setGamePhase={setGamePhase}
							scoreState={scoreState}
							winners={props.winners} setWinners={props.setWinners}
							hasWon={props.hasWon}
							playoffs={props.playoffs} setPlayoffs={props.setPlayoffs}
							gamePhase={props.gamePhase}
							currentCategory={props.currentCategory}
							currentQuestion={props.currentQuestion} setCurrentQuestion={props.setCurrentQuestion}
							guessedState={props.guessedState} setGuessedState={props.setGuessedState}
							devMode={props.devMode}
						/>
					);
				} else { return null; }
			}
			)}
		</div>
	)
}

