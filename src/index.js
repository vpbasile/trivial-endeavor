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

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
