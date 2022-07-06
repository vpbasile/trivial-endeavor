// The App.js file consists of three main parts: some import statements at the top, the App component in the middle, and an export statement at the bottom. Most React components follow this pattern.

import logo from './svg/trivialEndeavorLogo0.svg';

// All React components must import the React module.
import React, { useState } from "react";

// Import my utility modules
import ErrorBoundary from './components/ErrorBoundary';

// <> Import my modules
import GameSetup from './components/GameSetup';
import Question from "./components/Question";
import DataDisplay from './components/DataDisplay';
import PlayerColumn from './components/PlayerColumn';
import Hyperlink from './components/Hyperink';

var players = [
  { index: 0, name: "Player 1", correctCategories: [] }
]

// Initialize the question and answer choices
function App(props) {
  const globals = props.globals;
  const categoryList = globals.categoryList;
  const phases = globals.phases;
  const [devMode, setDevMode] = useState(false);
  const [guessedState, setGuessedState] = useState(false);
  const [scoreState, setScoreState] = useState(players);
  const [gamePhase, setGamePhase] = useState({ currentPhase: phases[0], currentPlayerIndex: 0 });
  const [currentCategory, setCurrentCategory] = useState(categoryList[0]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: null,
    choices: [null, null, null, null],
    correctAnswer: null,
    correctIndex: null,
    categoryTag: categoryList[0].queryTag,
    guessEntered: ""
  });

  return (
    <div className="App container">
      <div id="logo-div" className="row">
        <div className="col-12 text-center">
          <img src={logo} className="App-logo w-75 py-5" alt="Trivial Endeavor logo" />
        </div>
      </div>
      <div className="row">
        <ErrorBoundary>
          <div id="gameBoard-div" className="row">
            <div className="col-12">
              <Question key={"currentQuestion"}
                players={players}
                handleGuess={props.handleGuess}
                categoryList={categoryList}
                phases={phases}
                gamePhase={gamePhase} setGamePhase={setGamePhase}
                scoreState={scoreState} setScoreState={setScoreState}
                currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
                currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                guessedState={guessedState} setGuessedState={setGuessedState}
              />
            </div>
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="scoreboard-div" className="row">
            <ErrorBoundary>
              <GameSetup
                globals={globals}
                phases={phases}
                gamePhase={gamePhase} setGamePhase={setGamePhase}
                scoreState={scoreState} setScoreState={setScoreState}
                currentPlayerIndex={gamePhase.currentPlayerIndex}
                devMode={devMode}
              />
            </ErrorBoundary>
            {scoreState.map(player => {
              return (
                <PlayerColumn
                  key={player.name + "playerColumn"}
                  players={players}
                  player={player}
                  categoryList={categoryList}
                  scoreState={scoreState}
                  phases={phases}
                  gamePhase={gamePhase} setGamePhase={setGamePhase}
                  currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
                  currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
                  guessedState={guessedState} setGuessedState={setGuessedState}
                  devMode={devMode} setDevMode={setDevMode}
                />)
            })}
          </div>
        </ErrorBoundary>
        <div id='credits-div' className="col-12">
          <Hyperlink url="https://vpbasile.github.io/trivial-endeavor-react/index.html" text="Live version" />
          <Hyperlink url="https://github.com/vpbasile/trivial-endeavor-react" text="Repository on GitHub" />
          <Hyperlink url="https://the-trivia-api.com/" text="The Trivia API by Will Fry" />
        </div>
        <ErrorBoundary>
          <div id="dev-div" className="col-12">
            <DataDisplay
              players={players}
              scoreState={scoreState} setScoreState={setScoreState}
              phases={phases}
              gamePhase={gamePhase} setGamePhase={setGamePhase}
              currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
              currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
              guessedState={guessedState} setGuessedState={setGuessedState}
              devMode={devMode} setDevMode={setDevMode}
              categoryList={categoryList}
            />
          </div>
        </ErrorBoundary>
      </div>
    </div >
  );
}

export default App;