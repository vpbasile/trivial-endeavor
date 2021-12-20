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

function initGame() {
  var gameState = {
    currentCategory: {},
    currentQuestion: { question: "", answers: [], correctIndex: 0 },
    currentPlayerIndex: 0,
    players: ["Calvin", "Hobbes"],
    categoryList: [
      { key: "01", queryTag: "food_and_drink", title: "Food & Drink", cssClass: "cat-food" },
      { key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure", cssClass: "cat-sport" },
      { key: "08", queryTag: "science", title: "Science", cssClass: "cat-science" },
      { key: "04", queryTag: "history", title: "History", cssClass: "cat-history" },
      { key: "02", queryTag: "geography", title: "Geography", cssClass: "cat-geography" },
      { key: "06", queryTag: "movies", title: "Movies", cssClass: "cat-movies" },
      { key: "07", queryTag: "music", title: "Music", cssClass: "cat-music" },
      { key: "03", queryTag: "general_knowledge", title: "General Knowledge", cssClass: "cat-general" }
    ]
  }
  return gameState;
}

function App(props) {

  var gameState = initGame();

  // Make answer buttons
  var answerButtons = [0, 1, 2, 3].map(function (buttonIndex) {
    return <AnswerButton key={buttonIndex} buttonIndex={buttonIndex} cssClass={`btn w-100 my-2 blackandwhite`} gameState={gameState} />
  });

  // Make the score board
  const scoreBoard = gameState.categoryList.map(category => (
    <CategoryRow key={category.key} category={category} queryTag={category.queryTag} title={category.title} cssClass={category.cssClass} gameState={gameState} />)
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