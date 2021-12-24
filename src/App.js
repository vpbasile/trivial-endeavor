// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning

// The App.js file consists of three main parts: some import statements at the top, the App component in the middle, and an export statement at the bottom. Most React components follow this pattern.

// All React components must import the React module.
import React, { useState } from "react";
// I havent actually used nanoid, but it is installed.
// import { nanoid } from 'nanoid';

// <> Import my modules
import Question from "./components/Question";
import CategorySelect from './components/CategorySelect';
import DataDisplay from './components/DataDisplay';
import ErrorBoundary from './components/ErrorBoundary';

function App(props) {
  const globals = props.globals;
  const categoryList = globals.categoryList;
  const phases = globals.phases;
  // Initialize the players and their scores
  var players = [
    { name: "Player A", correctCategories: [] },
    { name: "Player B", correctCategories: [] }
  ]

  // Spoof gamestate so that each player has already answered a category
  // players[0].correctCategories.push(randomCategory().queryTag);
  // players[1].correctCategories.push(randomCategory().queryTag);
  // function randomCategory(){
  //   var randomIndex = Math.floor(Math.random() * categoryList.length);
  //   return categoryList[randomIndex];
  // }

  const placeholder = "Select a category to begin."

  // Initialize the game state
  const [guessedState, setGuessedState] = useState(false);
  const [scoreState, setScoreState] = useState({ players });
  const [gamePhase, setGamePhase] = useState({ currentPhase: phases[0], currentPlayerIndex: 0 });
  // const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(categoryList[0]);
  // Initialize the question and answer choices
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: placeholder,
    choices: [placeholder, placeholder, placeholder, placeholder],
    correctAnswer: "data.correctAnswer",
    correctIndex: 0,
    categoryTag: categoryList[0].queryTag
  });

  // Make the score board
  // console.log(`Category list: ${JSON.stringify(gameState.categoryList)}`);
  const scoreBoard = categoryList.map(category => (
    <CategorySelect key={category.key}
      category={category}
      categoryList={categoryList}
      players={players}
      scoreState={scoreState} setScoreState={setScoreState}
      gamePhase={gamePhase} setGamePhase={setGamePhase}
      // currentPlayerIndex={currentPlayerIndex} setCurrentPlayerIndex={setCurrentPlayerIndex}
      currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
      currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
      guessedState={guessedState} setGuessedState={setGuessedState}
    />)
  );

  return (
    <div className="App container">
      <div className="row">
        <ErrorBoundary>
          <div id="gameBoard-div" className="col-12">
            <h1>Trivial Endeavor</h1>
            <Question key={"currentQuestion"}
              players={players}
              handleGuess={props.handleGuess}
              categoryList={categoryList}
              scoreState={scoreState} setScoreState={setScoreState}
              gamePhase={gamePhase} setGamePhase={setGamePhase}
              // currentPlayerIndex={currentPlayerIndex} setCurrentPlayerIndex={setCurrentPlayerIndex}
              currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
              currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
              guessedState={guessedState} setGuessedState={setGuessedState} />
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="phase-div" className="col">
            {/* <DataDisplay
              players={players}
              scoreState={scoreState} setScoreState={setScoreState}
              gamePhase={gamePhase} setGamePhase={setGamePhase}
              // currentPlayerIndex={currentPlayerIndex} setCurrentPlayerIndex={setCurrentPlayerIndex}
              currentCategory={currentCategory} setCurrentCategory={setCurrentCategory}
              currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion}
              guessedState={guessedState} setGuessedState={setGuessedState} /> */}
          </div>
        </ErrorBoundary>
        <ErrorBoundary>
          <div id="scoreboard-div">
            <table id="scoreboard" className="table text-light">
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Player 1</th>
                  <th>Player 2</th>
                </tr>
              </thead>
              <tbody>
                {scoreBoard}
              </tbody>
            </table>
          </div>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;