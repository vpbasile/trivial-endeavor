import React, { Dispatch } from 'react';
import { category, phaseDefinition, player, questionInternal, whatsHappening, winners } from '../dataStructures';
import CategorySelect from './CategorySelect';

type PlayerColumnProps = {
	// <><><> Dev mode stuff
	devMode: boolean;
	// <><><> What's happening
	whatsHappening: whatsHappening; setwhatsHappening: Dispatch<whatsHappening>,
	currentQuestion: questionInternal; setCurrentQuestion: Dispatch<questionInternal>;
	scoreState: player[]
	guessedState: boolean; setGuessedState: Dispatch<boolean>;
	// <><><> Winning
	vyingForPlace: winners, SETvyingForPlace: Dispatch<winners>;
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
	const currentQuestion = props.currentQuestion; const setCurrentQuestion = props.setCurrentQuestion;
	const scoreState = props.scoreState;
	const guessedState = props.guessedState; const setGuessedState = props.setGuessedState;
	// <><><> Winning
	const vyingForPlace = props.vyingForPlace; const SETvyingForPlace = props.SETvyingForPlace;
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
							vyingForPlace={vyingForPlace}
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

