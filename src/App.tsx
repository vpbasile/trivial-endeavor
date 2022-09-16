import React, { useState } from "react";
import logo from './svg/trivialEndeavorLogo0.svg';

// Import my utility modules and data structures
import ErrorBoundary from './components/ErrorBoundary';
import { fixMeLater, category, player, whatsHappening, question } from './dataStructures';

// <> Import my modules
import GameSetup from './components/GameSetup';
import Question from "./components/Question";
import DataDisplay from './components/DataDisplay';
import PlayerColumn from './components/PlayerColumn';
import Hyperlink from './components/Hyperink';

var players: player[] = [
  { index: 0, name: "Player 1", correctCategories: [] }
]

type AppProps = { categoryList: category[], neededToWin: number, phases: fixMeLater }

export default function App(props: AppProps): JSX.Element {
  // <> Load the globals
  const categoryList = props.categoryList;
  const phases = props.phases;
  // Create the states for the game
  const [winners, setWinners] = useState([]);
  function hasWon(playerIndex: number) { return winners.findIndex(element => element === playerIndex) }
  const [playoffs, setPlayoffs] = useState([]);
  const [devMode, setDevMode] = useState(false);
  function toggleDevMode() { setDevMode(!devMode) }
  function neededToWin(devMode: boolean): number {
    if (devMode) { return 2 }
    else { return props.neededToWin; }
  }
  const [guessedState, setGuessedState] = useState(false);
  const [scoreState, setScoreState] = useState<player[]>(players);
  const [whatsHappening, setwhatsHappening] = useState<whatsHappening>({ currentPhase: phases[0], currentPlayerIndex: 0 });
  // Initialize the question and answer choices
  const [currentCategory, setCurrentCategory] = useState(categoryList[0]);
  const blankQuestion: question = { questionText: null, choices: [null, null, null, null], correctAnswer: null, correctIndex: 0, categoryTag: categoryList[0].queryTag, guessEntered: 0 };
  const [currentQuestion, setCurrentQuestion] = useState<question>(blankQuestion);

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
            players={players}
            // handleGuess={props.handleGuess}
            categoryList={categoryList}
            neededToWin={neededToWin(devMode)}
            phases={phases}
            whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
            scoreState={scoreState} setScoreState={setScoreState}
            winners={winners} setWinners={setWinners}
            hasWon={hasWon}
            playoffs={playoffs} setPlayoffs={setPlayoffs}
            currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
            currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
            guessedState={guessedState} setGuessedState={setGuessedState}
            devMode={devMode} currentPlayerIndex={whatsHappening.currentPlayerIndex} questionCategoryTag={currentQuestion.categoryTag} />
          <GameSetup
            phases={phases}
            whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
            scoreState={scoreState} setScoreState={setScoreState}
            currentPlayerIndex={whatsHappening.currentPlayerIndex}
          // devMode={devMode}
          />
        </div>
      </ErrorBoundary>
    </div>
    <div id="scoreboard-row" className="row" >
      <ErrorBoundary>
        {
          scoreState.map(player => (
            <PlayerColumn
              key={player.name + "playerColumn"}
              player={player}
              categoryList={categoryList}
              scoreState={scoreState}
              phases={phases}
              whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
              winners={winners} setWinners={setWinners}
              hasWon={hasWon}
              playoffs={playoffs} setPlayoffs={setPlayoffs}
              currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
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
            scoreState={scoreState} setScoreState={setScoreState}
            phases={phases}
            whatsHappening={whatsHappening} setwhatsHappening={setwhatsHappening}
            currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
            currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
            guessedState={guessedState} setGuessedState={setGuessedState}
            devMode={devMode} toggleDevMode={toggleDevMode}
            categoryList={categoryList}
          />
        </ErrorBoundary>

      </div>
    </div>
  </div >
  );
}