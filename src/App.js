// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning

// The App.js file consists of three main parts: some import statements at the top, the App component in the middle, and an export statement at the bottom. Most React components follow this pattern.

// All React components must import the React module.
import React, { useState } from "react";

// <> Import my modules
import Question from "./components/Question";
// import CategorySelect from './components/CategorySelect';
import DataDisplay from './components/DataDisplay';
import ErrorBoundary from './components/ErrorBoundary';
import PlayerColumn from './components/PlayerColumn';
import GameSetup from './components/GameSetup';
var players = [
  { index: 0, name: "Player 1", correctCategories: [] }
  // ,
  // { index: 1, name: "Park", correctCategories: [] },
  // { index: 2, name: "Vincent", correctCategories: [] },
  // { index: 3, name: "Rick", correctCategories: [] }
]
// const playerCount = players.length;

const placeholder = "Select a category to begin."
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
    questionText: placeholder,
    choices: [placeholder, placeholder, placeholder, placeholder],
    correctAnswer: "data.correctAnswer",
    correctIndex: 0,
    categoryTag: categoryList[0].queryTag,
    guessEntered: ""
  });

  return (
    <div className="App container">
      <div id="logo-div" className="row">
        <div className="col-12">
          <h1><input id='logo' className="text-wrap rounded py-2 my-2 border w-100 btn btn-dark" type="button" value="Trivial Endeavor" /></h1>
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
        <div id='credits-div' className="col-12">
          <div className="col">
            <h4><a href="https://vpbasile.github.io/trivial-endeavor-react/index.html">Live version</a></h4>
            <h4><a href="https://github.com/vpbasile/trivial-endeavor-react">Repository on github</a></h4>
            <h4><a href="https://the-trivia-api.com/">The Trivia API</a></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;