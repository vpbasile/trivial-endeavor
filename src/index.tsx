import React from 'react';
import ReactDOM from 'react-dom';

// <> Import my components
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// <> Stylesheets
import './css/bootstrap.css';
import './css/shape-size-font.css';
import './css/color-dark.css';
import './css/animation.css';

const categoryList = [
  { key: "00", queryTag: "none", title: "Select a category", cssClass: "blackandwhite" },
  { key: "01", queryTag: "food_and_drink", title: "Food & Drink", cssClass: "cat-food" },
  { key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure", cssClass: "cat-sport" },
  { key: "08", queryTag: "science", title: "Science", cssClass: "cat-science" },
  { key: "04", queryTag: "history", title: "History", cssClass: "cat-history" },
  { key: "02", queryTag: "geography", title: "Geography", cssClass: "cat-geography" },
  { key: "06", queryTag: "movies", title: "Film & TV", cssClass: "cat-movies" },
  { key: "07", queryTag: "music", title: "Music", cssClass: "cat-music" },
  { key: "03", queryTag: "general_knowledge", title: "General Knowledge", cssClass: "cat-general" },
]

const neededToWin = categoryList.length - 1;
// console.log(`Needed to win: ${neededToWin}`);

const phases = [
  { key: "00", title: "Welcome" },
  { key: "02", title: "Select", index: 2 },
  { key: "04", title: "Question", index: 4 },
  { key: "06", title: "Answer", index: 6 },
  { key: "08", title: "Score", index: 8 },
  { key: "10", title: "End" }
]

// <> Do the thing
console.log(`Beginning rendering of Trivial Endeavor`);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App categoryList={categoryList} neededToWin={neededToWin} phases={phases} 
      // handleGuess={undefined}
       />
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);