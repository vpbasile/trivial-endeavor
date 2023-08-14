import React, { useState } from "react";
import logo from './svg/trivialEndeavorLogo0.svg';

// Import my utility modules and data structures
import ErrorBoundary from './components/ErrorBoundary';
import { category, player, whatsHappening, question, phaseDefinition } from './dataStructures';

// <> Import my modules
import GameSetup from './components/GameSetup';
import Question from "./components/Question";
import DataDisplay from './components/DataDisplay';
import PlayerColumn from './components/PlayerColumn';
import Hyperlink from './components/Hyperink';

let players: player[] = [
  { index: 0, name: "Player 1", correctCategories: [] }
]

type AppProps = { categoryList: category[], neededToWin: number, phases: phaseDefinition[] }

export default function App(props: AppProps): JSX.Element {

  // <><><> Game Globals
  const categoryList = props.categoryList;
  const phases = props.phases;
  // <><><> Dev mode stuff
  const [devMode, setDevMode] = useState(false);
  function toggleDevMode() {
    setDevMode(!devMode)
    devMode ? console.log("Dev mode off") : console.log("Dev mode on")
  }
  function neededToWin(devMode: boolean): number {
    if (devMode) { return 2 }
    else { return props.neededToWin; }
  }
  // <><><> What's happening
  const [whatsHappening, setwhatsHappening] = useState<whatsHappening>({ currentPhase: phases[0], currentPlayerIndex: 0 });
  const blankQuestion: question = { questionText: null, choices: ["", "", "", ""], correctAnswer: null, correctIndex: 0, categoryTag: categoryList[0].queryTag, guessEntered: 0 };
  const [currentQuestion, setCurrentQuestion] = useState<question>(blankQuestion);
  // <><><> Winning
  const [winners, setWinners] = useState<number[]>([]);
  function hasWon(playerIndex: number): number {
    const index = winners.findIndex(element => element === playerIndex);
    if (index) return index
    else return -1
  }
  // <> Create the states for the game
  const [guessedState, setGuessedState] = useState(false);
  const [scoreState, setScoreState] = useState<player[]>(players);

  return (<div className="App container" >
    <div id="logo-row" className="row" >
      <div className="col-12 text-center" >
        <img src={logo} className="App-logo w-75 py-5" alt="Trivial Endeavor logo" />
        <p className="fancy-font">by <a href="https://www.schmincenzo.com" target="_blank" rel="noopener noreferrer">Schmincenzo</a></p>
      </div>
    </div>
    <div id="gameBoard-row" className="row" >
      <ErrorBoundary>
        <div className="col-12" >
          <Question key={"currentQuestion"}
            // <><><> Dev mode stuff
            devMode={devMode}
            neededToWin={neededToWin(devMode)}
            // <><><> What's happening
            whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
            currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
            questionCategoryTag={currentQuestion.categoryTag}
            scoreState={scoreState} setScoreState={setScoreState}
            guessedState={guessedState} setGuessedState={setGuessedState}
            // <><><> Winning
            winners={winners} setWinners={setWinners}
            hasWon={hasWon}
            // <><><> Game Globals
            categoryList={categoryList}
            phases={phases}
          />
          <GameSetup
            // <><><> What's happening
            whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
            scoreState={scoreState} setScoreState={setScoreState}

            // <><><> Game Globals
            phases={phases}
          />
        </div>
      </ErrorBoundary>
    </div>
    <div id="scoreboard-row" className="row" >
      <ErrorBoundary>
        {
          scoreState.map((player,index) => (
            <PlayerColumn
              key={player.name + "playerColumn"}
              player={player}
              categoryList={categoryList}
              scoreState={scoreState}
              phases={phases}
              whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
              winners={winners} setWinners={setWinners}
              hasWon={hasWon(index)}
              currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
              guessedState={guessedState} setGuessedState={setGuessedState}
              devMode={devMode} />))
        }
      </ErrorBoundary>
    </div>
    <div id="footer-row" className="row">
      < div id='credits-col' className="col-12 border border-1 p-3 mt-5">
        <h3>Links</h3>
        <Hyperlink url="https://vpbasile.github.io/trivial-endeavor" text="Live version" />
        <Hyperlink url="https://github.com/vpbasile/trivial-endeavor" text="Repository on GitHub" />
        <Hyperlink url="https://the-trivia-api.com/" text="The Trivia API by Will Fry" />
      </div>
      <div id="dev-col" className="col-12 border border-1 p-3 my-5" >
        < ErrorBoundary >
          <DataDisplay
            players={players}
            scoreState={scoreState}
            whatsHappening={whatsHappening}
            devMode={devMode} toggleDevMode={toggleDevMode}
          />
        </ErrorBoundary>

      </div>
    </div>
  </div >
  );
}