// https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_todo_list_beginning

// The App.js file consists of three main parts: some import statements at the top, the App component in the middle, and an export statement at the bottom. Most React components follow this pattern.

// All React components must import the React module.
import React from 'react';
// import React, { useState } from "react";
// I havent actually used nanoid, but it is installed.
// import { nanoid } from 'nanoid';

// <> Import my modules
import CategoryRow from './components/CategoryRow';
import AnswerButton from './components/AnswerButton';

var gameState = {
  currentCategory: {},
  currentQuestion: {question: "", answers: [], correctIndex: 0}
}

function App(props) {
  const categoryList = props.categoryList;
  gameState.players = props.players;
  
  // Initialize the state of the game.
  gameState.currentCategory = categoryList[0];

  // Make answer buttons
  var answerButtons = [1, 2, 3, 4];
  answerButtons = answerButtons.map(answerButton => (
    <AnswerButton key={answerButton} buttonIndex={answerButton} gameState={gameState} />
  )
  );

  // Make the score board
  const scoreBoard = categoryList.map(category => (
    <CategoryRow key={category.key} category={category} queryTag={category.queryTag} title={category.title} cssClass={category.cssClass} gameState={gameState}/>)
  );
  return (
    <div className="App container">
      <div className="row">
        <div className="col">
          <h1>Trivial Endeavor</h1>
          {/* <a href="file:///C:/xampp/htdocs/project-trivia0/index.html">Old Version</a> */}
          <div className="card bg-dark">
            <div className="card-body">
              <h5 id="display-category" className="rounded p-2 m-2 border border-light blackandwhite">No category selected</h5>
              <p className="card-text" id="display-question">Select a category to begin.</p>
              {answerButtons}
            </div>
          </div>
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