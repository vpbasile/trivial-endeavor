import React from 'react';
import ReactDOM from 'react-dom';

// <> Import my components
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

// <> Stylesheets
import './css/bootstrap.css';
import './css/shape-size.css';
import './css/color-dark.css';

const categoryList = [
  { key: "01", queryTag: "food_and_drink", title: "Food and Drink", cssClass: "cat-food" },
  { key: "05", queryTag: "sport_and_leisure", title: "Sport and Leisure", cssClass: "cat-sport" },
  { key: "08", queryTag: "science", title: "Science", cssClass: "cat-science" },
  { key: "04", queryTag: "history", title: "History", cssClass: "cat-history" },
  { key: "02", queryTag: "geography", title: "Geography", cssClass: "cat-geography" },
  { key: "06", queryTag: "movies", title: "Film and TV", cssClass: "cat-movies" },
  { key: "07", queryTag: "music", title: "Music", cssClass: "cat-music" },
  { key: "03", queryTag: "general_knowledge", title: "General Knowledge", cssClass: "cat-general" }
]

const phases = [
  // { key: "01", title: "Welcome"},
  { key: "02", title: "Select", index: 0 },
  { key: "03", title: "Question", index: 1 },
  { key: "04", title: "Answer", index: 2 },
  { key: "05", title: "Score",  index: 3 }
  // { key: "06", title: "End"}
]

// <> Do the thing
console.log(`Beginning rendering of Trivial Endeavor`);

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <App globals={ {categoryList:categoryList, phases:phases} }/>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
