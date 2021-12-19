import React from 'react';
import ReactDOM from 'react-dom';

// <> Import my components
import App from './App';
// import newQuestion from './te-newQuestion';
// import handleGuess from './te-handleGuess';

// <> Stylesheets
import './css/bootstrap.css';
import './css/shape-size.css';
import './css/color-dark.css';

// <> Do the thing
console.log(`Beginning rendering of Trivial Endeavor`);
const players = ["Player 1", "Player 2", "Player 3", "Player 4"];
var categoryList = [
  // {key: "00", title: "Blank Class", cssClass: "blackandwhite"},
  {key: "01", queryTag: "food_and_drink", title: "Food & Drink", cssClass: "cat-food"},
  {key: "02", queryTag: "geography", title: "Geography", cssClass: "cat-geography"},
  {key: "03", queryTag: "general_knowledge", title: "General Knowledge", cssClass: "cat-general"},
  {key: "04", queryTag: "history", title: "History", cssClass: "cat-history"},
  {key: "05", queryTag: "sport_and_leisure", title: "Sport & Leisure", cssClass: "cat-sport"},
  {key: "06", queryTag: "movies", title: "Movies", cssClass: "cat-movies"},
  {key: "07", queryTag: "music", title: "Music", cssClass: "cat-music"},
  {key: "08", queryTag: "science", title: "Science", cssClass: "cat-science"}
]

ReactDOM.render(
  <React.StrictMode>
    <App players={players} categoryList={categoryList}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
