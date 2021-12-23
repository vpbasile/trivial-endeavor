// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning

// The App.js file consists of three main parts: some import statements at the top, the App component in the middle, and an export statement at the bottom. Most React components follow this pattern.

// All React components must import the React module.
import React, { useState } from "react";
// I havent actually used nanoid, but it is installed.
// import { nanoid } from 'nanoid';

// <> Import my modules
import Question from "./components/Question";
import CategoryRow from './components/CategoryRow';

function App(props) {
  const categoryList = props.categoryList;
  const phases = props.phases;

  // Initialize the players and their scores
  var players = [
    { name: "Pat", correctCategories: [] },
    { name: "Chris", correctCategories: [] }
  ]

  const placeholder = "Select a category to begin."

  // Initialize the question and answer choices
  const [currentQuestion, setCurrentQuestion] = useState({
      questionText: placeholder,
      choices: [placeholder, placeholder, placeholder, placeholder],
      correctAnswer: "data.correctAnswer",
      correctIndex: 0,
      categoryTag: props.categoryList[0].queryTag
    });
  // Initialize the game state
  const [gameState, updateGameState] = useState({
    players,
    currentPlayerIndex: 0,
    // currentPhase: phases[0],
    currentCategory: categoryList[0]
  });

  // Spoof gamestate so that each player has already answered a category
  // gameState.players[0].correctCategories.push(gameState.categoryList[0].queryTag);
  // gameState.players[1].correctCategories.push(gameState.categoryList[5].queryTag);

  // Make the score board
  // console.log(`Category list: ${JSON.stringify(gameState.categoryList)}`);
  const scoreBoard = categoryList.map(category => (
    <CategoryRow key={category.key} category={category} gameState={gameState} updateGameState={updateGameState} currentQuestion={currentQuestion} setCurrentQuestion={setCurrentQuestion} categoryList={categoryList}/>)
  );
  return (
    <div className="App container">
      <div className="row">
        <div className="col">
          <h1>Trivial Endeavor</h1>
          <Question key={"currentQuestion"} currentQuestion={currentQuestion} gameState={gameState} categoryList={categoryList} handleGuess={props.handleGuess}/>
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
        </div>
      </div>
    </div>
  );
}

export default App;