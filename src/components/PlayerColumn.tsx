import React from 'react';
import { category, fixMeLater, player } from '../dataStructures';
import CategorySelect from './CategorySelect';

type PlayerColumnProps = {
	winners: any;
	setWinners: any;
	hasWon: any;
	playoffs: any;
	setPlayoffs: any;
	whatsHappening: any;
	currentCategory: any;
	currentQuestion: any;
	setCurrentQuestion: any;
	guessedState: any;
	setGuessedState: any;
	devMode: boolean;
	categoryList: category[],
	scoreState: player[]
	setwhatsHappening: fixMeLater,
	player: player,
	phases: fixMeLater,
	setCurrentCategory: fixMeLater
}

export default function PlayerColumn(props: PlayerColumnProps) {
	const categoryList = props.categoryList;
	const scoreState = props.scoreState;
	// const whatsHappening = props.whatsHappening;
	const setwhatsHappening = props.setwhatsHappening;
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
							// <><><> Dev mode stuff
							devMode={props.devMode}
							// <><><> What's happening
							whatsHappening={props.whatsHappening} setwhatsHappening={setwhatsHappening}
							currentQuestion={props.currentQuestion} setCurrentQuestion={props.setCurrentQuestion}
							scoreState={scoreState}
							guessedState={props.guessedState} setGuessedState={props.setGuessedState}
							// <><><> Winning
							playoffs={props.playoffs} setPlayoffs={props.setPlayoffs}
							winners={props.winners} setWinners={props.setWinners}
							hasWon={props.hasWon}
							// <><><> Game Globals
							categoryList={categoryList}
							phases={props.phases}
							// <><><> Question Globals
							// <><><> Player and category we're iterating on 
							category={category}
							player={player}

							// <><><> Derivative values
						/>
					);
				} else { return null; }
			}
			)}
		</div>
	)
}

