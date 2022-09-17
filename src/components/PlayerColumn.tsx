import React, { Dispatch } from 'react';
import { category, phaseDefinition, player, question, whatsHappening } from '../dataStructures';
import CategorySelect from './CategorySelect';

type PlayerColumnProps = {
	// <><><> Dev mode stuff
	devMode: boolean;
	// <><><> What's happening
	whatsHappening: whatsHappening; setwhatsHappening: Dispatch<whatsHappening>,
	currentQuestion: question; setCurrentQuestion: Dispatch<question>;
	scoreState: player[]
	guessedState: boolean; setGuessedState: Dispatch<boolean>;
	// <><><> Winning
	winners: number[]; setWinners: Dispatch<number[]>;
	hasWon: (playerIndex: number)=>{};
	// <><><> Game Globals
	categoryList: category[],
	phases: phaseDefinition[],
	// <><><> Question Globals
	player: player,
	// <><><> Derivative values
}

export default function PlayerColumn(props: PlayerColumnProps) {
	// <><><> Dev mode stuff
	const devMode = props.devMode;
	// <><><> What's happening
	const whatsHappening = props.whatsHappening; const setwhatsHappening = props.setwhatsHappening;
	const currentQuestion = props.currentQuestion;const setCurrentQuestion = props.setCurrentQuestion;
	const scoreState = props.scoreState;
	const guessedState = props.guessedState; const setGuessedState = props.setGuessedState;
	// <><><> Winning
	const winners = props.winners; const setWinners = props.setWinners;
	const hasWon = props.hasWon;
	// <><><> Game Globals
	const categoryList = props.categoryList;
	const phases = props.phases;
	// <><><> Question Globals
	const player = props.player;
	// <><><> Derivative values
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
							devMode={devMode}
							// <><><> What's happening
							whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
							currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
							scoreState={scoreState}
							guessedState={guessedState} setGuessedState={setGuessedState}
							// <><><> Winning
							// playoffs={props.playoffs} setPlayoffs={props.setPlayoffs}
							winners={winners} setWinners={setWinners}
							hasWon={hasWon}
							// <><><> Game Globals
							categoryList={categoryList}
							phases={phases}
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

